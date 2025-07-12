import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Correct hook
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

    const handleLoginLogout = () => {
        setIsLoggedIn(!isLoggedIn);
        setShowProfileMenu(false);
        if (isLoggedIn) {
            navigate("/login");
        }
    };

  const goToProfile = () => {
    navigate("/my-profile");
    setShowProfileMenu(false);
  };

    const goToHome = () => {
        navigate("/");
    };

    const goToSwapRequest = () => {
        navigate("/swap-requests");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-black/40 shadow-md relative">
            <div
                className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
                onClick={goToHome}
            >
                Upshare
            </div>

            <div className="flex space-x-4 items-center">
                {isLoggedIn && (
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
                        >
                            Profile
                        </Button>
                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
                                <button
                                    onClick={goToProfile}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    title="View and edit your profile"
                                >
                                    User Profile
                                </button>
                                <button
                                    onClick={handleLoginLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    title="Logout from account"
                                >
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