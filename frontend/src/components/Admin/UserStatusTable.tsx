import React, { useState } from "react";
import mockUsers from "../../data/mockUsers.json";
import banList from "../../data/banList.json";

const UserStatusTable: React.FC = () => {
  const [showBanned, setShowBanned] = useState(false);

  const banned = showBanned ? banList : mockUsers;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {showBanned ? "Banned Users" : "All Users"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {showBanned 
              ? "Users who have been restricted from the platform" 
              : "All registered users on the platform"}
          </p>
        </div>
        
        <button
          onClick={() => setShowBanned(!showBanned)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium text-sm transition-colors"
        >
          {showBanned ? "Show Normal Users" : "Show Banned Users"}
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {showBanned ? "Reason" : "Name"}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {showBanned ? "Banned At" : "Location"}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {banned.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No users found
                </td>
              </tr>
            ) : (
              banned.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.user_email || user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.reason || user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.banned_at || user.location}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <div>Showing {banned.length} of {banned.length} users</div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600">Previous</button>
          <span>Page 1 of 1</span>
          <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600">Next</button>
        </div>
      </div>
    </div>
  );
};

export default UserStatusTable;