import React, { useEffect, useState } from "react";
import mockSwaps from "../../data/swapList.json";

interface Swap {
  id: number;
  requester: { id: number; name: string; email: string };
  receiver: { id: number; name: string; email: string };
  skill_offered: { id: number; name: string };
  skill_wanted: { id: number; name: string };
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  updated_at: string;
  requester_rating: number | null;
  requester_feedback: string;
  receiver_rating: number | null;
  receiver_feedback: string;
}

const SwapList: React.FC = () => {
  const [swaps, setSwaps] = useState<Swap[]>([]);

  useEffect(() => {
    setSwaps(
      mockSwaps.map((swap) => ({
        ...swap,
        status: swap.status as "pending" | "accepted" | "rejected",
      }))
    );
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">All Swap Requests</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View and manage all skill swap requests on the platform
        </p>
      </div>
      
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Requester
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Receiver
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Skill Offered
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Skill Wanted
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {swaps.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No swap requests found
                </td>
              </tr>
            ) : (
              swaps.map((swap) => (
                <tr key={swap.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {swap.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div className="font-medium">{swap.requester.name}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">{swap.requester.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div className="font-medium">{swap.receiver.name}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">{swap.receiver.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {swap.skill_offered.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {swap.skill_wanted.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(swap.status)}`}>
                      {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(swap.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <div>Showing {swaps.length} of {swaps.length} swap requests</div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600">Previous</button>
          <span>Page 1 of 1</span>
          <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600">Next</button>
        </div>
      </div>
    </div>
  );
};

export default SwapList;