import { db } from "@/firebase";
import {
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import { User } from "@firebase/auth";
import { UserData } from "@/models/UserData";
import { getChapters } from "./quranAPI";

// Function to set user data on sign up
export async function setUserCollectionData(userData: UserData) {
    try {
        const chapters = await getChapters();
        const user = userData.user;

        // Initialize surahProgress array with zeros
        const surahProgress = new Array(chapters.chapters.length).fill(0);

        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            surahProgress: surahProgress,
        });
    } catch (error) {
        console.error("Error setting user data:", error);
    }
}

// Function to get user data
export async function getUserData(user: User) {
    try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            return userDoc.data() as UserData;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting user data:", error);
        return null;
    }
}

// Function to update user data
export async function updateUserData(userData: UserData) {
    try {
        console.log("Updating user data:", userData);
        await updateDoc(doc(db, "users", userData.user.uid), {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            surahProgress: userData.surahProgress,
        });
        console.log('Updated');
    } catch (error) {
        console.error("Error updating user data:", error);
    }
}

// Function to delete user data
export async function deleteUserData(user: User) {
    try {
        await deleteDoc(doc(db, "users", user.uid));
    } catch (error) {
        console.error("Error deleting user data:", error);
    }
}
