import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingPageLoggedIn from '../../pages/BookingPageLoggedIn.js';
import {useCheckAuthentication} from '../../services/BookingForm.js';

//Set Up Initial
jest.mock('../../services/BookingForm.js', () => ({
  useCheckAuthentication: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
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
    "address": "SUTD Hostel"
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
    jest.spyOn(window.sessionStorage.__proto__, 'getItem').mockImplementation((key) => {
      if (key === 'bookingForm') return JSON.stringify(mockBookingForm);
      if (key === 'hotelListingForm') return JSON.stringify({ hotel_id: 'dGh9' });
      return null;
    });

    jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => {
    if (key === 'token') return 'mock-token';
      return null;
    });

    mockNavigate.mockReset();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('navigates to hotel listing page if no bookingForm is found', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);

    useCheckAuthentication.mockReturnValue({ authenticated: false });
    render(
      <Router>
        <BookingPageLoggedIn />
      </Router>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/hotelListings');
  });

  it('renders personal and payment details form of bookingPageLoggedIn', () => {
    useCheckAuthentication.mockReturnValue({ authenticated: true, user: userInformation });

    render(
      <Router>
        <BookingPageLoggedIn />
      </Router>
    );

    expect(screen.getByTestId('customerMemberId')).toBeInTheDocument();
    expect(screen.getByTestId('customerFirstName')).toBeInTheDocument();
    expect(screen.getByTestId('customerLastName')).toBeInTheDocument();
    expect(screen.getByTestId('address')).toBeInTheDocument();
    expect(screen.getByTestId('teleNo')).toBeInTheDocument();
    expect(screen.getByTestId('emailNo')).toBeInTheDocument();

    expect(screen.getByTestId('customerMemberId')).toHaveValue(`Member ID (${userInformation.id})`);
    expect(screen.getByTestId('customerFirstName')).toHaveValue(userInformation.firstName);
    expect(screen.getByTestId('customerLastName')).toHaveValue(userInformation.lastName);
    expect(screen.getByTestId('address')).toHaveValue(userInformation.address);
    expect(screen.getByTestId('teleNo')).toHaveValue(userInformation.phoneNumber);
    expect(screen.getByTestId('emailNo')).toHaveValue(userInformation.email);
  });


  it('handle form submission and navigate to confirmation page', async () => {
    useCheckAuthentication.mockReturnValue({ authenticated: true, user: userInformation });

    render(
      <Router>
        <BookingPageLoggedIn />
      </Router>
    );
    
    fireEvent.change(screen.getByTestId("creditCardNumber"), { target: { value: '123333333' } });
    fireEvent.change(screen.getByTestId("cardHolderName"), { target: { value: 'Mr guy' } });
    fireEvent.change(screen.getByTestId("billingAddress"), { target: { value: 'SUTD' } });
    
    fireEvent.click(screen.getByText(/Proceed to Booking Summary/i));
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/bookingConfirmed", {});
    });
  });

  // (Integration testing)
  it('handles clicking the edit booking button and navigates to hotel details', () => {
    useCheckAuthentication.mockReturnValue({ authenticated: true, user: userInformation });

    // Mock sessionStorage.getItem to return the hotelListingForm
    const mockHotelListingForm = JSON.stringify({ hotel_id: 'dGh9' });
    jest.spyOn(window.sessionStorage.__proto__, 'getItem')
      .mockImplementation((key) => {
        if (key === 'hotelListingForm') return mockHotelListingForm;
        // Keep the existing implementation for other keys
        if (key === 'bookingForm') return JSON.stringify(mockBookingForm);
        return null;
      });

    render(
      <Router>
        <BookingPageLoggedIn />
      </Router>
    );

    fireEvent.click(screen.getByText(/Edit Booking/i));

    expect(mockNavigate).toHaveBeenCalledWith(
      "/ViewHotelDetails/dGh9", 
      { state: { hotel_id: 'dGh9' } }
    );
  });

});
