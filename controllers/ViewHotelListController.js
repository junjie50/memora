import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewHotelListController = ({ hotelId }) => {
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`/api/hotels/${hotelId}`);
        setHotelData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [hotelId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{hotelData.data.name}</h1>
      <p>{hotelData.data.address}</p>
      <p>Rating: {hotelData.data.rating}</p>
      <p>Latitude: {hotelData.data.latitude}</p>
      <p>Longitude: {hotelData.data.longitude}</p>
      <p>Image Count: {hotelData.data.imageCount}</p>
      {/* Render more data as needed */}
    </div>
  );
};

export default ViewHotelListController;
