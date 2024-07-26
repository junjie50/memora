import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingCompleted from '../pages/BookingCompleted';

const mockNavigate = jest.fn();

const mockBookingDetails = {
  destinationID: 'WD0M',
  memberID: '669ab136a6a0abbee6fe886c',
  specialRequest: 'No',
  numberOfAdults: 2,
  numberOfChildren: 1,
  numberOfNights: 3,
  bookingStatus: 'Confirmed',
  startDate: '2024-07-30',
  endDate: '2024-08-30',
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: {
      bookingDetails: mockBookingDetails,
    }
  }),
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
    expect(screen.getByText('Booking Summary')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Check out:')).toBeInTheDocument();
    expect(screen.getByText(/Adults/)).toBeInTheDocument();
    expect(screen.getByText(/Children/)).toBeInTheDocument();
    expect(screen.getByText('Check in:')).toBeInTheDocument();
    expect(screen.getByText('night(s)')).toBeInTheDocument();
  });
});
