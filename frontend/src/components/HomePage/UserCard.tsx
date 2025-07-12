import React from "react";
import type { User } from "../../types";

const availabilityColors = {
  Weekends: "bg-green-100 text-green-800",
  Evenings: "bg-blue-100 text-blue-800",
  Daily: "bg-purple-100 text-purple-800",
  Unavailable: "bg-gray-100 text-gray-800",
};

interface UserCardProps {
  user: User;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border border-muted bg-card shadow-sm rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user.profile_pic}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.location}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm mb-2">
          <span className="font-medium text-green-600">Offers:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {user.skills_offered.map((skill) => (
              <span
                key={skill}
                className="inline-block bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="text-sm">
          <span className="font-medium text-blue-600">Seeks:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {user.skills_wanted.map((skill) => (
              <span
                key={skill}
                className="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-yellow-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {user.rating.toFixed(1)}
        </span>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            availabilityColors[
              user.availability as keyof typeof availabilityColors
            ] || "bg-gray-100 text-gray-800"
          }`}
        >
          {user.availability}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
