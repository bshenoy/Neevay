import React from 'react';

const SearchResultBadges = ({
  filters,
  setSearchQuery,
  setLocationSearchQuery,
  setRange,
  setSelectedLabourStrength,
  setSelectedBusinessAge,
  setSelectedCities,
  setIsVerified,
  setProjects,
  setSelectedRegion,
  setSelectedVendorType,
  setSelectedTradeOrBusiness,
}) => {
  const {
    searchQuery,
    locationSearchQuery,
    range,
    selectedLabourStrength,
    selectedBusinessAge,
    selectedCities,
    isVerified,
    projects,
  } = filters;

  const removeFilter = (filterType) => {
    switch (filterType) {
      case 'searchQuery':
        setSearchQuery('');
        break;
      case 'locationSearchQuery':
        setLocationSearchQuery('');
        break;
      case 'range':
        setRange([0, 100]);
        break;
      case 'selectedLabourStrength':
        setSelectedLabourStrength([0, 100]);
        break;
      case 'selectedBusinessAge':
        setSelectedBusinessAge([0, 100]);
        break;
      case 'selectedCities':
        setSelectedCities([]);
        break;
      case 'isVerified':
        setIsVerified(false);
        break;
      case 'projects':
        setProjects(0); // Assuming 50 is the default
        break;
      default:
        break;
    }
  };

  const activeFilters = [
    {
      label: `Services : ${searchQuery}`,
      type: 'searchQuery',
      condition: searchQuery !== '',
    },
    { label: locationSearchQuery, type: 'locationSearchQuery' },
    {
      label: `Turnover : ${range[0]} - ${range[1]}`,
      type: 'range',
      condition: range[0] !== 0 || range[1] !== 100,
    },
    {
      label: `${selectedLabourStrength[0]} - ${selectedLabourStrength[1]}`,
      type: 'selectedLabourStrength',
      condition:
        selectedLabourStrength[0] !== 0 || selectedLabourStrength[1] !== 100,
    },
    {
      label: `${selectedBusinessAge[0]} - ${selectedBusinessAge[1]}`,
      type: 'selectedBusinessAge',
      condition: selectedBusinessAge[0] !== 0 || selectedBusinessAge[1] !== 100,
    },
    ...selectedCities.map((city) => ({ label: city, type: 'selectedCities' })),
    { label: 'Verified Vendor', type: 'isVerified', condition: isVerified },
    {
      label: `ProjectsCompleted: ${projects}`,
      type: 'projects',
      condition: projects !== 0,
    },
  ].filter((filter) => filter.label && filter.condition !== false);

  return (
    <div className="space-x-4 mt-8">
      {activeFilters.map((filter, index) => (
        <span
          key={index}
          id={`badge-${filter.type}-${index}`}
          className="inline-flex items-center px-2 py-1 text-sm font-medium text-black bg-[#E0E0D3]"
        >
          {filter.label}
          <button
            type="button"
            className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900"
            aria-label="Remove"
            onClick={() => removeFilter(filter.type)}
          >
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">close</span>
          </button>
        </span>
      ))}
    </div>
  );
};

export default SearchResultBadges;
