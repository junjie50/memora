import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingConfirmed from '../pages/BookingConfirmed';
import { submitBookingDetails,useCheckAuthentication } from '../services/BookingForm';

const mockNavigate = jest.fn();
const mockBookingDetails = {
  totalPrice: 800.00,
  checkin: '2024-08-01',
  checkout: '2024-08-05',
  hotelName: 'Hotel California',
  parent: 2,
  children: 1,
  rooms: 1,
  hotelDuration: 4,
  countryUID: 'jc3Y',
  roomBooking: [],
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

jest.mock('../services/BookingForm', () => ({
  submitBookingDetails: jest.fn(),
  useCheckAuthentication: jest.fn(),
  getCookie: jest.fn().mockReturnValue('mock-token'),
}));

beforeEach(() => {
  mockNavigate.mockReset();
  sessionStorage.clear();
  jest.clearAllMocks(); // Clear all mock calls
});

describe('BookingConfirmed', () => {
  it('renders booking details', () => {
    useCheckAuthentication.mockReturnValue({ authenticated: true, user: { id: 'user123', title: 'Mr', firstName: 'John', lastName: 'Doe', address: '123 Street', phoneNumber: '12345678', email: 'john.doe@example.com' } });
    sessionStorage.setItem('bookingForm', JSON.stringify(mockBookingDetails));

    render(
      <Router>
        <BookingConfirmed bookingDetails={mockBookingDetails} />
      </Router>
    );

    expect(screen.getByText('Booking Summary')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Check in:')).toBeInTheDocument();
    expect(screen.getByText('Check out:')).toBeInTheDocument();
    
    // expect(screen.getByText(/Booking Summary/i).toBeInTheDocument());
    // expect(screen.getByText(`Total Price: ${mockBookingDetails.totalPrice}`)).toBeInTheDocument();
    // expect(screen.getByText(`Check-in Date: ${mockBookingDetails.checkin}`)).toBeInTheDocument();
    // expect(screen.getByText(`Check-out Date: ${mockBookingDetails.checkout}`)).toBeInTheDocument();
    // expect(screen.getByText(`Hotel Name: ${mockBookingDetails.hotelName}`)).toBeInTheDocument();
    // expect(screen.getByText(/Booking Confirmed/i)).toBeInTheDocument();
  });


  // it('Navigates to bookingCompletedPage', async ()=>{
  //   // useCheckAuthentication.mockReturnValue({ authenticated: true, user: { id: 'user123', title: 'Mr', firstName: 'John', lastName: 'Doe', address: '123 Street', phoneNumber: '12345678', email: 'john.doe@example.com' } });
  //   useCheckAuthentication.mockReturnValue({ authenticated: true, user: { id: 'user123' } });
  //   // sessionStorage.setItem('bookingForm', JSON.stringify(mockBookingDetails));
  //   submitBookingDetails.mockResolvedValueOnce({ status: 201 });

  //   render(
  //     <Router>
  //       <BookingConfirmed />
  //     </Router>
  //   );

  //   const confirmButton = screen.getByRole('button', { name: /Confirm Booking/i });
  //   fireEvent.click(confirmButton);

  //   await waitFor(() => {
  //     expect(submitBookingDetails).toHaveBeenCalledWith(
  //       expect.any(Object),
  //       'mock-token',
  //       'user123',
  //       expect.any(Function)
  //     );
  //     expect(mockNavigate).toHaveBeenCalledWith('/bookingCompleted', expect.any(Object));
  //   });
  // });



  // it('shows error alert on submission failure', async () => {
  //   // useCheckAuthentication.mockReturnValue({ authenticated: true, user: { id: 'user123', title: 'Mr', firstName: 'John', lastName: 'Doe', address: '123 Street', phoneNumber: '12345678', email: 'john.doe@example.com' } });
  //   useCheckAuthentication.mockReturnValue({ authenticated: true, user: { id: 'user123' } });
  //   // sessionStorage.setItem('bookingForm', JSON.stringify(mockBookingDetails));
  //   submitBookingDetails.mockRejectedValueOnce(new Error('Booking failed'));
  //   // const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  //   jest.spyOn(window, 'alert').mockImplementation(() => {});

  //   render(
  //     <Router>
  //       <BookingConfirmed />
  //     </Router>
  //   );

  //   const confirmButton = screen.getByRole('button', { name: /Confirm Booking/i });
  //   fireEvent.click(confirmButton);

  //   await waitFor(() => {
  //     // expect(submitBookingDetails).toHaveBeenCalled();
  //     expect(window.alert).toHaveBeenCalledWith('An error occurred. Please try again.');
  //   });

  //   // alertSpy.mockRestore();
  // });

  
});
