import React from "react";

const AssistanceFilterControls = ({
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  searchQuery,
  setSearchQuery,
  onClearFilters,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-6">
      <div className="flex flex-wrap justify-center gap-3 w-full max-w-4xl">
        <input
          type="text"
          placeholder="Search by name or message..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#1f2937] text-white border border-gray-600 rounded-md px-4 py-2 text-sm w-full md:w-72"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#1f2937] text-white border border-gray-600 rounded-md px-4 py-2 text-sm"
        >
          <option value="All">All Categories</option>
          <option value="Workout Assistance">Workout Assistance</option>
          <option value="Equipment Issue">Equipment Issue</option>
          <option value="Billing Concern">Billing Concern</option>
          <option value="Technical Problem">Technical Problem</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-[#1f2937] text-white border border-gray-600 rounded-md px-4 py-2 text-sm"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>

        <button
          onClick={onClearFilters}
          className="text-sm px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default AssistanceFilterControls;
