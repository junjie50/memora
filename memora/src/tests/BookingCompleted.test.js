import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingCompleted from '../pages/BookingCompleted';

const mockBookingDetails = {
  bookingId: '9172381249',
  totalPrice: 800.00,
  checkin: '2024-08-01',
  checkout: '2024-08-05',
  hotelName: 'Hotel California'
};

const mockNavigate = jest.fn();

// jest.mock('../services/RegistrationForm.js', () => ({
//   submitMemberDetails: jest.fn(),
//   validateMemberDetails: jest.fn(),
//   validationFailed: jest.fn(),
//   displaySuccessfulMessage: jest.fn(),
//   displayUnsuccessfulMessage: jest.fn()
// }));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  mockNavigate.mockReset();
  sessionStorage.clear();
  jest.clearAllMocks(); // Clear all mock calls
});

describe('BookingCompleted', () => {
  test('renders booking details', () => {
    render(
      <Router>
        <BookingCompleted bookingDetails={mockBookingDetails} />
      </Router>
    );

    // expect(screen.getByText(`Booking ID: ${mockBookingDetails.bookingId}`)).toBeInTheDocument();
    // expect(screen.getByText(`Total Price: ${mockBookingDetails.totalPrice}`)).toBeInTheDocument();
    // expect(screen.getByText(`Check-in Date: ${mockBookingDetails.checkin}`)).toBeInTheDocument();
    // expect(screen.getByText(`Check-out Date: ${mockBookingDetails.checkout}`)).toBeInTheDocument();
    // expect(screen.getByText(`Hotel Name: ${mockBookingDetails.hotelName}`)).toBeInTheDocument();
    // expect(screen.getByText(/Booking Confirmed/i)).toBeInTheDocument();

    expect(screen.getByText('Booking Summary')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Check in:')).toBeInTheDocument();
    expect(screen.getByText('Check out:')).toBeInTheDocument();
    // expect(screen.getByText('Room(s)')).toBeInTheDocument();
    // expect(screen.getByText('Adults,')).toBeInTheDocument();
    // expect(screen.getByText('Children')).toBeInTheDocument();

  });
});
