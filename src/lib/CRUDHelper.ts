import { db } from "@/firebase";
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { User } from "@firebase/auth";
import { UserData } from "@/models/UserData";

// Function to set user data on sign up
export async function setUserCollectionData(userData: UserData) {
    try {
        const user = userData.user
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            surahs: userData.surahs,
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
        await updateDoc(doc(db, "users", userData.user.uid), {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            surahs: userData.surahs,
        });
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