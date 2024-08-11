import React from 'react';

const SearchResultText = ({ cardsPerPage, totalCards }) => {
  return (
    <div>
      <p className="bg-[#E6E6E5] text-base px-8 py-4 mt-[92px]">
        {totalCards > 0 && (
          <span>
            Showing 1-{cardsPerPage} of {totalCards} results
          </span>
        )}
      </p>
    </div>
  );
};

export default SearchResultText;
