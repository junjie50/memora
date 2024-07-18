import Navbar from '../components/Navbar.js';
import Footer from '../components/footer.js';
import { useLocation , useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import logo from "../assets/memora.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { retrieveAvailableHotels, retrieveStaticHotelDetailByHotelID } from '../services/ascenda-api.js';
import './HotelListings.css';
import './Home.js';

function HotelListings() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [priceRange, setPriceRange] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHotels, setTotalHotels] = useState(0);
  const [sortCriteria, setSortCriteria] = useState("guest-rating");
  const hotelsPerPage = 10; // more means will retrieve more from APi -> can cause error

  // retrieve state passed from Home component
  const { countryUID, checkin, checkout, parent, children } = location.state || {};

  // for hotel description
  const truncateText = (text, maxLength) => {
    if (!text) {
        return ''; // Return an empty string if text is undefined or null
    }
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};


  //-----HOTELS LISTINGS-----
  const fetchHotels = async (page) => {
    try {
      console.log("Fetching hotel prices...");
      console.log("Arguments for retrieveAvailableHotels:", {
        countryUID,
        checkin,
        checkout,
        language: "en_US",
        currency: "SGD",
        country: "SG",
        guests: parent + children,
        partnerid: "1"
      });
      const priceResponse = await retrieveAvailableHotels(countryUID, checkin, checkout, "en_US", "SGD", "SG", parent+children, "1");
      const hotelPrices = priceResponse.data.hotels.slice((page - 1) * hotelsPerPage, page * hotelsPerPage);
      setTotalHotels(priceResponse.data.hotels.length); // set the total number of hotels
      const maxPriceFromAPI = Math.max(...hotelPrices.map(hotel => hotel.lowest_price));
      setMaxPrice(maxPriceFromAPI);
      console.log("Hotel prices fetched:", hotelPrices);

      console.log("Fetching hotel details...");
      const hotelDetailsPromises = hotelPrices.map(hotel => retrieveStaticHotelDetailByHotelID(hotel.id));
      const hotelDetailsResponses = await Promise.allSettled(hotelDetailsPromises);
      const hotelDetails = hotelDetailsResponses
        .filter(response => response.status === "fulfilled")
        .map(response => response.value.data);

      console.log("Hotel details fetched:", hotelDetails);

      // combine prices and details
      const detailedHotels = hotelPrices.map(hotel => {
        const details = hotelDetails.find(detail => detail.id === hotel.id);
        if (!details) {
          console.warn(`Details not found for hotel ID: ${hotel.id}`);
          return { ...hotel, name: hotel.name || "Unknown Hotel", rating: hotel.rating || 0, price: hotel.price || "N/A" };
        }
        return { ...hotel, ...details, description: truncateText(details.description, 380) };
      });

      console.log("Detailed hotels combined:", detailedHotels);
      setHotels(sortHotels(detailedHotels, sortCriteria));;
    } catch (error) {
      console.error("Failed to fetch hotels", error);
    }
  };

  useEffect(() => {
    if (countryUID && checkin && checkout && parent !== undefined && children !== undefined) {
        fetchHotels(currentPage); // Fetch hotels when the current page loads
    }
}, [currentPage, sortCriteria, countryUID, checkin, checkout, parent, children]);

  // Sorting function
  const sortHotels = (hotels, criteria) => {
    return hotels.sort((a, b) => {
      if (criteria === "guest-rating") {
        const ratingA = a.trustyou && a.trustyou.score ? a.trustyou.score.overall : 0;
        const ratingB = b.trustyou && b.trustyou.score ? b.trustyou.score.overall : 0;
        return ratingB - ratingA;
      } else if (criteria === "price") {
        return a.lowest_price - b.lowest_price;
      }
      return 0;
    });
  };

  //------HANDLERS------
  const handleClick = (hotel_id) => {
    return () =>navigate(`/ViewHotelDetails/${hotel_id}`);
  };

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  //-----PAGINATION-----
  const handlePaginationClick = (value) => {
    if (value === 'prev') {
      setCurrentPage(currentPage => Math.max(1, currentPage - 1));
    } else if (value === 'next') {
      setCurrentPage(currentPage => Math.min(totalPages, currentPage + 1));
    } else {
      setCurrentPage(value);
    }
  };

  const totalPages = Math.ceil(totalHotels / hotelsPerPage);
  
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
    <div>
    <Navbar />
    <div className="container">
      <header>
        <nav>
          <span className="link-text">Hotels</span> / 
          <span className="link-text">Thailand</span> / 
          <span className="link-text">Bangkok</span> / 
          <span className="link-text">2 Person</span> / 
          <span className="link-text">1 Room</span> / 
          <span className="link-text">24 Jul - 28 Jul</span>
        </nav>
      </header>

      <div className="main-content">
        <aside className="filter-section">
          <h2>Filter By</h2>
          <div className="filter-group">
            <label htmlFor="hotel-name">Hotel Name</label>
            <input type="text" id="hotel-name" name="hotel-name" />
            <button className="search-button">Search</button>
          </div>
          <div className="filter-group">
            <label>Star Rating</label>
            <div className="star-rating">
              <label>
                <input type="checkbox" />
                <span className="stars"> ★★★★★</span> 5 Star
              </label>
              <label>
                <input type="checkbox" />
                <span className="stars"> ★★★★☆</span> 4 Star
              </label>
              <label>
                <input type="checkbox" />
                <span className="stars"> ★★★☆☆</span> 3 Star
              </label>
              <label>
                <input type="checkbox" />
                <span className="stars"> ★★☆☆☆</span> 2 Star
              </label>
              <label>
                <input type="checkbox" />
                <span className="stars"> ★☆☆☆☆</span> 1 Star
              </label>
            </div>
          </div>
          <div className="filter-group">
            <label htmlFor="price-range">Price Range</label>
            <input 
              type="range" 
              id="price-range" 
              name="price-range" 
              min="0" 
              max={maxPrice} // TODO: change to the max price from the API
              value={priceRange} 
              onChange={handlePriceChange} 
            />
            <span id="price-range-value">$0 - ${priceRange}</span>
          </div>
        </aside>

        <main className="hotel-listing">
          <div className="sort-options">
            <div className="left-sort-options">
              <label htmlFor="sort-by">Sort by:</label>
              <select id="sort-by" onChange={handleSortChange} value={sortCriteria}>
                <option value="guest-rating">Guest rating</option>
                <option value="price">Price</option>
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

          <div className="hotel-cards">
            {hotels.map((hotel) => {
              const imageUrl = hotel.image_details ? `${hotel.image_details.prefix}${hotel.default_image_index}${hotel.image_details.suffix}` : logo;
              return (
                <div key={hotel.id} className="hotel-card">
                  <img src={imageUrl} alt={hotel.name} className="hotel-image"/>
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
                        <span>${hotel.lowest_price}</span>
                        <button className="more-info" onClick={handleClick(hotel.id)}>See more details</button>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
        </main>
      </div>

      <div className="pagination">
        <button onClick={() => handlePaginationClick('prev')} disabled={currentPage === 1}>Prev</button>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => handlePaginationClick(number)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
        <button onClick={() => handlePaginationClick('next')} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
    <Footer />
  </div>
  );
}

export default HotelListings;
