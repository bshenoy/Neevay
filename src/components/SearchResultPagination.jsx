import React from 'react';

const SearchResultPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleButtonClick = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];

    // Show "Previous" button
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          className="border border-black px-3 py-1"
          onClick={() => handleButtonClick(currentPage - 1)}
        >
          <img
            src="https://storagereponeevaydevcdn.blob.core.windows.net/business/dropdown_arrow.svg"
            alt="Previous"
            className="rotate-90"
          />
        </button>,
      );
    }

    // Show current page button and adjacent page buttons
    if (totalPages <= 5) {
      // Show all pages if there are 5 or fewer pages
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`border px-3 py-1 ${i === currentPage ? 'bg-black text-white' : 'border-black'}`}
            onClick={() => handleButtonClick(i)}
          >
            {i}
          </button>,
        );
      }
    } else {
      // Show buttons for current page and adjacent pages
      if (currentPage > 1) {
        buttons.push(
          <button
            key={currentPage - 1}
            className={`border px-3 py-1 ${currentPage === currentPage - 1 ? 'bg-black text-white' : 'border-black'}`}
            onClick={() => handleButtonClick(currentPage - 1)}
          >
            {currentPage - 1}
          </button>,
        );
      }

      buttons.push(
        <button
          key={currentPage}
          className={`border px-3 py-1 ${currentPage === currentPage ? 'bg-black text-white' : 'border-black'}`}
          onClick={() => handleButtonClick(currentPage)}
        >
          {currentPage}
        </button>,
      );

      if (currentPage < totalPages) {
        buttons.push(
          <button
            key={currentPage + 1}
            className={`border px-3 py-1 ${currentPage === currentPage + 1 ? 'bg-black text-white' : 'border-black'}`}
            onClick={() => handleButtonClick(currentPage + 1)}
          >
            {currentPage + 1}
          </button>,
        );
      }
    }

    // Show "Next" button
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          className="border border-black px-3 py-1"
          onClick={() => handleButtonClick(currentPage + 1)}
        >
          <img
            src="https://storagereponeevaydevcdn.blob.core.windows.net/business/dropdown_arrow.svg"
            alt="Next"
            style={{ transform: 'rotate(270deg)' }}
          />
        </button>,
      );
    }

    return buttons;
  };

  return (
    <div className="flex justify-end items-center space-x-4">
      {renderPageButtons()}
    </div>
  );
};

export default SearchResultPagination;
