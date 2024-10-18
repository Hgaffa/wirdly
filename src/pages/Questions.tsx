import { useEffect, useState } from "react";
import "../styles/styles.css";

// Shadcn component imports
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Custom component imports
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { SurahTable } from "@/components/DataTable/surah-table";

// Import tajweed styles
import "../styles/tajweed.css";
import { Tajweed } from "tajweed-ts";

// Utility function imports
import { getUserData } from "@/lib/CRUDHelper";
import {
    generateHifzQuestion,
    generateJuzQuestion,
    generateSurahQuestion,
    getChapters,
} from "@/lib/quranAPI";
import useAuth from "@/auth/AuthContext";

// Animations
import ReactCardFlip from "react-card-flip";

// Models
import { Chapter } from "@/models/Chapter";
import { Juz } from "@/models/Juz";
import { JuzTable } from "@/components/DataTable/juz-table";
import { juzData } from "@/lib/data/juz-data";

interface Option {
    label: string;
    value: number;
}

function Questions() {
    const { user, userData, loading } = useAuth();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [juzList, setJuzList] = useState<Option[]>([]);
    const [surahProgress, setSurahProgress] = useState<number[]>([]);

    const [questionType, setQuestionType] = useState<number>(0);
    const [questionSource, setQuestionSource] = useState<string>("juz");

    const [questionText, setQuestionText] = useState<string>("");
    const [answerText, setAnswerText] = useState<string>("");
    const [showQuestion, setShowQuestion] = useState<boolean>(false);
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    // State to store selected surahs/juzs
    const [selectedSurahs, setSelectedSurahs] = useState<Chapter[]>([]);
    const [selectedJuz, setSelectedJuz] = useState<Juz[]>([]);

    // Fetch data and initialise states
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                // Fetch surah information from Quran.com API
                const chaptersResponse = await getChapters();
                setChapters(chaptersResponse.chapters);

                // Set Juz information
                const juzArray = Array.from(
                    { length: 30 },
                    (_, i) => i + 1
                ).map((juz) => ({
                    label: `Juz ${juz}`,
                    value: juz,
                }));
                setJuzList(juzArray);

                // Fetch user data from Firebase
                const userData = await getUserData(user);
                if (userData) {
                    setSurahProgress(userData.surahProgress);
                }
            }
        };
        fetchData();
    }, [user]);

    // Loading State
    if (loading) {
        return null;
    }

    // Returns question title label
    const getQuestionLabel = () => {
        if (questionType === 1) {
            return "What is the previous verse?";
        } else if (questionType === 2) {
            return "What is the next verse?";
        } else {
            return "What surah is this verse from?";
        }
    };

    // Handler when surahs/juz are selected in data table modals
    const handleSaveSurahSelection = (selectedRows: Chapter[]) => {
        setSelectedSurahs(selectedRows);
    };

    const handleSaveJuzSelection = (selectedRows: Juz[]) => {
        setSelectedJuz(selectedRows);
    };


    // Handler for resetting question/answer card when input changed
    const handleResetCard = () => {
        setIsFlipped(false);
        setShowQuestion(false);
    }

    // Handler for generating question
    const handleGenerateQuestion = async () => {
        let response;

        if (
            (questionSource === "surah" && selectedSurahs.length === 0) ||
            (questionSource === "juz" && selectedJuz.length === 0) ||
            (questionSource === "hifz" &&
                surahProgress.every((surah) => surah === 0))
        ) {
            alert(
                "Please make a valid source selection or update your hifz tracker."
            );
            return;
        } else if (questionType === 0) {
            alert("Please select a question type.");
            return;
        }

        if (questionSource == "surah") {
            response = await generateSurahQuestion(
                selectedSurahs,
                chapters,
                questionType
            );
        } else if (questionSource == "juz") {
            response = await generateJuzQuestion(
                selectedJuz,
                chapters,
                questionType
            );
        } else {
            response = await generateHifzQuestion(
                surahProgress,
                chapters,
                questionType
            );
        }

        if (response) {
            const parseTajweed = new Tajweed();
            const parsedQuestion = parseTajweed.parse(response.question, true);

            let answer = response.answer;

            if (questionType !== 3) {
                answer = parseTajweed.parse(response.answer, true);
            }

            setQuestionText(parsedQuestion);
            setAnswerText(answer);
            setShowQuestion(true);
        }
    };

    return (
        <>
            <Navbar user={user} userData={userData} />
            <main className="flex-grow flex flex-col items-center w-full px-4 md:px-0">
                <h1 className="text-3xl font-bold m-4">Questions</h1>

                {/* Question options card */}
                <div className="w-full md:w-[550px]">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Question Settings</CardTitle>
                            <CardDescription>
                                Conifgure your settings and generate hifz
                                questions.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-auto items-center gap-4">
                                    {/* Radio group to select which type of question to generate: Chosen Surahs, Chosen Juz, Memorised Surahs */}
                                    <div className="flex flex-col space-y-1.5 mb-2">
                                        <Label className="mb-1" htmlFor="name">
                                            Source
                                        </Label>
                                        <RadioGroup
                                            defaultValue="juz"
                                            onValueChange={(value) => {
                                                setQuestionSource(value);
                                                handleResetCard();
                                            }}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value="juz"
                                                    id="option-juz"
                                                />
                                                <Label htmlFor="option-juz">
                                                    From Selected Juz(s)
                                                </Label>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value="surah"
                                                    id="option-surah"
                                                />
                                                <Label htmlFor="option-surah">
                                                    From Selected Surah(s)
                                                </Label>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value="hifz"
                                                    id="option-hifz"
                                                />
                                                <Label htmlFor="option-hifz">
                                                    From Memorized Surahs (Hifz
                                                    Tracker)
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    {/* Open dialog for surah/juz selection */}
                                    <div className="flex flex-col space-y-1.5 mb-2 w-1/2">
                                        <Label className="mb-1" htmlFor="name">
                                            Source Selection
                                        </Label>
                                        {questionSource == "surah" ? (
                                            <SurahTable
                                                data={chapters}
                                                onSaveSelection={
                                                    handleSaveSurahSelection
                                                }
                                            />
                                        ) : questionSource == "juz" ? (
                                            <JuzTable
                                                data={juzData}
                                                onSaveSelection={
                                                    handleSaveJuzSelection
                                                }
                                            />
                                        ) : (
                                            <Button disabled variant="outline">
                                                Using Hifz Tracker
                                            </Button>
                                        )}
                                    </div>

                                    {/* Select component to choose the type of question to generate */}
                                    <div className="flex flex-col space-y-1.5 mb-2 w-1/2">
                                        {/* Label for the MultiSelect component */}
                                        <Label className="mb-1" htmlFor="name">
                                            Type
                                        </Label>
                                        <Select
                                            onValueChange={(value) => {
                                                setQuestionType(Number(value));
                                                handleResetCard();
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">
                                                    Guess Previous Ayah
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    Guess Next Ayah
                                                </SelectItem>
                                                <SelectItem value="3">
                                                    Guess Surah
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button onClick={handleGenerateQuestion}>
                                Generate
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Questions & Answer Card */}
                    <div className="question-card mt-4 mb-8">
                        {showQuestion && (
                            <>
                                <ReactCardFlip
                                    isFlipped={isFlipped}
                                    flipDirection="vertical"
                                >
                                    <Card className="w-full">
                                        <CardHeader>
                                            <CardTitle>
                                                {getQuestionLabel()}
                                            </CardTitle>
                                            <CardDescription>
                                                Flip the card to reveal the
                                                answer.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form>
                                                <div
                                                    className="w-full md:w-[500px] text-3xl quranic-text leading-relaxed"
                                                    dangerouslySetInnerHTML={{
                                                        __html: questionText,
                                                    }}
                                                ></div>
                                            </form>
                                        </CardContent>
                                        <CardFooter className="flex justify-center w-full">
                                            <Button
                                                onClick={() => {
                                                    setIsFlipped(!isFlipped);
                                                }}
                                            >
                                                Reveal Answer
                                            </Button>
                                        </CardFooter>
                                    </Card>

                                    <Card className="w-full">
                                        <CardHeader>
                                            <CardTitle>Answer</CardTitle>
                                            <CardDescription>
                                                Did you get the right answer?
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form>
                                                {questionType === 3 ? (
                                                    <div className="w-full md:w-[500px] text-3xl flex justify-center items-center h-full">
                                                        <h3 className="font-bold">
                                                            {answerText}
                                                        </h3>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="w-full md:w-[500px] text-3xl quranic-text leading-relaxed"
                                                        dangerouslySetInnerHTML={{
                                                            __html: answerText,
                                                        }}
                                                    ></div>
                                                )}
                                            </form>
                                        </CardContent>
                                        <CardFooter className="flex justify-center w-full">
                                            <Button
                                                onClick={() => {
                                                    setIsFlipped(!isFlipped);
                                                }}
                                            >
                                                Back to Question
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </ReactCardFlip>
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Questions;
