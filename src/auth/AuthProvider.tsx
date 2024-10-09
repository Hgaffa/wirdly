import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from '@/firebase';
import { getUserData } from '@/lib/CRUDHelper';
import { UserData } from '@/models/UserData';

interface AuthContextProps {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
}

// Create auth context so we can handle user state globally
export const AuthContext = createContext<AuthContextProps>({ user: null, userData: null, loading: true });

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {        
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setLoading(false);
            if (user) {
                const data = await getUserData(user);
                setUserData(data);
            } else {
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, userData, loading }}>
            {children}
        </AuthContext.Provider>
    );
}