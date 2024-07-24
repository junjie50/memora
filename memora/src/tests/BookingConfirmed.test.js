import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingConfirmed from '../pages/BookingConfirmed';

const mockBookingDetails = {
  bookingId: '12345',
  totalPrice: 800.00,
  checkin: '2024-08-01',
  checkout: '2024-08-05',
  hotelName: 'Hotel California'
};

describe('BookingConfirmed', () => {
  test('renders booking details', () => {
    render(
      <Router>
        <BookingConfirmed bookingDetails={mockBookingDetails} />
      </Router>
    );

    expect(screen.getByText(`Booking ID: ${mockBookingDetails.bookingId}`)).toBeInTheDocument();
    expect(screen.getByText(`Total Price: ${mockBookingDetails.totalPrice}`)).toBeInTheDocument();
    expect(screen.getByText(`Check-in Date: ${mockBookingDetails.checkin}`)).toBeInTheDocument();
    expect(screen.getByText(`Check-out Date: ${mockBookingDetails.checkout}`)).toBeInTheDocument();
    expect(screen.getByText(`Hotel Name: ${mockBookingDetails.hotelName}`)).toBeInTheDocument();
    expect(screen.getByText(/Booking Confirmed/i)).toBeInTheDocument();
  });
});
