import React from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/footer.js';
import './ViewHotelDetails.css';

// mock data. replce with API call handler.
const hotelData = {
    "id": "050G",
    "imageCount": 52,
    "latitude": 1.318685,
    "longitude": 103.847882,
    "name": "The Forest by Wangz",
    "address": "145A Moulmein Road",
    "address1": "145A Moulmein Road",
    "rating": 4,
    "distance": 11546.94168557398,
    "trustyou": {
        "id": "dede9a48-2f7c-49ae-9bd0-942a40e245e7",
        "score": {
            "overall": "81.0",
            "kaligo_overall": 4.1,
            "solo": "77.0",
            "couple": "81.0",
            "family": "82.0",
            "business": "72.0"
        }
    },
    "categories": {
        "overall": {
            "name": "Overall",
            "score": 94,
            "popularity": 4
        },
        "romantic_hotel": {
            "name": "Romantic Hotel",
            "score": 72,
            "popularity": 8.615484615384615
        },
        "family_hotel": {
            "name": "Family Hotel",
            "score": 75,
            "popularity": 11.26431404682274
        },
        "business_hotel": {
            "name": "Business Hotel",
            "score": 85,
            "popularity": 23.84625384615385
        }
    },
    "amenities_ratings": [
        {
            "name": "Food",
            "score": 100
        },
        {
            "name": "WiFi",
            "score": 100
        },
        {
            "name": "Service",
            "score": 99
        },
        {
            "name": "Amenities",
            "score": 98
        },
        {
            "name": "Location",
            "score": 97
        },
        {
            "name": "Comfort",
            "score": 92
        },
        {
            "name": "Breakfast",
            "score": 80
        },
        {
            "name": "Room",
            "score": 79
        }
    ],
    "description": "<p><b>Property Location</b> <br />The Forest by Wangz is in the heart of Singapore, walking distance from Tan Tock Seng Hospital and United Square Mall.  This 4-star aparthotel is close to National Orchid Garden and Chinatown Heritage Center.</p><p><b>Rooms</b> <br />Make yourself at home in one of the 38 individually furnished guestrooms, featuring kitchenettes with refrigerators and stovetops. Wired and wireless Internet access is complimentary, while 40-inch LED televisions and DVD players provide entertainment. Conveniences include safes and desks, as well as phones with free local calls.</p><p><b>Amenities</b> <br />Be sure to enjoy recreational amenities including an outdoor pool and a fitness center. Additional amenities include complimentary wireless Internet access, concierge services, and barbecue grills.</p><p><b>Dining</b> <br />A complimentary breakfast is included.</p><p><b>Business, Other Amenities</b> <br />Featured amenities include complimentary newspapers in the lobby, a 24-hour front desk, and luggage storage. Free self parking is available onsite.</p>",
    "amenities": {
        "airConditioning": true,
        "clothingIron": true,
        "continentalBreakfast": true,
        "dataPorts": true,
        "hairDryer": true,
        "kitchen": true,
        "outdoorPool": true,
        "parkingGarage": true,
        "safe": true,
        "tVInRoom": true,
        "voiceMail": true
    },
    "original_metadata": {
        "name": null,
        "city": "Singapore",
        "state": null,
        "country": "SG"
    },
    "image_details": {
        "suffix": ".jpg",
        "count": 52,
        "prefix": "https://d2ey9sqrvkqdfs.cloudfront.net/050G/"
    },
    "hires_image_index": "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51",
    "number_of_images": 54,
    "default_image_index": 1,
    "imgix_url": "https://kaligo-web-expedia.imgix.net",
    "cloudflare_image_url": "https://www.kaligo-staging.xyz/images/new"
};

const ViewHotelDetails = ({ hotel = hotelData }) => {
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