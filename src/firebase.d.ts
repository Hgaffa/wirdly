declare module "@/firebase" {
    import { FirebaseApp } from "firebase/app";
    import { Analytics } from "firebase/analytics";
    import { Auth } from "firebase/auth";
    import { Firestore } from "firebase/firestore";

    export const app: FirebaseApp;
    export const analytics: Analytics;
    export const auth: Auth;
    export const db: Firestore;
}
