import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar.js';
import Footer from '../components/footer.js';
import { retrieveAvailableHotels, retrieveHotelsByDestinationID, retrieveStaticHotelDetailByHotelID } from '../services/ascenda-api.js';
import './HotelListings.css';
import './Home.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/memora.png";

// Utility functions
export const truncateText = (text, maxLength) => {
  if (!text) {
    return ''; 
  }
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

export const sortHotels = (filteredHotels, criteria) => {
  return filteredHotels.sort((a, b) => {
    if (criteria === "guest-rating") {
      const ratingA = a.trustyou && a.trustyou.score ? a.trustyou.score.overall : 0;
      const ratingB = b.trustyou && b.trustyou.score ? b.trustyou.score.overall : 0;
      return ratingB - ratingA;
    } else if (criteria === "price-low-to-high") {
      return a.pricePerNight - b.pricePerNight;
    } else if (criteria === "price-high-to-low") {
      return b.pricePerNight - a.pricePerNight;
    }
    return 0;
  });
};

// HotelCard Component
export const HotelCard = ({ hotel, handleClick }) => {
  const imageUrl = hotel.image_details ? `${hotel.image_details.prefix}${hotel.default_image_index}${hotel.image_details.suffix}` : logo;

  return (
    <div className="hotel-card">
      <img src={imageUrl} alt={hotel.name} className="hotel-image" loading="lazy" />
      <div className="hotel-info">
        <div className="hotel-main-info">
          <div className="hotel-name-rating">
            <h3>{hotel.name}</h3>
            <div className="guest-rating">
              <FontAwesomeIcon icon={faThumbsUp} />
              {hotel.trustyou && hotel.trustyou.score ? ` ${hotel.trustyou.score.overall} / 100` : 'N/A'}
            </div>
          </div>
          <p>{hotel.original_metadata ? hotel.original_metadata.city : "Unknown City"} · <a href="#">Show on map</a></p>
          <div className="horizontal-divider"></div>
          <p dangerouslySetInnerHTML={{ __html: hotel.description }}></p>
        </div>
      </div>
      <div className="vertical-divider"></div>
      <div className="hotel-rating-price">
        <div className="hotel-rating">
          <div>{hotel.rating} ★</div>
        </div>
        <div className="hotel-price">
          <p>Price per room per night from</p>
          <span>${hotel.pricePerNight}</span>
          <button className="more-info" onClick={() => handleClick(hotel.id)}>See more details</button>
        </div>
      </div>
    </div>
  );
};

// FilterSection Component
export const FilterSection = ({ starRatingFilter, handleStarRatingChange, priceRange, maxPrice, handlePriceChange, handleSearchClick }) => {
  return (
    <aside className="filter-section">
      <h2>Filter By</h2>
      <div className="filter-group">
        <label>Star Rating</label>
        <div className="star-rating">
          {[5, 4, 3, 2, 1].map(rating => (
            <label key={rating}>
              <input 
                type="checkbox" 
                onChange={(e) => handleStarRatingChange(e, rating)} 
                checked={starRatingFilter.includes(rating)} 
              />
              <span className="stars"> {'★'.repeat(rating) + '☆'.repeat(5 - rating)}</span> {rating} Star
            </label>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <label htmlFor="price-range">Price Range</label>
        <input 
          type="range" 
          id="price-range" 
          name="price-range" 
          min="0" 
          max={maxPrice} 
          value={priceRange} 
          onChange={handlePriceChange} 
        />
        <span id="price-range-value">$0 - ${priceRange}</span>
      </div>
      <div className="filter-group">
        <button className="search-button" onClick={handleSearchClick}>Search</button>
      </div>
    </aside>
  );
};

// Pagination Component
export const Pagination = ({ currentPage, totalPages, handlePaginationClick }) => {
  const maxPageButtons = 7;
  let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
  let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(endPage - maxPageButtons + 1, 1);
  }

  const pageNumbers = [];
  for (let number = startPage; number <= endPage; number++) {
    pageNumbers.push(number);
  }

  return (
    <div className="pagination">
      <button onClick={() => handlePaginationClick('prev')} disabled={currentPage === 1}>Prev</button>
      {pageNumbers.map(number => (
        <button key={number} onClick={() => handlePaginationClick(number)} className={currentPage === number ? 'active' : ''}>
          {number}
        </button>
      ))}
      <button onClick={() => handlePaginationClick('next')} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

// SortOptions Component
export const SortOptions = ({ sortCriteria, handleSortChange }) => {
  return (
    <div className="sort-options">
      <div className="left-sort-options">
        <label htmlFor="sort-by">Sort by:</label>
        <select id="sort-by" onChange={handleSortChange} value={sortCriteria}>
          <option value="guest-rating">Guest rating</option>
          <option value="price-low-to-high">Price (lowest to highest)</option>
          <option value="price-high-to-low">Price (highest to lowest)</option>
        </select>
      </div>
      <div className="view-icons">
        <button className="view-icon active">
          <i className="fas fa-th"></i>
        </button>
        <button className="view-icon">
          <i className="fas fa-th-list"></i>
        </button>
      </div>
    </div>
  );
};

// Main HotelListings Component
const HotelListings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [priceRange, setPriceRange] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [currentHotelsPage, setCurrentHotelsPage] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("guest-rating");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [starRatingFilter, setStarRatingFilter] = useState([]);
  const hotelsPerPage = 10;

  const fetchHotelsCalled = useRef(false);

  const { selectedCountry, countryUID, checkin, checkout, parent, children, rooms, hotelDuration, guests } = location.state || {};

  const preloadHotelDetailsForPage = async (hotels) => {
    for (const hotel of hotels) {
      try {
        retrieveStaticHotelDetailByHotelID(hotel.id);
      } catch (error) {
        console.error(`Failed to preload hotel details or rooms for hotel ID: ${hotel.id}`, error);
      }
    }
  };

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const cacheString = "filteredhotels";
      let filteredHotels;
      const params = {
        destination_id: countryUID,
        checkin,
        checkout,
        lang: 'en_US',
        currency: "SGD",
        country_code: "SG",
        guests,
        partner_id: "1"
      };
      const cachedID = JSON.stringify(params);
      const cached = sessionStorage.getItem(cacheString);
      let cachedData;

      if (cached) {
        cachedData = JSON.parse(cached);
      }

      if (cachedData && cachedData.cachedID === cachedID) {
        filteredHotels = cachedData.filteredHotels;
      } else {
        const priceResponsePromise = retrieveAvailableHotels(countryUID, checkin, checkout, "en_US", "SGD", "SG", guests, "1");
        const detailsResponsePromise = retrieveHotelsByDestinationID(countryUID);
		const [priceResponse, detailsResponse] = await Promise.all([priceResponsePromise, detailsResponsePromise]);

        const hotelPrices = priceResponse.data.hotels;
        const hotelDetails = detailsResponse.data;

        if (!hotelDetails) {
          throw new Error('Hotel details response is undefined');
        }

        const detailedHotels = hotelPrices.map(hotel => {
          const details = hotelDetails.find(detail => detail.id === hotel.id);
          if (!details) {
            return { ...hotel, name: hotel.name || "Unknown Hotel", rating: hotel.rating || 0, pricePerNight: 0, description: "No description available" };
          }
          const pricePerNight = (hotel.price / hotelDuration).toFixed(2);
          return { ...hotel, ...details, pricePerNight: parseFloat(pricePerNight), description: truncateText(details.description, 380) };
        });

        filteredHotels = detailedHotels.filter(hotel => hotel.pricePerNight > 0);
        const cacheStructure = {
          cachedID,
          filteredHotels
        };
        sessionStorage.setItem(cacheString, JSON.stringify(cacheStructure));
      }

      const maxPricePerNight = Math.max(...filteredHotels.map(hotel => hotel.pricePerNight));
      setPriceRange(maxPricePerNight);
      setMaxPrice(maxPricePerNight);
      setHotels(sortHotels(filteredHotels, sortCriteria));
      setFilteredHotels(sortHotels(filteredHotels, sortCriteria));

      const start = 0;
      const end = hotelsPerPage;
      const currentPageHotels = filteredHotels.slice(start, end);
      //preloadHotelDetailsForPage(currentPageHotels);
    } catch (error) {
      console.error("Failed to fetch hotels", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fetchHotelsCalled.current) {
      fetchHotelsCalled.current = true;
      if (countryUID && checkin && checkout && parent !== undefined && children !== undefined) {
        fetchHotels();
      }
    }
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * hotelsPerPage;
    const end = start + hotelsPerPage;
    const currentHotels = filteredHotels.slice(start, end);
    setCurrentHotelsPage(currentHotels);
    //preloadHotelDetailsForPage(currentHotels);
  }, [filteredHotels, currentPage]);

  const handleClick = (hotel_id) => {
    const state = { hotel_id };
    sessionStorage.setItem('hotelListingForm', JSON.stringify(state));
    navigate(`/ViewHotelDetails/${hotel_id}`, { state });
  };

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
    setFilteredHotels(sortHotels([...filteredHotels], e.target.value));
  };

  const handlePaginationClick = (value) => {
    if (value === 'prev') {
      setCurrentPage(currentPage => Math.max(1, currentPage - 1));
    } else if (value === 'next') {
      setCurrentPage(currentPage => Math.min(totalPages, currentPage + 1));
    } else {
      setCurrentPage(value);
    }
  };

  const handleStarRatingChange = (e, rating) => {
    let updatedStarRatings;

    if (e.target.checked) {
      updatedStarRatings = [...starRatingFilter, rating];
    } else {
      const maxStarRating = Math.max(...starRatingFilter);
      if (rating === maxStarRating) {
        updatedStarRatings = starRatingFilter.filter(item => item !== rating);
      } else {
        updatedStarRatings = starRatingFilter.filter(item => item > rating);
      }
    }

    const minStarRating = Math.min(...updatedStarRatings);
    const maxStarRating = Math.max(...updatedStarRatings);

    const newStarRatingFilter = [];
    for (let i = minStarRating; i <= maxStarRating; i++) {
      newStarRatingFilter.push(i);
    }

    setStarRatingFilter(newStarRatingFilter);
  };

  const handleSearchClick = () => {
    const minStarRating = Math.min(...starRatingFilter);
    const maxStarRating = Math.max(...starRatingFilter);

    const filtered = hotels.filter(hotel => {
      const hotelPrice = hotel.pricePerNight;
      const hotelRating = hotel.rating;

      const priceCondition = hotelPrice <= priceRange;
      const ratingCondition = starRatingFilter.length > 0 ? hotelRating >= minStarRating && hotelRating <= maxStarRating : true;

      return priceCondition && ratingCondition;
    });

    const sortedFilteredHotels = sortHotels(filtered, sortCriteria);

    setFilteredHotels(sortedFilteredHotels);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  return (
    <div>
      <Navbar />
      <div className="container">
        <header>
          <nav>
            <span className="link-text">Hotels</span> / 
            <span className="link-text"> {selectedCountry}</span> / 
            <span className="link-text"> {guests} guests</span> / 
            <span className="link-text"> {rooms} rooms</span> / 
            <span className="link-text"> {checkin} - {checkout}</span>
          </nav>
        </header>

        <div className="main-content">
          <FilterSection
            starRatingFilter={starRatingFilter}
            handleStarRatingChange={handleStarRatingChange}
            priceRange={priceRange}
            maxPrice={maxPrice}
            handlePriceChange={handlePriceChange}
            handleSearchClick={handleSearchClick}
          />

          <main className="hotel-listing">
            <SortOptions
              sortCriteria={sortCriteria}
              handleSortChange={handleSortChange}
            />
			
			{loading ? (
				<div className="loading-message">Fetching all available hotels... This may take up to 30 seconds.</div>
			) : (
			<>
			{filteredHotels.length === 0 ? (
				<div className="no-hotels-message">No hotels available for the search parameters.</div>
			) : (
			<div className="hotel-cards">
				{currentHotelsPage.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    handleClick={handleClick}
                  />
                ))}
              </div>
			  )}
			</>
            )}
          </main>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePaginationClick={handlePaginationClick}
        />
      </div>
      <Footer />
    </div>
  );
};

export default HotelListings;