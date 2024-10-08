import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import useAuth from "@/auth/AuthContext";
import { surahs } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";

function Surahs() {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!user) {
        return <div>Please log in to view this page.</div>;
    }

    return (
        <>
            <Navbar user={user} />
            <main className="flex-grow flex items-center justify-center w-full px-4 md:px-0">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Surahs</h1>
                    <ul className="flex flex-col items-center w-full max-w-md">
                        {surahs.map((surah) => (
                            <li
                                key={surah.number}
                                className="flex items-center mb-2 w-full self-stretch"
                            >
                                <Checkbox className="p-0 h-5 w-5" id={`surah-${surah.number}`} />
                                <label
                                    htmlFor={`surah-${surah.number}`}
                                    className="ml-2"
                                >
                                    {surah.name} ({surah.englishName})
                                </label>
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