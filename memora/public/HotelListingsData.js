// HotelList.js
import React, { useState, useEffect } from 'react';
import { fetchHotels } from './api';  // Importing our API call

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHotels().then(setHotels).catch(setError);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {hotels.length > 0 ? (
        <ul>
          {hotels.map(hotel => (
            <li key={hotel.id}>{hotel.name}</li>
          ))}
        </ul>
      ) : (
        <p>No hotels found</p>
      )}
    </div>
  );
};

export default HotelList;