import React, { useState } from "react";
import AnnouncementForm from "../components/Admin/AnnouncementForm";
import UserStatusTable from "../components/Admin/UserStatusTable";
import SwapList from "../components/Admin/SwapList";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "announcement" | "users" | "swaps"
  >("announcement");

  const handleDownloadReport = () => {
    const reportType =
      activeTab === "announcement"
        ? "announcements"
        : activeTab === "users"
        ? "user_status"
        : "swap_requests";

    console.log(`Downloading ${reportType} report...`);

    const blob = new Blob(
      [`Report type: ${reportType}\nGenerated at: ${new Date().toISOString()}`],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reportType}_report_${new Date()
      .toISOString()
      .slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between">
        <div className="">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage platform announcements, users, and swap requests
          </p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="flex mt-6 items-center max-h-fit justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download Report
        </button>
      </div>

      <div className="flex gap-1 mb-8 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("announcement")}
          className={`px-5 py-3 text-sm font-medium rounded-t-md transition-colors relative ${
            activeTab === "announcement"
              ? "text-blue-600 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 border-b-0"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          Announcements
          {activeTab === "announcement" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-5 py-3 text-sm font-medium rounded-t-md transition-colors relative ${
            activeTab === "users"
              ? "text-blue-600 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 border-b-0"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          User Status
          {activeTab === "users" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("swaps")}
          className={`px-5 py-3 text-sm font-medium rounded-t-md transition-colors relative ${
            activeTab === "swaps"
              ? "text-blue-600 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 border-b-0"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          Swap List
          {activeTab === "swaps" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
          )}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6">
        {activeTab === "announcement" && <AnnouncementForm />}
        {activeTab === "users" && <UserStatusTable />}
        {activeTab === "swaps" && <SwapList />}
      </div>
    </div>
  );
};

export default AdminDashboard;
