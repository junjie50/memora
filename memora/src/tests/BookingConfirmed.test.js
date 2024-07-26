import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingConfirmed from '../pages/BookingConfirmed';
import { submitBookingDetails,useCheckAuthentication } from '../services/BookingForm';
import axios from 'axios';

jest.mock('axios');
jest.mock('../services/BookingForm');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: {
      bookingDetails: mockBookingDetails,
    }
  }),
}));

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

const result = {
  "destinationID": "WD0M",
  "memberID": "669ab136a6a0abbee6fe886c",
  "specialRequest": "No",
  "numberOfAdults": 2,
  "numberOfChildren": 1,
  "numberOfNights": 3,
  "bookingStatus": "Confirmed",
  "startDate": "2024-07-30",
  "endDate": "2024-08-31",
  "id": "66a26d7168910c47a815009c"
};

const mockUser = {
  id: 'user123',
  title: 'Mr',
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Street',
  phoneNumber: '12345678',
  email: 'john.doe@example.com'
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


beforeEach(() => {
  jest.clearAllMocks();
  localStorage.setItem('token', 'mocked-token');
  sessionStorage.setItem('bookingForm', JSON.stringify(mockBookingDetails));
  sessionStorage.setItem('bookingPageLoggedInForm', JSON.stringify({
    creditCardNumber: '1234567890123456',
    validUntill: '2025-12-25',
    cvcNo: '123',
    specialRequestText: 'No special requests'
  }));
});

describe('BookingConfirmed', () => {
  it('renders booking details', () => {
    useCheckAuthentication.mockReturnValue({ authenticated: true, user: mockUser});
    // sessionStorage.setItem('bookingForm', JSON.stringify(mockBookingDetails));

    render(
      <Router>
        <BookingConfirmed bookingDetails={mockBookingDetails} />
      </Router>
    );

    expect(screen.getByText('Booking Summary')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Check in:')).toBeInTheDocument();
    expect(screen.getByText('Check out:')).toBeInTheDocument();

    // const firstNameElement = screen.getByText(mockUser.firstName);
    // const lastNameElement = screen.getByText(mockUser.lastName);
    
    // expect(firstNameElement).toBeInTheDocument();
    // expect(lastNameElement).toBeInTheDocument();
    
    // // Verify that the full name appears somewhere in the document
    // const fullName = `${mockUser.firstName} ${mockUser.lastName}`;
    // const elementsWithName = screen.getAllByText((content, element) => {
    //   return element.textContent.includes(fullName);
    // });
    
    // // expect(screen.getByText(/Booking Summary/i).toBeInTheDocument());
    // expect(screen.getByText(`Total Price: ${mockBookingDetails.totalPrice}`)).toBeInTheDocument();
    // expect(screen.getByText(`Check-in Date: ${mockBookingDetails.checkin}`)).toBeInTheDocument();
    // expect(screen.getByText(`Check-out Date: ${mockBookingDetails.checkout}`)).toBeInTheDocument();
    // expect(screen.getByText(`Hotel Name: ${mockBookingDetails.hotelName}`)).toBeInTheDocument();
    // // expect(screen.getByText(/Booking Confirmed/i)).toBeInTheDocument();
  });


  it('sends booking data to the database, navigate to bookingCompleted page', async () => {
    useCheckAuthentication.mockReturnValue({ authenticated: true, user: mockUser });
    submitBookingDetails.mockImplementation((data, token, userId, navigateFunc) => {
      console.log('submitBookingDetails called with:', { data, token, userId });
      navigateFunc("/bookingCompleted", { state: { formData: data } });
      return Promise.resolve({ status: 201 });
    });

    render(
        <Router>
            <BookingConfirmed />
        </Router>
    );

    const confirmButton = screen.getByRole('button', { name: /Confirm Booking/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(submitBookingDetails).toHaveBeenCalledWith(
        expect.objectContaining({
          destinationID: mockBookingDetails.countryUID,
          totalPayment: mockBookingDetails.totalPrice.toFixed(2),
          numberOfAdults: mockBookingDetails.parent,
          numberOfChildren: mockBookingDetails.children,
          numberOfNights: mockBookingDetails.hotelDuration,
          startDate: mockBookingDetails.checkin,
          endDate: mockBookingDetails.checkout,
        }),
        'mocked-token',
        mockUser.id,
        expect.any(Function)
      );
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/bookingCompleted", expect.any(Object));
    }, { timeout: 3000 }); // Increase timeout if necessary

    console.log('mockNavigate calls:', mockNavigate.mock.calls);

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
      expect(window.alert).toHaveBeenCalledWith('User not authenticated. Please log in.');
    });
  });


  //end to end test, send booking
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

  //   // Mock submitBookingDetails
  //   submitBookingDetails.mockImplementation((data, token, userId, navigateFunc) => {
  //     navigateFunc("/bookingCompleted", { state: { formData: data } });
  //     return Promise.resolve({ status: 201 });
  //   });

  //   // Mock sessionStorage
  //   const mockSessionStorage = {
  //     getItem: jest.fn(),
  //     setItem: jest.fn(),
  //     clear: jest.fn()
  //   };
  //   Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });

  //    // Set up mock data
  //   const mockBookingForm = {
  //     roomBooking: [{ /* room booking details */ }],
  //     totalPrice: 100,
  //     countryUID: 'mockUID',
  //     checkin: '2024-08-01',
  //     checkout: '2024-08-05',
  //     hotelName: 'Hotel California',
  //     parent: 2,
  //     children: 1,
  //     rooms: 1,
  //     hotelDuration: 4,
  //   };

  //   mockSessionStorage.getItem.mockImplementation((key) => {
  //     if (key === 'bookingForm') {
  //       return JSON.stringify(mockBookingForm);
  //     }
  //     if (key === 'bookingPageLoggedInForm') {
  //       return JSON.stringify({
  //         creditCardNumber: '1234567890123456',
  //         validUntill: '12/25',
  //         cvcNo: '123',
  //         specialRequestText: 'No special requests'
  //       });
  //     }
  //     return null;
  //   });

  //   render(
  //     <Router>
  //       <BookingConfirmed />
  //     </Router>
  //   );

  //   const confirmButton = screen.getByRole('button', { name: /Confirm Booking/i });
  //   fireEvent.click(confirmButton);

  //   await waitFor(() => {
  //     expect(mockNavigate).toHaveBeenCalledWith('/bookingCompleted', {
  //       state: {
  //         formData: expect.objectContaining({
  //           destinationID: mockBookingForm.countryUID,
  //           totalPayment: mockBookingForm.totalPrice.toFixed(2),
  //           // Add other expected fields here
  //         }),
  //       },
  //     });
  //   }, { timeout: 3000 });

  //   console.log('mockNavigate calls:', mockNavigate.mock.calls);

  // });  

});
