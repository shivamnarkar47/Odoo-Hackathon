import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  request: {
    id: number;
    name: string;
    profile_pic: string;
    skills_offered: string[];
    skills_wanted: string[];
    rating: number;
    status: "Pending" | "Accepted" | "Rejected";
  };
}

const SwapRequestCard: React.FC<Props> = ({ request }) => {
  const navigate = useNavigate();

  const getStatusColor = () => {
    switch (request.status) {
      case "Pending":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case "Accepted":
        return "bg-green-50 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-50 text-red-800 border-red-200";
    }
  };

  const handleCardClick = () => {
    navigate(`/profile/${request.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Delete request:", request.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer border border-gray-200 bg-white rounded-xl shadow-sm transition-all hover:shadow-md p-5 hover:border-primary-300"
    >
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex items-start gap-4 flex-1">
          <div className="relative">
            <img
              src={request.profile_pic}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
              <div className="bg-green-400 border-2 border-white rounded-full w-4 h-4" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {request.name}
              </h3>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-1 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 ${i < Math.floor(request.rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-1">{request.rating.toFixed(1)}</span>
              </div>

              <div className="mb-3">
                <p className="text-xs font-medium text-gray-500 mb-1">OFFERING</p>
                <div className="flex flex-wrap gap-1">
                  {request.skills_offered.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">SEEKING</p>
                <div className="flex flex-wrap gap-1">
                  {request.skills_wanted.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col gap-4 items-end"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-end gap-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor()}`}>
              {request.status}
            </span>

            {request.status === "Pending" && (
              <div className="flex gap-2">
                <button 
                  className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                  title="Accept request"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Accept
                </button>
                <button 
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                  title="Reject request"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Reject
                </button>
              </div>
            )}

            {request.status === "Rejected" && (
            <button
              onClick={handleDelete}
              className="px-1 py-1.5 flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors text-xs"
              title="Delete request"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Delete</span>
            </button>
         )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapRequestCard;