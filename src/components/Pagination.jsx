"use client";

import React from "react";

const Pagination = (props) => {
  const { currentPage, totalPages, onPageChange } = props;
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center text-neutral-100 items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
      <button
        onClick={handlePrevious}
        className="px-4 py-2 bg-carafe text-onSecondary rounded hover:bg-hoverSecondary"
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        className="px-4 py-2 bg-carafe text-onSecondary rounded hover:bg-hoverSecondary"
        
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
