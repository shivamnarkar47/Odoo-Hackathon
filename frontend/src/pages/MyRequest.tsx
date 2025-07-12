import React, { useState } from "react";
import MyRequestFilters from "../components/SwapRequest/Filters";
import MyRequestCard from "../components/SwapRequest/MyRequestCard";
import myRequests from "../data/myRequests.json";

const MyRequest: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = myRequests.filter((req) => {
    const matchesStatus = statusFilter === "All" || req.status === statusFilter;
    const matchesSearch =
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.skills_offered.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      req.skills_wanted.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <MyRequestFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="space-y-4">
        {filtered.map((request) => {
          // Ensure status is one of the allowed values
          const allowedStatuses = ["Pending", "Accepted", "Rejected"] as const;
          const status =
            allowedStatuses.includes(request.status as any)
              ? (request.status as "Pending" | "Accepted" | "Rejected")
              : "Pending";
          return (
            <MyRequestCard
              key={request.id}
              request={{
                ...request,
                status,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyRequest;
