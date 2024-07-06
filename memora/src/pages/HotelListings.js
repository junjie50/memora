import Navbar from '../components/Navbar.js';
import Footer from '../components/footer.js';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import logo from "../assets/memora.png"
import './HotelListings.css';

function HotelListings() {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState(52);

  // Example hotel data array
  const [hotels] = useState([
    {
      id: 1,
      name: "Romantic Hotel",
      description: "The Forest by Wangz is in the heart of Singapore, walking distance from Tan Tock Seng Hospital and United Square Mall.  This 4-star aparthotel is close to National Orchid Garden and Chinatown Heritage Center.",
      price: 52,
      imageUrl: "https://kaligo-web-expedia.imgix.net"
    },
    {
      id: 2,
      name: "New Majestic Hotel",
      description: "A stay at New Majestic Hotel places you in the heart of Singapore, walking distance from NUS BaBa House and Baba House.  This 4-star hotel is close to Chinatown Heritage Center and <b>Universal Studios Singapore</b>®.",
      price: 75,
      imageUrl: "hotel-image.png"
    },
    {
      id: 3,
      name: "Mandarin Oriental Bangkok",
      description: "Aenean laoreet, libero non eleifend viverra, elit nisl faucibus purus, eget viverra nulla sem vitae neque.",
      price: 90,
      imageUrl: "hotel-image-1.png"
    },
    {
      id: 4,
      name: "Romantic Hotel",
      description: "The Forest by Wangz is in the heart of Singapore, walking distance from Tan Tock Seng Hospital and United Square Mall.  This 4-star aparthotel is close to National Orchid Garden and Chinatown Heritage Center.",
      price: 52,
      imageUrl: "hotel-image-2.jpg"
    },
    {
      id: 5,
      name: "New Majestic Hotel",
      description: "A stay at New Majestic Hotel places you in the heart of Singapore, walking distance from NUS BaBa House and Baba House.  This 4-star hotel is close to Chinatown Heritage Center and <b>Universal Studios Singapore</b>®.",
      price: 75,
      imageUrl: "hotel-image-3.jpg"
    },
    {
      id: 6,
      name: "Mandarin Oriental Bangkok",
      description: "Aenean laoreet, libero non eleifend viverra, elit nisl faucibus purus, eget viverra nulla sem vitae neque.",
      price: 90,
      imageUrl: "hotel-image.jpg"
    },
  ]);
  const handleClick = () => {
    navigate("/ViewHotelDetails")
  };
  
  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
  };

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 5;

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  const handlePaginationClick = (value) => {
    if (value === 'prev') {
      setCurrentPage(currentPage => Math.max(1, currentPage - 1));
    } else if (value === 'next') {
      setCurrentPage(currentPage => Math.min(totalPages, currentPage + 1));
    } else {
      setCurrentPage(value);
    }
  };
  
  return (
    <div className="container">
      <Navbar />
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

      <div className="main-content"> {/* Added this div */}
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
                <span className="stars">★★★★★</span> 5 Star
              </label>
              <label>
                <input type="checkbox" />
                <span className="stars">★★★★☆</span> 4 Star
              </label>
              <label>
                <input type="checkbox" />
                <span className="stars">★★★☆☆</span> 3 Star
              </label>
              <label>
                <input type="checkbox" />
                <span className="stars">★★☆☆☆</span> 2 Star
              </label>
              <label>
                <input type="checkbox" />
                <span className="stars">★☆☆☆☆</span> 1 Star
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
              max="1000" // TODO: change to the max price from the API
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
              <select id="sort-by">
                <option value="star-rating">Star rating</option>
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
            {currentHotels.map((hotel) => (
              <div key={hotel.id} className="hotel-card">
                <img src={hotel.imageUrl} alt="Hotel" className="hotel-image"/>
                <div className="hotel-info">
                  <div className="hotel-main-info">
                    <h3>{hotel.name}</h3>
                    <p>Bangkok · <a href="#">Show on map</a></p>
                    <div className="horizontal-divider"></div>
                    <p>{hotel.description}</p>
                  </div>
                  <div className="vertical-divider"></div>
                  <div className="hotel-rating-price">
                    <div className="hotel-rating">
                      <span>★★★★★</span>
                    </div>
                    <div className="hotel-price">
                      <p>Price per room per night from</p>
                      <span>${hotel.price}</span>
                      <button className="more-info" onClick={handleClick}>See more details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div> {/* Closed this div */}

      <div className="pagination">
        <button onClick={() => handlePaginationClick('prev')} disabled={currentPage === 1}>&laquo;</button>
        {[...Array(totalPages)].map((_, index) => (
          <button 
            key={index + 1} 
            onClick={() => handlePaginationClick(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePaginationClick('next')} disabled={currentPage === totalPages}>&raquo;</button>
      </div>
    <Footer />
  </div>
  );
}

export default HotelListings;
