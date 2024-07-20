import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/footer.js';
import './ViewHotelDetails.css';
import { useParams } from 'react-router-dom';
import { fetchStaticHotelData } from '../services/ascenda-api.js';


const RoomCard = ({ room }) => (
  <div className="room-card">
    <img src={room.images[0].url} alt={room.name} className="room-image" />
    <div className="room-details">
      <h3 className="room-name">{room.name}</h3>
      <div className="room-description" dangerouslySetInnerHTML={{ __html: room.description }} />
      <p className="room-info">{room.additionalInfo}</p>
      <p className="room-wifi">Free WiFi</p>
      <div className="room-price-details">
        <p className="room-price">SGD {room.price.toFixed(2)}</p>
        <p className="room-stay-info">1 night, 1 adult</p>
      </div>
      <button className="select-button">Select</button>
    </div>
  </div>
);

const RoomList = ({ rooms }) => (
  <div className="room-list">
    {rooms.map(room => <RoomCard key={room.id} room={room} />)}
  </div>
);

const ViewHotelDetails = () => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { hotelId } = useParams();

  useEffect(() => {
    const loadHotelData = async () => {
      try {
        setLoading(true);
        const data = await fetchStaticHotelData(hotelId);
        if(data) {
          setHotel(data);
          setError(null);
        }
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
          <div className="category-card">
          {Object.entries(hotel.categories).map(([key, category]) => (
            <div key={key} className="category-card">
              <h3>{category.name}</h3>
              <p>Score: {category.score}</p>
              <p>Popularity: {category.popularity.toFixed(2)}</p>
            </div>
          ))}
          </div>
        </section>

        <RoomList rooms={hotel.rooms} />
  
        <Footer />
      </div>
    );
  };
  
  export default ViewHotelDetails;