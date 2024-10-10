import { useState } from "react";
import { ChapterProgress as SurahProgressModel } from "@/models/Chapter";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

interface SurahProgressProps {
    surahProgress: SurahProgressModel;
    onUpdateProgress: (surahId: number, completedAyahs: number) => void;
}

export default function SurahProgress({
    surahProgress,
    onUpdateProgress,
}: SurahProgressProps) {
    const [completedAyahs, setCompletedAyahs] = useState(
        surahProgress.completedAyahs
    );
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSliderChange = (value: number) => {
        setCompletedAyahs(value);
    };

    const handleSave = () => {
        onUpdateProgress(surahProgress.surah.id, completedAyahs);
        setIsDialogOpen(false);
    };

    return (
        <div className="m-4 border rounded-lg shadow p-4 w-full flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                {surahProgress.surah.id}
            </div>
            <div className="mr-4 mb-4 md:mb-0 md:w-1/3">
                <h2 className="text-xl font-bold">
                    {surahProgress.surah.name_simple}
                </h2>
                <h2 className="text-xl">({surahProgress.surah.translated_name.name})</h2>
            </div>
            <div className="mb-4 md:mb-0 md:w-1/3">
                <Progress
                    value={(completedAyahs / surahProgress.totalAyahs) * 100}
                    className="w-full"
                />
            </div>
            <div className="text-center md:w-1/3">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full md:w-auto">Update Progress</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Update Progress</DialogTitle>
                        <DialogDescription>
                            Use the slider to update the number of ayahs you
                            have memorized.
                        </DialogDescription>
                        <Slider
                            value={[completedAyahs]}
                            min={0}
                            max={surahProgress.totalAyahs}
                            onValueChange={(value) =>
                                handleSliderChange(value[0])
                            }
                        />
                        <p className="text-center mt-2">
                            {completedAyahs}/{surahProgress.totalAyahs} Ayahs
                            memorized
                        </p>
                        <Button onClick={handleSave} className="mt-4">
                            Save
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
