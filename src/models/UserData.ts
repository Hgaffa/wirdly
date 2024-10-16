import { User } from "@firebase/auth";

export interface UserData {
    user: User;
    email: string;
    firstName: string;
    lastName: string;
    surahProgress: number[];
}