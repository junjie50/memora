import React from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/footer.js';
import './ViewHotelDetails.css';



const hotelData = {
    name: "Avani+ Riverside Bangkok Hotel",
    address: "257 Charoennakorn Road, Thonburi",
    image: "url_to_hotel_image.jpg",
    description: "Pamper yourself with a visit to the spa, which offers massages, body treatments, and facials. You're sure to appreciate the recreational amenities, including an outdoor pool and a 24-hour fitness center. This hotel also features complimentary wireless Internet access, concierge services, and shopping on site...",
    facilities: ["In House Bar", "Fitness Center", "Business Centre", "Dry Cleaning", "Valet Parking", "Outdoor Pool", "Safe", "Continental Breakfast", "Airport Transportation"],
    ratings: [
      { category: "Food", score: 95 },
      { category: "Wifi", score: 90 },
      { category: "Service", score: 85 },
      { category: "Amenities", score: 80 },
      { category: "Location", score: 75 },
      { category: "Comfort", score: 70 },
      { category: "Breakfast", score: 65 },
      { category: "Room", score: 60 },
    ],
    rooms: [
      { name: "Avani River View Room 1 King Bed", price: 168 },
      { name: "Avani River View Room 2 Twin Beds", price: 168 },
      { name: "Avani Panorama River View Room 1 King Bed", price: 199 },
    ]
  };

  const ViewHotelDetails = ({ hotel=hotelData }) => {
    return (
      <div className="hotel-details">
        <header>
          <Navbar />
        </header>
  
        <div className="breadcrumb">
          <span>Hotels</span> / <span>Thailand</span> / <span>Bangkok</span> / <span>2 Person 1 Room</span> / <span>24 Jul - 25 Jul</span>
        </div>
  
        <div className="hotel-card">
          <img src={hotel.image} alt={hotel.name} className="hotel-image" />
          <div className="hotel-info">
            <h1>{hotel.name}</h1>
            <p>{hotel.address}</p>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(hotel.rating) ? "star filled" : "star"}>★</span>
              ))}
              <span>{hotel.rating} / 5</span>
            </div>
            <p className="price">Select rooms starting from: <strong>SGD {hotel.price}</strong></p>
            <button className="see-rooms-btn">See Rooms</button>
          </div>
        </div>
  
        <div className="content-wrapper">
          <div className="main-content">
            <section className="hotel-overview">
              <h2>Hotel overview</h2>
              <p>{hotel.description}</p>
            </section>
          </div>
          <aside className="sidebar">
            <h2>Facilities</h2>
            <ul className="facilities-list">
              {hotel.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="review">
              <h2>Review</h2>
              {hotel.ratings.map((rating, index) => (
                <div key={index} className="rating-bar">
                  <span className="category">{rating.category}</span>
                  <div className="bar-container">
                    <div className="bar" style={{ width: `${rating.score}%` }}></div>
                  </div>
                  <span className="score">{rating.score}</span>
                </div>
              ))}
              <button className="see-more-btn">See more</button>
        </section>
  
        <section className="room-options">
          <h2>Room Options</h2>
          {hotel.rooms.map((room, index) => (
            <div key={index} className="room-card">
              <img src={room.image} alt={room.name} className="room-image" />
              <div className="room-info">
                <h3>{room.name}</h3>
                <p className="room-price">SGD {room.price}</p>
                <p className="room-details">1 room • 1 night</p>
                <button className="select-btn">Select</button>
              </div>
            </div>
          ))}
        </section>

        <div>
            <Footer />
        </div>
      </div>
    );
  };
  
  export default ViewHotelDetails;