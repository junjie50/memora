import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/footer.js';
import './ViewHotelDetails.css';

const fetchHotelData = async (id) => {
  try {
    const response = await fetch(`/api/hotels/${id}`);
    console.log('Response:', response)
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error('Unexpected response:', text);
      console.error('Response status:', response.status);
      console.error('Response headers:', Object.fromEntries(response.headers.entries()));
      throw new Error(`Expected JSON, but received ${contentType || 'unknown'} content-type. Status: ${response.status}`);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotel data:', error);
    throw error;
  }
};

const ViewHotelDetails = ({ hotelId = 'diH7' }) => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHotelData = async () => {
      try {
        setLoading(true);
        const data = await fetchHotelData(hotelId);
        setHotel(data);
        setError(null);
      } catch (err) {
        console.error('Error in loadHotelData:', err);
        setError(`Failed to load hotel data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadHotelData();
  }, [hotelId]);

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div>
      <h2>Error loading hotel data</h2>
      <p>{error}</p>
      <p>Please check the console for more details.</p>
    </div>
  );
  if (!hotel) return <div>No hotel data available.</div>;
    
    return (
      <div className="hotel-details">
        <header>
          <Navbar />
        </header>
  
        <div className="breadcrumb">
          <span>Hotels</span> / <span>{hotel.original_metadata.country}</span> / <span>{hotel.original_metadata.city}</span> / <span>2 Person 1 Room</span> / <span>24 Jul - 25 Jul</span>
        </div>
  
        <div className="hotel-card">
          <img 
            src={`${hotel.image_details.prefix}${hotel.default_image_index}${hotel.image_details.suffix}`} 
            alt={hotel.name} 
            className="hotel-image" 
          />
          <div className="hotel-info">
            <h1>{hotel.name}</h1>
            <p>{hotel.address}</p>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(hotel.rating) ? "star filled" : "star"}>★</span>
              ))}
              <span>{hotel.rating} / 5</span>
            </div>
            <p className="trustyou-score">TrustYou Score: {hotel.trustyou.score.overall}</p>
            <button className="see-rooms-btn">See Rooms</button>
          </div>
        </div>
  
        <div className="content-wrapper">
          <div className="main-content">
            <section className="hotel-overview">
              <h2>Hotel overview</h2>
              <div dangerouslySetInnerHTML={{ __html: hotel.description }} />
            </section>
  
            <section className="review">
              <h2>Review</h2>
              {hotel.amenities_ratings.map((rating, index) => (
                <div key={index} className="rating-bar">
                  <span className="category">{rating.name}</span>
                  <div className="bar-container">
                    <div className="bar" style={{ width: `${rating.score}%` }}></div>
                  </div>
                  <span className="score">{rating.score}</span>
                </div>
              ))}
              <button className="see-more-btn">See more</button>
            </section>
          </div>
  
          <aside className="sidebar">
            <h2>Amenities</h2>
            <ul className="amenities-list">
              {Object.entries(hotel.amenities)
                .filter(([_, value]) => value === true)
                .map(([key]) => {
                    if (key === 'tVInRoom') {
                      return <li key={key}>TV In Room</li>;
                    }
                    return (
                      <li key={key}>
                        {key
                          .replace(/([A-Z])/g, ' $1') // add a space before each uppercase letter
                          .replace(/([a-z])([A-Z])/g, '$1 $2') // handle cases where a lowercase letter is followed by an uppercase letter
                          .replace(/\b\w/g, (char) => char.toUpperCase()) // capitalize the first letter of each word
                          .trim()}
                      </li>
                    );
                    }
                )
              }
            </ul>
          </aside>
        </div>
  
        <section className="hotel-categories">
          <h2>Hotel Categories</h2>
          {Object.entries(hotel.categories).map(([key, category]) => (
            <div key={key} className="category-card">
              <h3>{category.name}</h3>
              <p>Score: {category.score}</p>
              <p>Popularity: {category.popularity.toFixed(2)}</p>
            </div>
          ))}
        </section>
  
        <Footer />
      </div>
    );
  };
  
  export default ViewHotelDetails;