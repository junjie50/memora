import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingConfirmed from '../pages/BookingConfirmed';
import { submitBookingDetails,useCheckAuthentication } from '../services/BookingForm';
import axios from 'axios';

jest.mock('axios');

axios.post.mockResolvedValueOnce({
  status: 201,
  data: {
    // Add the necessary response data here
    bookingId: 'mock-booking-id',
    // ... other response fields
  },
});

const mockNavigate = jest.fn();

const localStorageMock = (function() {
  let store = {};
  return {
    getItem: jest.fn(key => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    })
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

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

const result = 
{
  "destinationID": "WD0M",
  "memberID": "669ab136a6a0abbee6fe886c",
  "specialRequest": "No",
  "numberOfAdults": 2,
  "numberOfChildren": 1,
  "numberOfNights": 3,
  "bookingStatus": "Confirmed",
  "startDate": "2024-07-30",
  "endDate": "2024-08-30",
  "id": "66a26d7168910c47a815009c"
};


// const mockBookingDetailsbookingForm = {
//   checkin: "2024-07-31",
//   checkout: "2024-08-01",
//   children: 1,
//   countryUID: "jC3Y",
//   guests: "3",
//   hotelAddress: "New Cross Road 323A",
//   hotelDuration: 1,
//   hotelId: "102l",
//   hotelName: "New Cross Inn Hostel",
//   parent: 2,
//   roomBooking: [
//     {
//       key: "er-9BB0668BD38F593B77A146227E9B30B2-1C0A09FEF2C1A49272C682DA17B72222",
//       breakfastInfo: "hotel_detail_breakfast_included",
//       description: "Bed in a Shared 10-bed FEMALE Dormitory",
//       price: 117.75,
//       roomOrder: 1
//     },
//     // additional room bookings if needed
//   ],
//   rooms: 1,
//   selectedCountry: "London, England, United Kingdom"
// };


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
  getCookie: jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UiLCJpZCI6IjY2OWFiMTM2YTZhMGFiYmVlNmZlODg2YyIsImlhdCI6MTcyMTk2NzI3MywiZXhwIjoxNzIyMDUzNjczfQ.S59dKLfb0J_BuUTbVKINFx5HtxMah8mzLXPTJCRK7XYn'),
}));

beforeEach(() => {
  mockNavigate.mockReset();
  sessionStorage.clear();
  jest.clearAllMocks(); // Clear all mock calls
  window.localStorage.clear();
  window.localStorage.setItem('token', 'mocked-token');
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
    
    // // expect(screen.getByText(/Booking Summary/i).toBeInTheDocument());
    // expect(screen.getByText(`Total Price: ${mockBookingDetails.totalPrice}`)).toBeInTheDocument();
    // expect(screen.getByText(`Check-in Date: ${mockBookingDetails.checkin}`)).toBeInTheDocument();
    // expect(screen.getByText(`Check-out Date: ${mockBookingDetails.checkout}`)).toBeInTheDocument();
    // expect(screen.getByText(`Hotel Name: ${mockBookingDetails.hotelName}`)).toBeInTheDocument();
    // // expect(screen.getByText(/Booking Confirmed/i)).toBeInTheDocument();
  });


  //end to end test
  // it('Navigates to bookingCompletedPage', async ()=>{
  //   useCheckAuthentication.mockReturnValue({ 
  //     authenticated: true, 
  //     user: { 
  //       id: 'user123', 
  //       title: 'Mr', 
  //       firstName: 'John', 
  //       lastName: 'Doe', 
  //       address: '123 Street', 
  //       phoneNumber: '12345678', 
  //       email: 'john.doe@example.com' 
  //     },
  //   });
  //   // submitBookingDetails.mockResolvedValueOnce({ status: 201 });

  //   // Mock sessionStorage
  //   const mockSessionStorage = {
  //     getItem: jest.fn(),
  //     setItem: jest.fn(),
  //     clear: jest.fn()
  //   };
  //   Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });

  //   // Set up mock data
  //   const mockBookingForm = JSON.stringify({
  //     // Add necessary booking form data here
  //     roomBooking: [{ /* room booking details */ }],
  //     totalPrice: 100,
  //     // ... other required fields
  //   });
  //   mockSessionStorage.getItem.mockReturnValue(mockBookingForm);

  //   const mockBookingDetails = {
  //     // Add necessary booking details data here
  //     totalPrice: 100,
  //     checkin: '2024-08-01',
  //     checkout: '2024-08-05',
  //     hotelName: 'Hotel California',
  //     // ... other required fields
  //   };
  //   mockSessionStorage.getItem.mockReturnValue(JSON.stringify(mockBookingDetails));

  //   render(
  //     <Router>
  //       <BookingConfirmed />
  //     </Router>
  //   );

  //   const confirmButton = screen.getByRole('button', { name: /Confirm Booking/i });
  //   fireEvent.click(confirmButton);

  //   await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/bookingCompleted', {
  //   state: {
  //     formData: {
  //       // Expected form data to be passed to the next page
  //       destinationID: mockBookingDetails.countryUID,
  //       totalPayment: mockBookingDetails.totalPrice.toFixed(2),
  //       // ... other required fields
  //     },
  //   },
  //   }));

  // });


  //still fixing
  it('sends booking data to the database', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Booking successful' } });

    render(
        <Router>
            <BookingConfirmed />
        </Router>
    );

    // Fill in the form fields with valid data (if applicable)
    // ...

    fireEvent.click(screen.getByText(/Confirm Booking/i));

    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith('/api/bookings', {
            // Expected booking data
        });
    });
  });

  it('shows error alert on submission failure', async () => {
    useCheckAuthentication.mockReturnValue({ authenticated: true, user: { id: 'user123' } });
    submitBookingDetails.mockRejectedValueOnce(new Error('Booking failed'));
    window.localStorage.removeItem('token'); // Clear the token to simulate failure

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <Router>
        <BookingConfirmed />
      </Router>
    );

    const confirmButton = screen.getByRole('button', { name: /Confirm Booking/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      // expect(submitBookingDetails).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('User not authenticated. Please log in.');
    });
  });

  
});
