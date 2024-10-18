import axios from "axios";
import { Chapter, GetChaptersResponse } from "@/models/Chapter";
import { VerseKey, VerseTextDTO, QuestionResponse } from "@/models/Verse";
import { Juz } from "@/models/Juz";

const API_BASE_URL = "https://api.quran.com/api/v4";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: "application/json",
    },
    maxBodyLength: Infinity,
});

// Fetches the list of chapters from the Quran.com API
export const getChapters = async (): Promise<GetChaptersResponse> => {
    try {
        const response = await apiClient.get<GetChaptersResponse>("/chapters");
        return response.data;
    } catch (error) {
        console.error("Error fetching chapters:", error);
        throw error;
    }
};

// Get next verse_key based on current verse_key
export const getNextVerseKey = async (
    questionKey: VerseKey,
    chapters: Chapter[]
): Promise<VerseKey> => {
    const { chapter, verse } = questionKey;

    // Find the current chapter
    const currentChapter = chapters.find((ch) => ch.id === chapter);
    if (!currentChapter) {
        throw new Error(`Chapter with id ${chapter} not found`);
    }

    // Increment the verse number
    let nextVerse = verse + 1;
    let nextChapter = chapter;

    // Check if the incremented verse number exceeds the total verses in the current chapter
    if (nextVerse > currentChapter.verses_count) {
        // Move to the first verse of the next chapter
        nextVerse = 1;
        nextChapter = chapter + 1;

        // If the current chapter is the last chapter, wrap around to the first chapter
        if (nextChapter > chapters.length) {
            nextChapter = 1;
        }
    }

    return { chapter: nextChapter, verse: nextVerse };
};

// Get previous verse_key based on current verse_key
export const getPrevVerseKey = async (
    questionKey: VerseKey,
    chapters: Chapter[]
): Promise<VerseKey> => {
    const { chapter, verse } = questionKey;

    // Find the current chapter
    const currentChapter = chapters.find((ch) => ch.id === chapter);
    if (!currentChapter) {
        throw new Error(`Chapter with id ${chapter} not found`);
    }

    // Decrement the verse number
    let prevVerse = verse - 1;
    let prevChapter = chapter;

    // Check if the decremented verse number is less than 1
    if (prevVerse < 1) {
        // Move to the last verse of the previous chapter
        prevChapter = chapter - 1;

        // If the current chapter is the first chapter, wrap around to the last chapter
        if (prevChapter < 1) {
            prevChapter = chapters[chapters.length - 1].id;
        }

        const prevChapterObj = chapters.find((ch) => ch.id === prevChapter);
        if (!prevChapterObj) {
            throw new Error(`Chapter with id ${prevChapter} not found`);
        }
        prevVerse = prevChapterObj.verses_count;
    }

    return { chapter: prevChapter, verse: prevVerse };
};

// Fetches random verse based on Surah ID
export const getRandomVerseFromSurahId = async (
    chapterId: number
): Promise<VerseKey> => {
    try {
        const response = await apiClient.get(`verses/random`, {
            params: {
                chapter_number: chapterId,
            },
        });
        const verseKey = response.data.verse.verse_key.split(":");
        return { chapter: parseInt(verseKey[0]), verse: parseInt(verseKey[1]) };
    } catch (error) {
        console.error("Error fetching random verse:", error);
        throw error;
    }
};

// Fetches random verse based on Juz ID
export const getRandomVerseFromJuzId = async (
    chapterId: number
): Promise<VerseKey> => {
    try {
        const response = await apiClient.get(`verses/random`, {
            params: {
                juz_number: chapterId,
            },
        });
        const verseKey = response.data.verse.verse_key.split(":");
        return { chapter: parseInt(verseKey[0]), verse: parseInt(verseKey[1]) };
    } catch (error) {
        console.error("Error fetching random verse:", error);
        throw error;
    }
};

// Fetch ayah text based on verse_key
export const getAyahTextFromVerseKey = async (
    verseKey: VerseKey
): Promise<VerseTextDTO[]> => {
    try {
        const response = await apiClient.get(`/quran/verses/uthmani_tajweed`, {
            params: {
                verse_key: verseKey.chapter + ":" + verseKey.verse,
            },
        });
        return response.data.verses;
    } catch (error) {
        console.error("Error fetching ayah text:", error);
        throw error;
    }
};

