import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

const announcements = [
    { id: 1, title: "System Maintenance", content: "We'll be performing maintenance this Sunday from 2-4 AM EST. Service may be briefly interrupted.", date: "2023-10-15", read: false },
    { id: 2, title: "New Feature Released", content: "Skill matching algorithm has been improved to provide better recommendations.", date: "2023-10-10", read: true },
    { id: 3, title: "Community Guidelines", content: "Please review our updated community guidelines to ensure a positive experience for everyone.", date: "2023-10-05", read: true },
];
import { useAuth } from "@/context/AuthContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const Navbar: React.FC = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showAnnouncements, setShowAnnouncements] = useState(false);
    const [unreadCount, setUnreadCount] = useState(1); // Based on mock data
    const profileRef = useRef<HTMLDivElement>(null);
    const announcementsRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        setShowProfileMenu(false);
        navigate("/login");
    };
    const handleLoginLogout = () => {
        setIsLoggedIn(!isLoggedIn);
        setShowProfileMenu(false);
        if (isLoggedIn) {
            navigate("/login");
        }
    };

    const goToHome = () => navigate("/");
    const goToSwapRequest = () => navigate("/swap-requests");
    const goToProfile = () => {
        navigate("/my-profile");
        setShowProfileMenu(false);
    };

    const goToHome = () => {
        navigate("/");
    };

    const goToSwapRequest = () => {
        navigate("/swap-request");
    };

    const goToMyRequests = () => {
        navigate("/my-request");
        setShowProfileMenu(false);
    };

    const toggleAnnouncements = () => {
        setShowAnnouncements(!showAnnouncements);
        // Mark all as read when opening
        if (!showAnnouncements) {
            setUnreadCount(0);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node) &&
                announcementsRef.current &&
                !announcementsRef.current.contains(event.target as Node)
            ) {
                setShowProfileMenu(false);
                setShowAnnouncements(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    // Re-render check
    useEffect(() => {
        console.log("Navbar re-rendered. Current user:", user);
    }, [user]);

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md relative border-b border-gray-200 dark:border-gray-700">
            <div
                className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer flex items-center"
                onClick={goToHome}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                Upshare
            </div>

            <div className="flex space-x-4 items-center">
                {user && (
                    <>
                        <button
                            onClick={goToHome}
                            className="text-gray-700 hover:text-blue-600"
                            title="Go to Home"
                        >
                            Home
                        </button>
                        <button
                            onClick={goToSwapRequest}
                            className="text-gray-700 hover:text-blue-600"
                            title="See Swap Requests"
                        >
                            Swap Request
                        </button>
                    </>
                )}

                {!isLoggedIn ? (
                    <Button
                        variant="default"
                        onClick={() => navigate("/login")}
                        title="Log in to your account"
                    >
                        Login
                    </Button>
                ) : (
                    <div className="relative" ref={profileRef}>
                        <Button
                            variant="ghost"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            title="Open profile menu"
                            className="flex items-center gap-2"
                        >
                            <img
                                src="/avatar.jpg"
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-800"
                            />
                            Profile
                        </Button>
                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md z-10">
                                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                    <p className="font-medium text-gray-900 dark:text-white">Maria Fernanda</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">maria@example.com</p>
                                </div>
                                <button
                                    onClick={goToProfile}
                                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                                    title="View and edit your profile"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    My Profile
                                </button>
                                <button
                                    onClick={handleLoginLogout}
                                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                                    title="Logout from account"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <ModeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
