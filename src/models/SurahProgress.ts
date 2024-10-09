import { Surah } from "./Surah";

export interface SurahProgress {
    surah: Surah;
    completedAyahs: number;
    totalAyahs: number;
}