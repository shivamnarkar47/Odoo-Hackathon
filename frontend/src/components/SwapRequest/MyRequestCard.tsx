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

const MyRequestCard: React.FC<Props> = ({ request }) => {
  const navigate = useNavigate();

  const getStatusStyle = () => {
    switch (request.status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Accepted":
        return "bg-green-100 text-green-800 border-green-300";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-300";
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Deleting my request:", request.id);
  };

  return (
    <div
      onClick={() => navigate(`/profile/${request.id}`)}
      className="border border-muted bg-card rounded-xl p-5 hover:shadow-md cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row gap-5">
        <img
          src={request.profile_pic}
          alt={request.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <h3 className="text-lg font-semibold">{request.name}</h3>
            <span className={`px-3 py-1 text-xs rounded-full border ${getStatusStyle()}`}>
              {request.status}
            </span>
          </div>

          <div className="text-sm text-muted-foreground mb-2">
            Rating: {request.rating.toFixed(1)} ★
          </div>

          <div className="mb-2">
            <p className="text-xs font-medium text-gray-500">Skills Offered</p>
            <div className="flex flex-wrap gap-1">
              {request.skills_offered.map((skill, i) => (
                <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500">Skills Wanted</p>
            <div className="flex flex-wrap gap-1">
              {request.skills_wanted.map((skill, i) => (
                <span key={i} className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {request.status === "Rejected" && (
          <button
            onClick={handleDelete}
            title="Delete Request"
            className="text-red-500 hover:text-red-700 self-start"
          >
            🗑
          </button>
        )}
      </div>
    </div>
  );
};

export default MyRequestCard;
