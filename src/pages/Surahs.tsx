import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import useAuth from "@/auth/AuthContext";
import { surahs } from "@/lib/constants";
import SurahProgress from "@/components/Surah/SurahProgress";

function Surahs() {
    const { user, userData, loading } = useAuth();

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
                        {surahs.map((surah) => (
                            <li
                                key={surah.number}
                                className="flex items-center mb-2 w-full"
                            >
                                <SurahProgress
                                    surahProgress={{
                                        surah: {
                                            surahNumber: surah.number,
                                            name: surah.name,
                                            englishName: surah.englishName,
                                        },
                                        completedAyahs: 0, // Replace with actual data
                                        totalAyahs: 7, // Replace with actual data
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