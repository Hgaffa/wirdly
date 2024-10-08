import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from '@/firebase';

interface AuthContextProps {
    user: User | null;
    loading: boolean;
}

// Create auth context so we can handle user state globally
export const AuthContext = createContext<AuthContextProps>({ user: null, loading: true });

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {        
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}