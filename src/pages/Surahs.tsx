import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import useAuth from "@/auth/AuthContext";
import { getChapters } from "@/lib/quranAPI";
import SurahProgress from "@/components/Surah/SurahProgress";
import { useEffect, useState } from "react";
import { Chapter } from "@/models/Chapter";
import { getUserData, updateUserData } from "@/lib/CRUDHelper";

function Surahs() {
    const { user, userData, loading } = useAuth();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [surahProgress, setSurahProgress] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                // Fetch surah information from Quran.com API
                const chaptersResponse = await getChapters();
                setChapters(chaptersResponse.chapters);

                // Fetch user data from Firebase
                const userData = await getUserData(user);
                if (userData) {
                    setSurahProgress(userData.surahProgress);
                }
            }
        };
        fetchData();
    }, [user]);

    const handleUpdateProgress = async (surahId: number, completedAyahs: number) => {

        // Update surahProgress state
        const newProgress = [...surahProgress];
        newProgress[surahId - 1] = completedAyahs; // surahId is 1-based
        setSurahProgress(newProgress);

        console.log("New Progress:", newProgress);

        // Update surahProgress for user in Firebase
        if (user && userData) {
            const updatedUserData = {
                user: user,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                surahProgress: newProgress,
            };
            await updateUserData(updatedUserData);
        }

        console.log("Updated progress for surah", surahId, "to", completedAyahs);
    };

    const numSurahsCompleted = () => {
        let numSurahsCompleted = 0;
        for (let i = 0; i < surahProgress.length; i++) {
            if (surahProgress[i] === chapters[i].verses_count) {
                numSurahsCompleted++;
            }
        }
        return numSurahsCompleted;
    };

    const numAyahsCompleted = () => {
        let numAyahsCompleted = 0;
        for (let i = 0; i < surahProgress.length; i++) {
            numAyahsCompleted += surahProgress[i];
        }
        return numAyahsCompleted;
    };

    if (loading) {
        return null;
    }

    if (!user) {
        return <div>Please log in to view this page.</div>;
    }

    return (
        <>
            <Navbar user={user} userData={userData} />
            <main className="flex-grow flex items-center justify-center w-full px-4 md:px-0">
                <div className="text-center w-full max-w-4xl">
                    <h1 className="text-3xl font-bold m-4">Surahs</h1>
                    <p>{numSurahsCompleted() + "/114 Surahs Completed (" + parseFloat((numSurahsCompleted()*100/114).toFixed(2)) + "%)"}</p>
                    <p>{numAyahsCompleted() + "/6236 Ayahs Completed (" + parseFloat((numAyahsCompleted()*100/6236).toFixed(2)) + "%)"}</p>
                    <ul className="flex flex-col items-center w-full">
                        {chapters.map((chapter) => (
                            <li
                                key={chapter.id}
                                className="flex items-center mb-2 w-full"
                            >
                                <SurahProgress
                                    surahProgress={{
                                        surah: chapter,
                                        completedAyahs:
                                            surahProgress[chapter.id - 1],
                                        totalAyahs: chapter.verses_count,
                                    }}
                                    onUpdateProgress={handleUpdateProgress}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Surahs;
