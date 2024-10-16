import { useEffect, useState } from "react";
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
    const [completedAyahs, setCompletedAyahs] = useState<number>(
        surahProgress.completedAyahs
    );
    const [tempCompletedAyahs, setTempCompletedAyahs] = useState<number>(
        surahProgress.completedAyahs
    );
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        setCompletedAyahs(surahProgress.completedAyahs);
        setTempCompletedAyahs(surahProgress.completedAyahs);
    }, [surahProgress]);

    const handleSliderChange = (value: number) => {
        setTempCompletedAyahs(value);
    };

    const handleSave = () => {
        setCompletedAyahs(tempCompletedAyahs);
        onUpdateProgress(surahProgress.surah.id, tempCompletedAyahs);
        setIsDialogOpen(false);
    };

    const handleDialogOpenChange = (isOpen: boolean) => {
        setIsDialogOpen(isOpen);
        if (!isOpen) {
            setTempCompletedAyahs(surahProgress.completedAyahs);
        }
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
                <h2 className="text-xl">
                    ({surahProgress.surah.translated_name.name})
                </h2>
            </div>
            <div className="mb-4 md:mb-0 md:w-1/3">
                <Progress
                    value={(completedAyahs / surahProgress.totalAyahs) * 100}
                    className="w-full"
                />
            </div>
            <div className="text-center md:w-1/3">
                <Dialog
                    open={isDialogOpen}
                    onOpenChange={handleDialogOpenChange}
                >
                    <DialogTrigger asChild>
                        <Button className="w-full md:w-auto">
                            Update Progress
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Update Progress</DialogTitle>
                        <DialogDescription>
                            Use the slider to update the number of ayahs you
                            have memorized.
                        </DialogDescription>
                        <Slider
                            value={[tempCompletedAyahs]}
                            min={0}
                            max={surahProgress.totalAyahs}
                            onValueChange={(value) =>
                                handleSliderChange(value[0])
                            }
                        />
                        <p className="text-center mt-2">
                            {tempCompletedAyahs}/{surahProgress.totalAyahs}{" "}
                            Ayahs memorized
                        </p>
                        <Button
                            variant="outline"
                            className="w-full md:w-auto mt-2"
                            onClick={() => {
                                handleSliderChange(surahProgress.totalAyahs);
                            }}
                        >
                            Quick Complete
                        </Button>
                        <Button onClick={handleSave}>
                            Save
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
