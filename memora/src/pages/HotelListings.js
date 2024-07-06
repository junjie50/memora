import Navbar from '../components/Navbar.js';
import Footer from '../components/footer.js';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import './HotelListings.css';

function HotelListings() {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState(52);

  // Example hotel data array
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Avani+ Riverside Bangkok Hotel",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu facilisis lectus. Sed dapibus lorem turpis, a bibendum sem pharetra ac.",
      price: 52,
      imageUrl: "hotel-image.jpg"
    },
    {
      id: 2,
      name: "The Siam Hotel",
      description: "Vestibulum vitae quam vel nulla semper fermentum non ac nulla.",
      price: 75,
      imageUrl: "hotel-image-2.jpg"
    },
    {
      id: 3,
      name: "Mandarin Oriental Bangkok",
      description: "Aenean laoreet, libero non eleifend viverra, elit nisl faucibus purus, eget viverra nulla sem vitae neque.",
      price: 90,
      imageUrl: "hotel-image-3.jpg"
    }
  ]);
  const handleClick = () => {
    navigate("hotelListings")
  };
  
  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handlePaginationClick = (pageNumber) => {
    navigate("TEST")
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
                <option value="guest-rating">Guest rating</option>
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
            {hotels.map((hotel) => (
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
            {/* Repeat this block for each hotel */}
            {/* <div className="hotel-card">
              <img src="hotel-image.jpg" alt="Hotel" className="hotel-image"/>
              <div className="hotel-info">
                <div className="hotel-main-info">
                  <h3>Avani+ Riverside Bangkok Hotel</h3>
                  <p>Bangkok · <a href="http://localhost:3000/test">Show on map</a></p> 
                  <div className="horizontal-divider"></div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu facilisis lectus. Sed dapibus lorem turpis, a bibendum sem pharetra ac. ... </p>
                </div>
                <div className="vertical-divider"></div>
                <div className="hotel-rating-price">
                  <div className="hotel-rating">
                    <span>★★★★★</span>
                  </div>
                  <div className="hotel-price">
                    <p>Price per room per night from</p>
                    <span>$52</span>
                    <button className="more-info" onClick={handleClick}>See more details</button>
                  </div>
                </div>
              </div>
            </div> */}
            {/* End of hotel card block */}

            {/* <div className="hotel-card">
              <img src="hotel-image.jpg" alt="Hotel" className="hotel-image"/>
              <div className="hotel-info">
                <div className="hotel-main-info">
                  <h3>Avani+ Riverside Bangkok Hotel</h3>
                  <p>Bangkok · <a href="http://localhost:3000/test">Show on map</a></p> 
                  <div className="horizontal-divider"></div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu facilisis lectus. Sed dapibus lorem turpis, a bibendum sem pharetra ac. ... </p>
                </div>
                <div className="vertical-divider"></div>
                <div className="hotel-rating-price">
                  <div className="hotel-rating">
                    <span>★★★★★</span>
                  </div>
                  <div className="hotel-price">
                    <p>Price per room per night from</p>
                    <span>$52</span>
                    <button className="more-info" onClick={handleClick}>See more details</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="hotel-card">
              <img src="hotel-image.jpg" alt="Hotel" className="hotel-image"/>
              <div className="hotel-info">
                <div className="hotel-main-info">
                  <h3>Avani+ Riverside Bangkok Hotel</h3>
                  <p>Bangkok · <a href="http://localhost:3000/test">Show on map</a></p> 
                  <div className="horizontal-divider"></div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu facilisis lectus. Sed dapibus lorem turpis, a bibendum sem pharetra ac. ... </p>
                </div>
                <div className="vertical-divider"></div>
                <div className="hotel-rating-price">
                  <div className="hotel-rating">
                    <span>★★★★★</span>
                  </div>
                  <div className="hotel-price">
                    <p>Price per room per night from</p>
                    <span>$52</span>
                    <button className="more-info" onClick={handleClick}>See more details</button>
                  </div>
                </div>
              </div>
            </div> */}
            

            {/* <div className="hotel-card">
              <img src="hotel-image.jpg" alt="Hotel" className="hotel-image"/>
              <div className="hotel-info">
                <div className="hotel-main-info">
                  <h3>Avani+ Riverside Bangkok Hotel</h3>
                  <p>Bangkok · <a href="http://localhost:3000/test">Show on map</a></p> 
                  <div className="horizontal-divider"></div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu facilisis lectus. Sed dapibus lorem turpis, a bibendum sem pharetra ac. ... </p>
                </div>
                <div className="vertical-divider"></div>
                <div className="hotel-rating-price">
                  <div className="hotel-rating">
                    <span>★★★★★</span>
                  </div>
                  <div className="hotel-price">
                    <p>Price per room per night from</p>
                    <span>$52</span>
                    <button className="more-info" onClick={handleClick}>See more details</button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </main>
      </div> {/* Closed this div */}

      <div className="pagination">
        <button onClick={() => handlePaginationClick('prev')}>&laquo;</button>
        <button onClick={() => handlePaginationClick(1)}>1</button>
        <button onClick={() => handlePaginationClick(2)}>2</button>
        <button onClick={() => handlePaginationClick(3)}>3</button>
        <button onClick={() => handlePaginationClick(4)}>4</button>
        <button onClick={() => handlePaginationClick(5)}>5</button>
        <button onClick={() => handlePaginationClick(6)}>6</button>
        <button onClick={() => handlePaginationClick('next')}>&raquo;</button>
      </div>
    <Footer />
  </div>
  );
}

export default HotelListings;
