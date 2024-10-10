import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import useAuth from "@/auth/AuthContext";
import { getChapters } from "@/lib/quranAPI";
import SurahProgress from "@/components/Surah/SurahProgress";
import { useEffect, useState } from "react";
import { Chapter } from "@/models/Chapter";

function Surahs() {
    const { user, userData, loading } = useAuth();
    const [chapters, setChapters] = useState<Chapter[]>([]);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const data = await getChapters();
                console.log(data.chapters);
                setChapters(data.chapters);
            } catch (error) {
                console.error("Error fetching chapters:", error);
            }
        };

        fetchChapters();
    }, []);

    const handleUpdateProgress = (surahId: number, completedAyahs: number) => {
        // Update the progress in your state or backend
        console.log(`Surah ID: ${surahId}, Completed Ayahs: ${completedAyahs}`);
        // Add your backend call here
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
                    <ul className="flex flex-col items-center w-full">
                        {chapters.map((chapter) => (
                            <li
                                key={chapter.id}
                                className="flex items-center mb-2 w-full"
                            >
                                <SurahProgress
                                    surahProgress={{
                                        surah: chapter,
                                        completedAyahs: 0, // Replace with actual data
                                        totalAyahs: chapter.verses_count, // Replace with actual data
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
