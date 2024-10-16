import { useEffect, useState } from "react";
import "../styles/styles.css";

// Shadcn component imports
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Input } from "@/components/ui/input";

// Custom component imports
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

// Utility function imports
import { getUserData } from "@/lib/CRUDHelper";
import { getChapters } from "@/lib/quranAPI";
import useAuth from "@/auth/AuthContext";
import { Button } from "@/components/ui/button";

// Models
interface Option {
    label: string;
    value: number;
}

function Questions() {
    const { user, userData, loading } = useAuth();
    const [chapters, setChapters] = useState<Option[]>([]);
    const [juzList, setJuzList] = useState<Option[]>([]);
    const [surahProgress, setSurahProgress] = useState<number[]>([]);
    const [questionSource, setQuestionSource] = useState<string>("juz");

    const [selectedQuestionRange, setselectedQuestionRange] = useState([]);

    const [useMemorisedSurahs, setUseMemorisedSurahs] = useState(false);

    // Fetch data and initialise states
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                // Fetch surah information from Quran.com API
                const chaptersResponse = await getChapters();
                const chaptersList = chaptersResponse.chapters.map(
                    (chapter) => ({
                        label: chapter.name_simple,
                        value: chapter.id,
                    })
                );
                setChapters(chaptersList);

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

    return (
        <>
            <Navbar user={user} userData={userData} />
            <main className="flex-grow flex flex-col items-center w-full px-4 md:px-0">
                <h1 className="text-3xl font-bold m-4">Questions</h1>

                {/* Question options card */}
                <div className="w-full md:w-[auto]">
                    <Card className="w-[500px]">
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
                                            onValueChange={setQuestionSource}
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
                                        <Button
                                            disabled={questionSource == "hifz"}
                                            variant="outline"
                                        >
                                            {questionSource == "juz"
                                                ? "Select Juz"
                                                : "Select Surah"}
                                        </Button>
                                    </div>

                                    {/* Select component to choose the type of question to generate */}
                                    <div className="flex flex-col space-y-1.5 mb-2 w-1/2">
                                        {/* Label for the MultiSelect component */}
                                        <Label className="mb-1" htmlFor="name">
                                            Type
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="No Question Type Selected" />
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
                            <Button>Generate</Button>
                        </CardFooter>
                    </Card>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Questions;
