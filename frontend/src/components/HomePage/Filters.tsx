import React from "react";

interface FiltersProps {
  availabilityFilter: string;
  setAvailabilityFilter: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  availabilityFilter,
  setAvailabilityFilter,
  searchTerm,
  setSearchTerm
}) => {
  return (
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
  );
};

export default Filters;