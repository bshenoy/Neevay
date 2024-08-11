import React, { useState } from 'react';
import SearchResultNavbar from './SearchResultNavbar';
import SearchResultCards from './SearchResultCards';
import SearchResultFilters from './SearchResultFilters';
import SearchResultText from './SearchResultText';
import SearchResultPagination from './SearchResultPagination';
import SearchResultFooter from './SearchResultFooter';

const SearchResults = (ActiveFilters) => {
  const [filtersClicked, setFiltersClicked] = useState(true);

  const handleFilters = () => {
    setFiltersClicked(!filtersClicked);
  };
  const [selectedVendorType, setSelectedVendorType] = useState('');
  const [selectedTradeOrBusiness, setSelectedTradeOrBusiness] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [filteredCardLength, setFilteredCardsLength] = useState(0);
  // console.log("the values",selectedRegion, selectedTradeOrBusiness, selectedVendorType )

  const [searchQuery, setSearchQuery] = useState('');
  const [locationSearchQuery, setLocationSearchQuery] = useState('');

  const [range, setRange] = useState([0, 100]);
  const [selectedLabourStrength, setSelectedLabourStrength] = useState([
    0, 100,
  ]);
  const [selectedBusinessAge, setSelectedBusinessAge] = useState([0, 100]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [projects, setProjects] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  const totalPages = Math.ceil(filteredCardLength / cardsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filters = {
    selectedVendorType,
    selectedTradeOrBusiness,
    selectedRegion,
    searchQuery,
    locationSearchQuery,
    range,
    selectedLabourStrength,
    selectedBusinessAge,
    selectedCities,
    isVerified,
    projects,
  };

  const handleVendorTypeChange = (newType) => {
    setSelectedVendorType(newType);
  };

  const handleTradeOrBusinessChange = (newTradeOrBusiness) => {
    setSelectedTradeOrBusiness(newTradeOrBusiness);
  };

  const handleRegionChange = (newRegion) => {
    setSelectedRegion(newRegion);
  };

  return (
    <div
      className="max-w-[1280px] mx-auto flex flex-col justify-center hide-scrollbar"
      style={{
        overflowY: 'scroll',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {/* Inject global styles for scrollbar hiding */}
      <style>
        {`
          .hide-scrollbar {
            -ms-overflow-style: none; /* Internet Explorer 10+ */
            scrollbar-width: none; /* Firefox */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
          }
        `}
      </style>
      <SearchResultNavbar
        selectedVendorType={selectedVendorType}
        selectedTradeOrBusiness={selectedTradeOrBusiness}
        selectedRegion={selectedRegion}
        onVendorTypeChange={handleVendorTypeChange}
        onTradeOrBusinessChange={handleTradeOrBusinessChange}
        onRegionChange={handleRegionChange}
      />

      <SearchResultText
        cardsPerPage={cardsPerPage}
        totalCards={filteredCardLength}
      />
      <div className="flex justify-between bg-gray-100">
        <div className=" my-8 h-screen overflow-y-auto hide-scrollbar">
          {/* <SearchResultFilters /> */}
          <SearchResultFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            locationSearchQuery={locationSearchQuery}
            setLocationSearchQuery={setLocationSearchQuery}
            range={range}
            setRange={setRange}
            selectedLabourStrength={selectedLabourStrength}
            setSelectedLabourStrength={setSelectedLabourStrength}
            selectedBusinessAge={selectedBusinessAge}
            setSelectedBusinessAge={setSelectedBusinessAge}
            selectedCities={selectedCities}
            setSelectedCities={setSelectedCities}
            isVerified={isVerified}
            setIsVerified={setIsVerified}
            setProjects={setProjects}
            projects={projects}
          />
        </div>
        <div className="mt-8 h-screen overflow-y-auto hide-scrollbar">
          <SearchResultCards
            filters={filters}
            setSearchQuery={setSearchQuery}
            setLocationSearchQuery={setLocationSearchQuery}
            setRange={setRange}
            setSelectedLabourStrength={setSelectedLabourStrength}
            setSelectedBusinessAge={setSelectedBusinessAge}
            setSelectedCities={setSelectedCities}
            setIsVerified={setIsVerified}
            setProjects={setProjects}
            setFilteredCards={setFilteredCardsLength}
            filteredCards={filteredCardLength}
            currentPage={currentPage}
            cardsPerPage={cardsPerPage}
          />
        </div>
      </div>
      <div className="bg-gray-100 pb-8 pr-8">
        <SearchResultPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <SearchResultFooter />
    </div>
  );
};

export default SearchResults;
