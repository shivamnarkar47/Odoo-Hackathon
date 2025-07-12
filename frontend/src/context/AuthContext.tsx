import { createContext, useContext, useEffect, useState } from "react";

interface User {
    id: string;
    email: string;
    name?: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    accessToken: String | null,
    login: (userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<String | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (userData: User) => {
        if (userData.user) {

            setAccessToken(userData.access);
            setUser(userData.user);
            localStorage.setItem("user", JSON.stringify(userData.user));
        }
        else {
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
        }
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
