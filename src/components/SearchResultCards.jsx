import React, { useEffect, useState, useMemo } from 'react';
import SearchResultBadges from './SearchResultBadges';
import vendorsData from './vendorData.json';

const mockData = [
  {
    id: 1,
    name: 'Satya Sai Engineering',
    services: 'Plumbing, Waterproofing, Construction',
    turnover: '₹50 Lakh',
    laborStrength: '25',
    projectsCompleted: '20',
    businessAge: '20 years',
    email: 'business1@example.com',
    phone: '1234567890',
    team: [
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '9876543210',
        initials: 'JD',
      },
      {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        phone: '9876543211',
        initials: 'JS',
      },
    ],
  },
];

const ContactInfoPopup = ({ business, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-[505px] h-[459px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Contact Info</h2>
          <button onClick={onClose} className="text-gray-500">
            Close
          </button>
        </div>
        <div className="bg-gray-100 p-4 mb-4 rounded">
          <h3 className="font-bold text-gray-600">Business Contact Details</h3>
          <h3 className="font-bold">{business.vendorName}</h3>
          <p>{business.vendorContact.email}</p>
          <p>{business.vendorContact.phone}</p>
        </div>
        <div className="bg-gray-100 p-4">
          <h3 className="font-bold text-gray-600">Team Contact Details</h3>
          {business.vendorTeam.map((member, index) => (
            <div key={index} className="flex items-center my-2">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold mr-4">
                {/* If `initials` is not present, you might need to create it from member's name */}
                {member.initials || member.Name[0]}
              </div>
              <div>
                <p className="font-bold">{member.Name}</p>
                <p>{member.Email}</p>
                <p>{member.Phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ViewProfilePopup = ({ vendorData, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl mx-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold">Vendor Information</h2>
          <button onClick={onClose} className="text-gray-500">
            Close
          </button>
        </div>

        {/* Vendor Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vendor Basic Info */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">{vendorData.vendorName}</h3>
            <p className="text-gray-600">
              <strong>Vendor Type:</strong> {vendorData.vendorType}
            </p>
            <p className="text-gray-600">
              <strong>Turnover:</strong> {vendorData.turnover}
            </p>
            <p className="text-gray-600">
              <strong>Labor Strength:</strong> {vendorData.laborStrength}
            </p>
            <p className="text-gray-600">
              <strong>Business Age:</strong> {vendorData.businessAge}
            </p>
            <p className="text-gray-600">
              <strong>Projects Completed:</strong>{' '}
              {vendorData.projectsCompleted}
            </p>
            <p className="text-gray-600">
              <strong>Verified:</strong>{' '}
              <span className="text-green-600">
                {vendorData.verifiedStatus ? 'Yes' : 'No'}
              </span>
            </p>
          </div>

          {/* Vendor Contact Info */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <p className="text-gray-600">
              <strong>Email:</strong> {vendorData.vendorContact.email}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {vendorData.vendorContact.phone}
            </p>
          </div>

          {/* Vendor Office Address */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Office Address</h3>
            <p className="text-gray-600">
              {vendorData.officeAddress.AddressLine1},{' '}
              {vendorData.officeAddress.City}, {vendorData.officeAddress.State}
            </p>
          </div>

          {/* Service Locations */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Service Locations</h3>
            <p className="text-gray-600">
              <strong>States:</strong>{' '}
              {vendorData.serviceLocations.state.join(', ')}
            </p>
            <p className="text-gray-600">
              <p className="text-gray-600">
                <strong>Cities:</strong>{' '}
                {vendorData?.serviceLocations?.Selectedcities?.join(', ') ||
                  'Not Available'}
              </p>
            </p>
          </div>

          {/* Vendor Services */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Services Offered</h3>
            <p className="text-gray-600">{vendorData.services.join(', ')}</p>
          </div>

          {/* Vendor Team */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Vendor Team</h3>
            <ul className="list-disc ml-5 text-gray-600">
              {vendorData.vendorTeam.map((member, index) => (
                <li key={index}>
                  {member.Name} - {member.Email} - {member.Phone}
                </li>
              ))}
            </ul>
          </div>

          {/* Vendor Description */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold">Vendor Description</h3>
            <p className="text-gray-600">{vendorData.vendorDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BusinessCard = ({ business, onViewContact, onViewProfile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const description = `From concept to completion, we offer comprehensive services, including plumbing, waterproofing, and construction, tailored to your specific needs. Our expert team is dedicated to delivering high-quality results with a focus on customer satisfaction...`;
  const truncatedDescription = description.slice(0, 150);

  return (
    <div
      style={{
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)',
        overflowY: 'scroll',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
      className="overflow-y-auto lg:w-[867px] md:w-[664px] md:h-[284px] lg:h-[299px] bg-white md:p-[28px] lg:px-[35px] lg:pt-[35px] lg:pb-[15px] rounded-sm my-6"
    >
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <img
            src="https://storagereponeevaydevcdn.blob.core.windows.net/business/no_business_img.svg"
            alt="Vendor"
            className="lg:h-[140px] lg:w-[140px] md:w-[107px] md:h-[107px] object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-[#212112]">
              {business.vendorName}
            </h3>
            {business.verifiedStatus ? (
              <div className="flex items-center pb-2 md:pt-[6px] md:pb-[12px]">
                <img
                  src="https://storagereponeevaydevcdn.blob.core.windows.net/business/blue_tick.svg"
                  alt="blue tick"
                />
                <span className="text-sm font-medium text-gray-600 pl-[3px]">
                  Verified vendor
                </span>
              </div>
            ) : (
              <div className="flex items-center pb-2 md:pt-[6px] md:pb-[12px]">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-2">
                  !
                </div>
                <span className="text-sm font-medium text-red-600">
                  Not Verified
                </span>
              </div>
            )}
            <p className="text-sm font-bold text-gray-500 pb-2">
              {business.services}
            </p>
            <div className="bg-[#F5F4F5] md:w-[360px] lg:w-[479px] grid grid-cols-2 gap-4 md:p-[10px] lg:p-[19px]">
              <div className="flex items-center space-x-2">
                <img
                  src="https://storagereponeevaydevcdn.blob.core.windows.net/business/rupees.svg"
                  alt="Rs."
                />
                <span className="text-gray-700 md:text-xs lg:text-sm">
                  Turnover :
                </span>
                <span className="font-bold md:text-xs lg:text-sm">
                  {business.turnover}
                </span>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <img
                  src="https://storagereponeevaydevcdn.blob.core.windows.net/business/labour_strength.svg"
                  alt="labour"
                />
                <span className="text-gray-700 md:text-xs lg:text-sm">
                  Labour Strength :
                </span>
                <span className="font-bold md:text-xs lg:text-sm">
                  {business.laborStrength}
                </span>
              </div>
              <div className="flex items-center  space-x-2">
                <img
                  src="https://storagereponeevaydevcdn.blob.core.windows.net/business/business_age.svg"
                  alt="age"
                />
                <span className="text-gray-700 md:text-xs lg:text-sm">
                  Business Age :
                </span>
                <span className="font-bold md:text-xs lg:text-sm">
                  {business.businessAge}
                </span>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <img
                  src="https://storagereponeevaydevcdn.blob.core.windows.net/business/projects_completed.svg"
                  alt="proj."
                />
                <span className="text-gray-700 md:text-xs lg:text-sm">
                  Projects Completed :
                </span>
                <span className="font-bold md:text-xs lg:text-sm">
                  {business.projectsCompleted}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              onViewProfile(business);
              console.log('the details clicked', business);
            }}
            className="mx-4 text-base font-bold text-[#4E4E4E] underline"
          >
            View Profile
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div className="text-sm w-[620px] text-gray-500 mt-[15px]">
          {isExpanded ? description : truncatedDescription}
          <button
            onClick={handleToggle}
            className="text-blue-500 underline ml-1"
          >
            See More
          </button>
        </div>
        <button
          onClick={() => onViewContact(business)}
          className="lg:w-[125px] lg:h-[44px] md:w-[129px] md:h-[44px] flex justify-center items-center text-white text-sm bg-[#2D2D24] rounded-sm"
        >
          View Contact
        </button>
      </div>
    </div>
  );
};

const SearchResultCards = ({
  filters,
  setSearchQuery,
  setLocationSearchQuery,
  setRange,
  setSelectedLabourStrength,
  setSelectedBusinessAge,
  setSelectedCities,
  setIsVerified,
  setProjects,
  setFilteredCards,
  currentPage, // Add currentPage as a prop
  cardsPerPage, // Add cardsPerPage as a prop,
}) => {
  const {
    selectedVendorType,
    selectedTradeOrBusiness,
    selectedRegion,
    searchQuery,
    range,
    selectedLabourStrength,
    selectedBusinessAge,
    selectedCities,
    isVerified,
    projects,
  } = filters;

  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseProfilePopup = () => {
    setSelectedProfile(null);
  };

  const handleViewContact = (business) => {
    setSelectedBusiness(business);
  };

  const handleClosePopup = () => {
    setSelectedBusiness(null);
  };

  const matchesLabourStrength = (
    cardLabourStrength,
    selectedLabourStrengthRange,
  ) => {
    const [cardMin, cardMax] = cardLabourStrength;
    const [selectedMin, selectedMax] = selectedLabourStrengthRange;

    return cardMin <= selectedMax && cardMax >= selectedMin;
  };

  const parseRange = (rangeString) => {
    if (typeof rangeString !== 'string') return [0, 100];
    if (!rangeString) return [0, 100];

    const [min, max] = rangeString
      .split('-')
      .map((val) => parseInt(val.trim(), 10));
    return [min || 0, max || 100];
  };

  const applyFilters = (cards) => {
    const hasFilters =
      selectedVendorType ||
      selectedTradeOrBusiness ||
      selectedRegion ||
      searchQuery ||
      range[0] !== 0 ||
      range[1] !== 100 ||
      selectedLabourStrength[0] !== 0 ||
      selectedLabourStrength[1] !== 100 ||
      selectedBusinessAge[0] !== 0 ||
      selectedBusinessAge[1] !== 100 ||
      selectedCities.length > 0 ||
      isVerified !== false ||
      projects !== null;

    if (!hasFilters) {
      return cards;
    }

    return cards.filter((card) => {
      const matchesVendorType =
        !selectedVendorType ||
        (card.vendorType &&
          card.vendorType.toLowerCase() === selectedVendorType.toLowerCase());
      const matchesTradeOrBusiness =
        !selectedTradeOrBusiness ||
        (card.services &&
          card.services.some((service) =>
            service
              .toLowerCase()
              .includes(selectedTradeOrBusiness.toLowerCase()),
          ));
      const matchesRegion =
        !selectedRegion ||
        (card.officeAddress?.City &&
          card.officeAddress.City.toLowerCase().includes(
            selectedRegion.toLowerCase(),
          ));

      const cardTurnoverValue = parseInt(card.turnover.replace(/[^0-9]/g, ''));

      const cardLabourStrength = parseRange(card.laborStrength);
      const cardBusinessAge = parseRange(card.businessAge);
      const selectedLabourStrengthRange = parseRange(selectedLabourStrength);
      const selectedBusinessRange = parseRange(selectedBusinessAge);

      const matchesRange =
        !range ||
        (cardTurnoverValue >= range[0] && cardTurnoverValue <= range[1]);
      const matchesLabourStrengthValue =
        !selectedLabourStrengthRange ||
        matchesLabourStrength(cardLabourStrength, selectedLabourStrengthRange);
      const matchesBusinessAge =
        !selectedBusinessRange ||
        matchesLabourStrength(cardBusinessAge, selectedBusinessRange);

      const matchesCities =
        !selectedCities.length ||
        selectedCities.some((city) => card.officeAddress.City.includes(city));
      const matchesVerified =
        isVerified === null ||
        !isVerified ||
        card.verifiedStatus === isVerified;

      const matchesSearchQuery =
        !searchQuery ||
        card.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.services.some((service) =>
          service.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchedProjects =
        projects === null || card.projectsCompleted >= projects;

      return (
        matchesVendorType &&
        matchesTradeOrBusiness &&
        matchesRegion &&
        matchesRange &&
        matchesSearchQuery &&
        matchesLabourStrengthValue &&
        matchesBusinessAge &&
        matchesCities &&
        matchesVerified &&
        matchedProjects
      );
    });
  };

  const filteredCards = useMemo(() => {
    return applyFilters(vendorsData);
  }, [
    vendorsData,
    selectedVendorType,
    selectedTradeOrBusiness,
    selectedRegion,
    searchQuery,
    range,
    selectedLabourStrength,
    selectedBusinessAge,
    selectedCities,
    isVerified,
    projects,
  ]);

  useEffect(() => {
    setFilteredCards(filteredCards.length);
  }, [filteredCards, setFilteredCards]);

  // Pagination Logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <>
      <SearchResultBadges
        filters={{
          searchQuery,
          range,
          selectedLabourStrength,
          selectedBusinessAge,
          selectedCities,
          isVerified,
          projects,
        }}
        setSearchQuery={setSearchQuery}
        setLocationSearchQuery={setLocationSearchQuery}
        setRange={setRange}
        setSelectedLabourStrength={setSelectedLabourStrength}
        setSelectedBusinessAge={setSelectedBusinessAge}
        setSelectedCities={setSelectedCities}
        setIsVerified={setIsVerified}
        setProjects={setProjects}
      />
      <div className="min-h-screen flex flex-col items-center pr-8">
        <div className="w-full max-w-6xl">
          {currentCards.length > 0 ? (
            currentCards.map((business) => (
              <BusinessCard
                key={business.vendorId}
                business={business}
                onViewContact={handleViewContact}
                onViewProfile={() => handleViewProfile(business)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full mt-20 ">
              <div className=' lg:w-[867px] md:w-[664px] md:h-[284px] lg:h-[299px] bg-white md:p-[28px] lg:px-[35px] lg:pt-[35px] lg:pb-[15px] rounded-sm my-6'>
              <img
                src="https://www.pngkit.com/png/detail/4-43315_empty-state-svg.png"  // Replace with your own image URL
                alt="No cards available"
                className="w-1/2 h-1/2 mb-8"
              />
              <p className="text-lg text-gray-600">No cards to show</p>
              <p className="text-base text-gray-500">
                Try adjusting your filters or check back later.
              </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedProfile && (
        <ViewProfilePopup
          vendorData={selectedProfile}
          onClose={handleCloseProfilePopup}
        />
      )}
      {selectedBusiness && (
        <ContactInfoPopup
          business={selectedBusiness}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

// Filter function using the props
// const filterVendors = (vendors, filters) => {
//   return vendors.filter((vendor) => {
//     const {
//       isVerified,
//       selectedCities,
//       turnover,
//       laborStrength,
//       businessAge,
//       searchQuery,
//       projects,
//     } = filters;

//     const vendorTurnover = parseInt(
//       vendor.turnover.replace('₹', '').replace(' Lakh', '').replace(',', ''),
//     );
//     const vendorLaborStrength = parseInt(vendor.laborStrength);
//     const vendorBusinessAge = parseInt(
//       vendor.businessAge.replace(' years', ''),
//     );
//     const vendorProjects = vendor.projectsCompleted;

//     return (
//       vendor.verifiedStatus === isVerified &&
//       selectedCities.includes(vendor.city) &&
//       vendorTurnover >= turnover[0] &&
//       vendorTurnover <= turnover[1] &&
//       vendorLaborStrength >= parseInt(laborStrength.split('-')[0]) &&
//       vendorLaborStrength <= parseInt(laborStrength.split('-')[1]) &&
//       vendorBusinessAge >= businessAge[0] &&
//       vendorBusinessAge <= businessAge[1] &&
//       vendorProjects === projects &&
//       vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   });
// };

export default SearchResultCards;
