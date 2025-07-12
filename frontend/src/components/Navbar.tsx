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

    const goToHome = () => navigate("/");
    const goToSwapRequest = () => navigate("/swap-request");
    const goToProfile = () => {
        navigate("/my-profile");
        setShowProfileMenu(false);
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
        <nav className="flex justify-between items-center px-6 py-4 bg-background shadow-md relative border-b border-gray-200 dark:border-gray-700">
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
                        <button
                            onClick={goToMyRequests}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            title="View My Requests"
                        >
                            My Requests
                            </button>
                    </>
                )}
                {user && (
                    <div className="relative" ref={announcementsRef}>
                        <button
                            onClick={toggleAnnouncements}
                            className="p-2 relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            title="View announcements"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {showAnnouncements && (
                            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
                                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Announcements</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">System updates and important notices</p>
                                </div>

                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {announcements.map((announcement) => (
                                        <div
                                            key={announcement.id}
                                            className={`p-4 ${!announcement.read ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-medium text-gray-900 dark:text-white">{announcement.title}</h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{announcement.content}</p>
                                                </div>
                                                {!announcement.read && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{announcement.date}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 text-center">
                                    <button
                                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                        onClick={() => {
                                            // Mark all as read
                                            setUnreadCount(0);
                                            setShowAnnouncements(false);
                                        }}
                                    >
                                        Mark all as read
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {!user ? (
                    <Button
                        variant="default"
                        onClick={() => navigate("/login")}
                        title="Log in to your account"
                    >
                        Login
                    </Button>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" title="Open profile menu">
                                {user?.name || "Profile"}
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={goToProfile}>
                                User Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                <ModeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
