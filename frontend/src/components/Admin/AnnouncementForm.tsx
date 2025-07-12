import React, { useState } from "react";

const AnnouncementForm: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    console.log("Announcement sent:", message);
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Post Announcement</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Send important updates to all platform users
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Announcement Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Write your announcement here..."
            rows={5}
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-colors"
          >
            Post Announcement
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementForm;