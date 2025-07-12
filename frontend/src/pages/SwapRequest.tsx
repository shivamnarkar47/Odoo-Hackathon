import React, { useState } from "react";
import SwapRequestFilters from "../components/SwapRequest/Filters";
import SwapRequestCard from "../components/SwapRequest/Card";
import mockRequests from "../data/mockRequests.json";

const SwapRequest: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRequests = mockRequests.filter((request) => {
    const matchesStatus = statusFilter === "All" || request.status === statusFilter;
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.skills_offered.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      request.skills_wanted.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <SwapRequestFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <SwapRequestCard
            key={request.id}
            request={{
              ...request,
              status: ["Pending", "Accepted", "Rejected"].includes(request.status)
                ? (request.status as "Pending" | "Accepted" | "Rejected")
                : "Pending",
            }}
          />
        ))}
      </div>

      {filteredRequests.length > 5 && (
        <div className="flex justify-center pt-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <button className="px-3 py-1 rounded hover:bg-muted hover:text-primary">
              &lt; Prev
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded ${page === 1
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
      )}
    </div>
  );
};

export default SwapRequest;
