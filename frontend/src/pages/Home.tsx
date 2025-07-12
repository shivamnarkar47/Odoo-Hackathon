// src/pages/HomePage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../components/UserProfile/Avatar";
import SkillTag from "../components/UserProfile/SkillTag";
import Badge from "../components/UserProfile/Badge";
import mockUsers from "../data/mockUsers.json";
// import type { User } from "../types";

const HomePage: React.FC = () => {
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesAvailability =
      availabilityFilter === "All" || user.availability === availabilityFilter;
      
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills_offered.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      user.skills_wanted.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
    return matchesAvailability && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-primary">Skill Exchange Community</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Availability</label>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="border border-input bg-background px-4 py-2 rounded-md text-sm focus:outline-none"
            >
              <option value="All">All</option>
              <option value="Weekends">Weekends</option>
              <option value="Evenings">Evenings</option>
              <option value="Daily">Daily</option>
            </select>
          </div>

          <div className="flex gap-2 w-full sm:w-96">
            <input
              type="text"
              placeholder="Search by name or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-input bg-background px-4 py-2 rounded-md w-full text-sm"
            />
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Link 
            to={`/profile/${user.id}`} 
            key={user.id}
            className="border border-muted bg-card shadow-sm rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <Avatar 
                src={user.profile_pic} 
                alt="Profile" 
                size="md"
                status={user.availability === "Unavailable" ? "offline" : "online"}
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
                    <SkillTag
                      key={skill}
                      skill={skill}
                      variant="offered"
                      className="text-xs"
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-sm">
                <span className="font-medium text-blue-600">Seeks:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.skills_wanted.map((skill) => (
                    <SkillTag
                      key={skill}
                      skill={skill}
                      variant="wanted"
                      className="text-xs"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {user.rating.toFixed(1)}
              </span>
              
              <Badge 
                text={user.availability}
                variant={
                  user.availability === "Unavailable" 
                    ? "danger" 
                    : user.availability === "Daily" 
                      ? "success" 
                      : "info"
                }
              />
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button className="px-3 py-1 rounded hover:bg-muted hover:text-primary">
            &lt; Prev
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted hover:text-primary"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1 rounded hover:bg-muted hover:text-primary">
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;