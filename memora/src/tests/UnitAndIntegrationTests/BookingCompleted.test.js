import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingCompleted from '../../pages/BookingCompleted';
import { useCheckAuthentication } from '../../services/BookingForm';

jest.mock('../../services/BookingForm', () => ({
  useCheckAuthentication: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockUser = {
  id: 'user123',
  title: 'Mr',
  firstName: 'John',
  lastName: 'Doe',
};

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

const mockRoomDetails = {
  hotelName: 'Grand Hotel',
  rooms: 2,
  parent: 2,
  children: 1,
  checkin: '2024-08-01',
  checkout: '2024-08-05',
  hotelDuration: 4,
  totalPrice: 1000,
};

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockNavigate,
//   useLocation: () => ({
//     state: {
//       bookingDetails: mockBookingDetails,
//     }
//   }),
// }));

beforeEach(() => { //important!!
  jest.clearAllMocks(); // clears all mock calls and instances between each test. It ensures that each test starts with a clean slate, preventing any interference from previous tests.
  useCheckAuthentication.mockReturnValue({ authenticated: true, user: mockUser }); //mocks the useCheckAuthentication hook to always return an authenticated user with the mock user data. It simulates a logged-in user for all tests, which is necessary for the component to render correctly.
  jest.spyOn(window.sessionStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify(mockRoomDetails)); 
  // This mocks the sessionStorage.getItem method to always return the stringified mockRoomDetails. It simulates the presence of booking data in the session storage, which your component relies on to render the booking details.
});

describe('BookingCompleted', () => {
  test('renders booking completed details', () => {
    render(
      <Router>
        <BookingCompleted bookingDetails={mockBookingDetails} />
      </Router>
    );
    expect(screen.getByText('Booking Completed!')).toBeInTheDocument();
    expect(screen.getByText(/Booking ID: \d+/)).toBeInTheDocument();
    expect(screen.getByText('A pdf version of your booking have been sent to your email.')).toBeInTheDocument();
    expect(screen.getByText('Thank you for choosing us for your stay.')).toBeInTheDocument();

    // expect(screen.getByText('Booking Summary')).toBeInTheDocument();
    // expect(screen.getByText('Total')).toBeInTheDocument();
    // expect(screen.getByText('Check out:')).toBeInTheDocument();
    // expect(screen.getByText(/Adults/)).toBeInTheDocument();
    // expect(screen.getByText(/Children/)).toBeInTheDocument();
    // expect(screen.getByText('Check in:')).toBeInTheDocument();
    // expect(screen.getByText('night(s)')).toBeInTheDocument();
  });

  test('renders user information', () => {
    render(
      <Router>
        <BookingCompleted />
      </Router>
    );
    expect(screen.getByText(`${mockUser.title}. ${mockUser.firstName} ${mockUser.lastName}, (MemberID: ${mockUser.id})`)).toBeInTheDocument();
  });

  test('renders hotel and room details', () => {
    render(
      <Router>
        <BookingCompleted />
      </Router>
    );

    /*
    uses custom text matcher function for hotel name, checks if any element's text content includes the hotel name, rather than expecting an exact match.
    */
    // expect(screen.getByText( mockRoomDetails.hotelName)).toBeInTheDocument();
    const hotelNameElement = screen.getByText((content, element) => 
      content.includes(mockRoomDetails.hotelName)
    );
    expect(hotelNameElement).toBeInTheDocument();

    //partial match (use custome match)
    expect(screen.getByText((content, element) => 
      content.includes(`${mockRoomDetails.rooms} Room`)
    )).toBeInTheDocument();

    //as adults and children in the single assertion, looking for both pieces of information in the same element or nearby elements.
    expect(screen.getByText((content, element) => 
      content.includes(`${mockRoomDetails.parent} Adults`) && 
      content.includes(`${mockRoomDetails.children} Children`)
    )).toBeInTheDocument();
  });

  test('renders check-in and check-out details', () => {
    render(
      <Router>
        <BookingCompleted />
      </Router>
    );
    expect(screen.getByText('Check in:')).toBeInTheDocument();
    expect(screen.getByText(mockRoomDetails.checkin)).toBeInTheDocument();
    expect(screen.getByText('Check out:')).toBeInTheDocument();
    expect(screen.getByText(mockRoomDetails.checkout)).toBeInTheDocument();
    expect(screen.getByText(`${mockRoomDetails.hotelDuration} night(s)`)).toBeInTheDocument();
  });

  test('renders total price', () => {
    render(
      <Router>
        <BookingCompleted />
      </Router>
    );
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText(`SGD ${mockRoomDetails.totalPrice.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText('Includes tax recovery charges and service fees')).toBeInTheDocument();
  });

});
