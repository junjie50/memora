import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingPageLoggedIn from '../pages/BookingPageLoggedIn.js';
import axios from 'axios';

import {fetchUserByToken} from '../services/LoginForm.js';
import {useCheckAuthentication, submitBookingDetails} from '../services/BookingForm.js';

//Set Up Initial
jest.mock('../services/BookingForm.js', () => ({
  useCheckAuthentication: jest.fn(),
  submitBookingDetails: jest.fn(),
}));

jest.mock('../services/LoginForm.js', () => ({
  fetchUserByToken: jest.fn()
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ hotelId: '123' }),
}));

describe('BookingPageLoggedIn', () => {
  const userInformation = {
    "id": "669ab136a6a0abbee6fe886c",
    "username": "mike",
    "title": "Mr",
    "firstName": "hengchang",
    "lastName": "qi",
    "email": "111111@qq.com",
    "phoneNumber": "121212",
    "address": "SUTD Hostel",
  };

  const mockBookingForm = {
    checkin: "2024-07-31",
    checkout: "2024-08-01",
    parent: 2,
    children: 1,
    countryUID: "jc3Y",
    guests: "3",
    hotelAddress: "New Cross Road 323A",
    hotelDuration: 1,
    hotelId: "1821",
    hotelName: "New Cross Inn Hostel",
    rooms: 1,
    selectedCountry: "London, England, United Kingdom"

  };

  beforeEach(() => {
    mockNavigate.mockReset();
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  // it('navigates to login page if no token is found', () => {
  //   const getItemSpy = jest.spyOn(window.localStorage.__proto__, 'getItem');
  //   getItemSpy.mockReturnValue(null);

  //   // jest.spyOn(window.localStorage, 'getItem').mockReturnValue(null);
  //   useCheckAuthentication.mockReturnValue({ authenticated: false });

  //   render(
  //     <Router>
  //       <BookingPageLoggedIn />
  //     </Router>
  //   );

  //   // const confirmButton = screen.getByRole('button', { name: /Confirm Booking/i });
  //   // fireEvent.click(confirmButton);

  //   // expect(mockNavigate).toHaveBeenCalledWith('/login');
  //   expect(mockNavigate).toHaveBeenCalledWith('/login');
  //   getItemSpy.mockRestore();
  // });



  // it('render personal and payment details form of bookingPageLoggedIn', () => {
  //   useCheckAuthentication.mockReturnValue({ authenticated: true, user: userInformation });
  //   sessionStorage.setItem('bookingForm', JSON.stringify(mockBookingForm));

  //   render(
  //     <Router>
  //       <BookingPageLoggedIn />
  //     </Router>
  //   );

  //   expect(screen.getByTestId('customerMemberId')).toBeInTheDocument();
  //   expect(screen.getByTestId('customerFirstName')).toBeInTheDocument();
  //   expect(screen.getByTestId('customerLastName')).toBeInTheDocument();
  //   // expect(screen.getByTestId('address')).toBeInTheDocument();
  //   // expect(screen.getByTestId('teleNo')).toBeInTheDocument();
  //   // expect(screen.getByTestId('emailNo')).toBeInTheDocument();

  //   expect(screen.getByTestId('customerMemberId')).toHaveValue(`Member ID (${userInformation.id})`);
  //   expect(screen.getByTestId('customerFirstName')).toHaveValue(userInformation.firstName);
  //   expect(screen.getByTestId('customerLastName')).toHaveValue(userInformation.lastName);
  //   expect(screen.getByTestId('address')).toHaveValue(userInformation.address);
  //   expect(screen.getByTestId('teleNo')).toHaveValue(userInformation.phoneNumber);
  //   expect(screen.getByTestId('emailNo')).toHaveValue(userInformation.email);

  // });

  
  it('Fetch Users Login Status', async () => {
    // const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UiLCJpZCI6IjY2OWFiMTM2YTZhMGFiYmVlNmZlODg2YyIsImlhdCI6MTcyMTYzMzc4NiwiZXhwIjoxNzIxNzIwMTg2fQ.bJLcsWdpKz9ocFcVryPfoOkeu7QqUONGT1PB_j6CDpY';
    const mockToken = 'mock-token';
    const mockResponse = { data: userInformation };
    fetchUserByToken.mockResolvedValueOnce(mockResponse.data);
    const userInfo = await fetchUserByToken(mockToken);
    expect(fetchUserByToken).toHaveBeenCalledWith(mockToken);
    expect(userInfo).toEqual(userInformation);
  });


  // it('handle form submission and navigate to confirmation page', async () => {
  //   useCheckAuthentication.mockReturnValue({ authenticated: true, user: userInformation });
  //   sessionStorage.setItem('bookingForm', JSON.stringify(mockBookingForm));
  //   submitBookingDetails.mockResolvedValueOnce({ status: 201 });

  //   render(
  //     <Router>
  //       <BookingPageLoggedIn />
  //     </Router>
  //   );
    
  //   fireEvent.change(screen.getByTestId("creditCardNumber"), { target: { value: '123333333' } });
  //   fireEvent.change(screen.getByTestId("cardHolderName"), { target: { value: 'Mc guy' } });
  //   fireEvent.change(screen.getByTestId("billingAddress"), { target: { value: 'SUTD' } });
    
  //   fireEvent.click(screen.getByText(/Proceed to Booking Summary/i));
    
  //   await waitFor(() => {
  //     expect(submitBookingDetails).toHaveBeenCalledWith(expect.any(Object), expect.any(String), expect.any(String), expect.any(Function));
  //     expect(mockNavigate).toHaveBeenCalledWith("/bookingConfirmed", {});
  //   });
  // });



  // it('handles clicking the edit booking button and navigates to hotel details', () => {
  //   useCheckAuthentication.mockReturnValue({ authenticated: true, user: userInformation });
  //   sessionStorage.setItem('hotelListingForm', JSON.stringify({ hotel_id: 'dGh9' }));
  //   sessionStorage.setItem('bookingForm', JSON.stringify(mockBookingForm));

  //   render(
  //     <Router>
  //       <BookingPageLoggedIn />
  //     </Router>
  //   );

  //   fireEvent.click(screen.getByText(/Edit Booking/i));
  //   expect(mockNavigate).toHaveBeenCalledWith("/ViewHotelDetails/dGh9", { state: { hotel_id: 'dGh9' } });
  // });


  
//   test('handles booking submission failure', async () => {
//     // axios.post.mockRejectedValueOnce({ response: { data: { message: 'Booking failed' } } });
//     const mockSubmitBooking = jest.fn();

//     // render(
//     //   <Router>
//     //     <BookingPageLoggedIn />
//     //   </Router>
//     // );

//     render(<BookingPageLoggedIn submitBooking={mockSubmitBooking} />);

//     fireEvent.change(screen.getByTestId("customerMemberId"), { target: { value: '12345' } });
//     fireEvent.change(screen.getByTestId("customerFirstName"), { target: { value: 'john' } });
//     fireEvent.change(screen.getByTestId("customerLastName"), { target: { value: 'doe' } });
//     fireEvent.change(screen.getByTestId("areaNo"), { target: { value: '+65' } });
//     fireEvent.change(screen.getByTestId("teleNo"), { target: { value: '12345678' } });
//     fireEvent.change(screen.getByTestId("emailNo"), { target: { value: 'johndoe@gmail.com' } });

//     fireEvent.click(screen.getByText(/Proceed to Booking Summary/i));

//     await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
//     expect(axios.post).toHaveBeenCalledWith('/api/bookings', expect.any(Object));

//     expect(screen.getByText(/Booking failed/i)).toBeInTheDocument();
//   });

  

});
