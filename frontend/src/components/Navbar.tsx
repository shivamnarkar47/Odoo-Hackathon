import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

const announcements = [
  { id: 1, title: "System Maintenance", content: "We'll be performing maintenance this Sunday from 2-4 AM EST. Service may be briefly interrupted.", date: "2023-10-15", read: false },
  { id: 2, title: "New Feature Released", content: "Skill matching algorithm has been improved to provide better recommendations.", date: "2023-10-10", read: true },
  { id: 3, title: "Community Guidelines", content: "Please review our updated community guidelines to ensure a positive experience for everyone.", date: "2023-10-05", read: true },
];

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1); // Based on mock data
  const profileRef = useRef<HTMLDivElement>(null);
  const announcementsRef = useRef<HTMLDivElement>(null);
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
        {isLoggedIn && (
          <>
            <button
              onClick={goToHome}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Go to Home"
            >
              Home
            </button>
            <button
              onClick={goToSwapRequest}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="See Swap Requests"
            >
              Swap Requests
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

        {isLoggedIn && (
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