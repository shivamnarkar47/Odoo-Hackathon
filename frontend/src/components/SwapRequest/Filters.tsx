import React from "react";

interface Props {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SwapRequestFilters: React.FC<Props> = ({
  statusFilter,
  setStatusFilter,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex gap-2 items-center">
        <label className="text-sm font-medium">Status</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-input bg-background px-4 py-2 rounded-md text-sm focus:outline-none"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
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
  );
};

export default SwapRequestFilters;