// Generates random question based on selected surahs
export const generateSurahQuestion = async (
    surahList: Chapter[],
    chapters: Chapter[],
    questionType: number
): Promise<QuestionResponse> => {
    let question, answer;

    // Get a random surah from the list
    const randomIndex = Math.floor(Math.random() * surahList.length);
    const randomSurah = surahList[randomIndex];

    // Get a random verse from the random surah
    const randomVerse = await getRandomVerseFromSurahId(randomSurah.id);

    if (questionType === 1) {
        // Guess previous verse question
        const answerVerse = await getPrevVerseKey(randomVerse, chapters);

        const questionText = await getAyahTextFromVerseKey(randomVerse);
        const answerText = await getAyahTextFromVerseKey(answerVerse);

        question = questionText[0].text_uthmani_tajweed;
        answer = answerText[0].text_uthmani_tajweed;
    } else if (questionType === 2) {
        // Guess next verse question
        const answerVerse = await getNextVerseKey(randomVerse, chapters);

        const questionText = await getAyahTextFromVerseKey(randomVerse);
        const answerText = await getAyahTextFromVerseKey(answerVerse);

        question = questionText[0].text_uthmani_tajweed;
        answer = answerText[0].text_uthmani_tajweed;
    } else {
        // Guess surah question
        const questionText = await getAyahTextFromVerseKey(randomVerse);

        question = questionText[0].text_uthmani_tajweed;
        answer = randomSurah.name_simple;
    }

    return { question, answer };
};

// Generates random question based on selected juz
export const generateJuzQuestion = async (
    juzList: Juz[],
    chapters: Chapter[],
    questionType: number
): Promise<QuestionResponse> => {
    let question, answer;

    // Get a random Juz from the list
    const randomIndex = Math.floor(Math.random() * juzList.length);
    const randomJuz = juzList[randomIndex];

    // Get random verse from the random Juz
    const randomVerse = await getRandomVerseFromJuzId(randomJuz.id);

    if (questionType === 1) {
        // Guess previous verse question
        const answerVerse = await getPrevVerseKey(randomVerse, chapters);

        const questionText = await getAyahTextFromVerseKey(randomVerse);
        const answerText = await getAyahTextFromVerseKey(answerVerse);

        question = questionText[0].text_uthmani_tajweed;
        answer = answerText[0].text_uthmani_tajweed;
    } else if (questionType === 2) {
        // Guess next verse question
        const answerVerse = await getNextVerseKey(randomVerse, chapters);

        const questionText = await getAyahTextFromVerseKey(randomVerse);
        const answerText = await getAyahTextFromVerseKey(answerVerse);

        question = questionText[0].text_uthmani_tajweed;
        answer = answerText[0].text_uthmani_tajweed;
    } else {
        // Guess surah question
        const questionText = await getAyahTextFromVerseKey(randomVerse);

        question = questionText[0].text_uthmani_tajweed;
        answer = randomJuz.name;
    }

    return {
        question: question,
        answer: answer,
    };
};

// Generates random question based on hifz progress
export const generateHifzQuestion = async (
    hifzProgress: number[],
    chapters: Chapter[],
    questionType: number
) => {
    let question, answer;

    // Get list of chapters where hifz progress is equal to total verses
    const completedChapters = chapters.filter(
        (chapter, index) => hifzProgress[index] === chapter.verses_count
    );

    // Get a random chapter from the list of completed chapters
    const randomIndex = Math.floor(Math.random() * completedChapters.length);
    const randomSurah = completedChapters[randomIndex];

    // Get a random verse from the random surah
    const randomVerse = await getRandomVerseFromSurahId(randomSurah.id);

    if (questionType === 1) {
      // Guess previous verse question
      const answerVerse = await getPrevVerseKey(randomVerse, chapters);

      const questionText = await getAyahTextFromVerseKey(randomVerse);
      const answerText = await getAyahTextFromVerseKey(answerVerse);

      question = questionText[0].text_uthmani_tajweed;
      answer = answerText[0].text_uthmani_tajweed;
    } else if (questionType === 2) {
        // Guess next verse question
        const answerVerse = await getNextVerseKey(randomVerse, chapters);

        const questionText = await getAyahTextFromVerseKey(randomVerse);
        const answerText = await getAyahTextFromVerseKey(answerVerse);

        question = questionText[0].text_uthmani_tajweed;
        answer = answerText[0].text_uthmani_tajweed;
    } else {
        // Guess surah question
        const questionText = await getAyahTextFromVerseKey(randomVerse);

        question = questionText[0].text_uthmani_tajweed;
        answer = randomSurah.name_simple;
    }

    return {
        question: question,
        answer: answer,
    };
};
