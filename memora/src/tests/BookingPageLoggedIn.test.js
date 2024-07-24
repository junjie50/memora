// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import BookingPageLoggedIn from '../pages/BookingPageLoggedIn'; 
// import { getCookie, useCheckAuthentication } from '../services/BookingForm';

// jest.mock('../services/BookingForm', () => ({
//   getCookie: jest.fn(),
//   useCheckAuthentication: jest.fn()
// }));

// const mockNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useNavigate: () => mockNavigate,
// }));

// beforeEach(() => {
//   mockNavigate.mockReset();
//   sessionStorage.clear();
// });


// // Mock the axios module to control its behavior in tests
// const userInformation = {
//     "username": "mike",
//     "title": "Mr",
//     "firstName": "hengchang",
//     "lastName": "qi",
//     "email": "111111@qq.com",
//     "phoneNumber": "121212",
//     "address": "SUTD Hostel",
//     "id": "669ab136a6a0abbee6fe886c"
// };

// // test('Fetch Users By Token', async () => {
// //   axios.get.mockResolvedValue({ data: userInformation });
  
// //   const userInfo = await fetchUserByToken(userToken);

// //   console.log('1', userInfo);
// //   console.log('2', userInformation);
  
// //   // Check if axios.get was called with the correct URL
// //   expect(axios.get).toHaveBeenCalledWith(`https://memora-backend-2eebe428f36a.herokuapp.com/api/users/${userToken}`);  
// //   // Check if the response data matches the expected user information
// //   expect(userInfo).toEqual(userInformation);
// // });

// describe('BookingPageLoggedIn', () => {
//   // beforeEach(() => {
//   //   jest.clearAllMocks();
//   // });

//   test('renders booking form', () => {
//     render(
//       <Router>
//         <BookingPageLoggedIn />
//       </Router>
//     );
    
//     expect(screen.getByTestId('customerMemberId')).toBeInTheDocument();
//     expect(screen.getByTestId('customerFirstName')).toBeInTheDocument();
//     expect(screen.getByTestId('customerLastName')).toBeInTheDocument();
//     expect(screen.getByTestId('areaNo')).toBeInTheDocument();
//     expect(screen.getByTestId('teleNo')).toBeInTheDocument();
//     expect(screen.getByTestId('emailNo')).toBeInTheDocument();

//   });

//   // test('handles booking submission successfully', async () => {
//   //   const mockResponse = { data: { message: 'Booking confirmed' } };
//   //   axios.post.mockResolvedValueOnce(mockResponse);

//   //   render(
//   //     <Router>
//   //       <BookingPageLoggedIn />
//   //     </Router>
//   //   );

//   //   fireEvent.change(screen.getByTestId("customerMemberId"), { target: { value: '12345' } });
//   //   fireEvent.change(screen.getByTestId("customerFirstName"), { target: { value: 'john' } });
//   //   fireEvent.change(screen.getByTestId("customerLastName"), { target: { value: 'doe' } });
//   //   fireEvent.change(screen.getByTestId("areaNo"), { target: { value: '+65' } });
//   //   fireEvent.change(screen.getByTestId("teleNo"), { target: { value: '12345678' } });
//   //   fireEvent.change(screen.getByTestId("emailNo"), { target: { value: 'johndoe@gmail.com' } });
    
//   //   fireEvent.click(screen.getByText(/Proceed to Booking Summary/i));

//   //   await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
//   //   expect(axios.post).toHaveBeenCalledWith('/api/bookings', expect.any(Object));
//   //   expect(screen.getByText(/Booking confirmed/i)).toBeInTheDocument();
//   // });

// //   test('handles booking submission failure', async () => {
// //     // axios.post.mockRejectedValueOnce({ response: { data: { message: 'Booking failed' } } });
// //     const mockSubmitBooking = jest.fn();

// //     // render(
// //     //   <Router>
// //     //     <BookingPageLoggedIn />
// //     //   </Router>
// //     // );

// //     render(<BookingPageLoggedIn submitBooking={mockSubmitBooking} />);

// //     fireEvent.change(screen.getByTestId("customerMemberId"), { target: { value: '12345' } });
// //     fireEvent.change(screen.getByTestId("customerFirstName"), { target: { value: 'john' } });
// //     fireEvent.change(screen.getByTestId("customerLastName"), { target: { value: 'doe' } });
// //     fireEvent.change(screen.getByTestId("areaNo"), { target: { value: '+65' } });
// //     fireEvent.change(screen.getByTestId("teleNo"), { target: { value: '12345678' } });
// //     fireEvent.change(screen.getByTestId("emailNo"), { target: { value: 'johndoe@gmail.com' } });

// //     fireEvent.click(screen.getByText(/Proceed to Booking Summary/i));

// //     await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
// //     expect(axios.post).toHaveBeenCalledWith('/api/bookings', expect.any(Object));

// //     expect(screen.getByText(/Booking failed/i)).toBeInTheDocument();
// //   });

  

// });





import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingPageLoggedIn from '../pages/BookingPageLoggedIn';
import { getCookie, useCheckAuthentication, submitBookingDetails } from '../services/BookingForm';

jest.mock('../services/BookingForm', () => ({
  getCookie: jest.fn(),
  useCheckAuthentication: jest.fn(),
  submitBookingDetails: jest.fn()
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  mockNavigate.mockReset();
  sessionStorage.clear();
});

const mockUser = {
  username: "mike",
  title: "Mr",
  firstName: "hengchang",
  lastName: "qi",
  email: "111111@qq.com",
  phoneNumber: "121212",
  address: "SUTD Hostel",
  id: "669ab136a6a0abbee6fe886c"
};

const mockRoomDetails = {
  hotelName: "Hotel California",
  rooms: 1,
  parent: 2,
  children: 0,
  checkin: "2024-08-01",
  checkout: "2024-08-05",
  hotelDuration: 4,
  totalPrice: 800.00,
  roomBooking: [{ price: 800.00 }]
};

describe('BookingPageLoggedIn', () => {
  beforeEach(() => {
    useCheckAuthentication.mockReturnValue({ authenticated: true, user: mockUser });
    sessionStorage.setItem('bookingForm', JSON.stringify(mockRoomDetails));
  });

  test('renders booking form', () => {
    render(
      <Router>
        <BookingPageLoggedIn />
      </Router>
    );

    expect(screen.getByTestId('customerMemberId')).toBeInTheDocument();
    expect(screen.getByTestId('customerFirstName')).toBeInTheDocument();
    expect(screen.getByTestId('customerLastName')).toBeInTheDocument();
    expect(screen.getByTestId('teleNo')).toBeInTheDocument();
    expect(screen.getByTestId('emailNo')).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    submitBookingDetails.mockResolvedValue({ status: 201 });

    await act(async () => {
      render(
        <Router>
          <BookingPageLoggedIn />
        </Router>
      );
    });

    fireEvent.change(screen.getByTestId('specialRequestText'), { target: { value: 'No special requests' } });
    fireEvent.change(screen.getByTestId('creditCardNumber'), { target: { value: '4111111111111111' } });
    fireEvent.change(screen.getByTestId('cardHolderName'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('billingAddress'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByTestId('postalCode'), { target: { value: '12345' } });
    fireEvent.change(screen.getByTestId('countryName'), { target: { value: 'USA' } });
    fireEvent.change(screen.getByTestId('validUntill'), { target: { value: '12/24' } });
    fireEvent.change(screen.getByTestId('cvcNo'), { target: { value: '123' } });

    fireEvent.click(screen.getByText(/Proceed to Booking Summary/i));

    await waitFor(() => {
      expect(submitBookingDetails).toHaveBeenCalled();
    });
    expect(submitBookingDetails).toHaveBeenCalledWith(expect.any(Object), expect.any(String), expect.any(String), expect.any(Function));
  });

  test('handles booking submission failure', async () => {
    submitBookingDetails.mockRejectedValue(new Error('Booking failed'));

    await act(async () => {
      render(
        <Router>
          <BookingPageLoggedIn />
        </Router>
      );
    });

    fireEvent.change(screen.getByTestId('specialRequestText'), { target: { value: 'No special requests' } });
    fireEvent.change(screen.getByTestId('creditCardNumber'), { target: { value: '4111111111111111' } });
    fireEvent.change(screen.getByTestId('cardHolderName'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('billingAddress'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByTestId('postalCode'), { target: { value: '12345' } });
    fireEvent.change(screen.getByTestId('countryName'), { target: { value: 'USA' } });
    fireEvent.change(screen.getByTestId('validUntill'), { target: { value: '12/24' } });
    fireEvent.change(screen.getByTestId('cvcNo'), { target: { value: '123' } });

    fireEvent.click(screen.getByText(/Proceed to Booking Summary/i));

    await waitFor(() => {
      expect(submitBookingDetails).toHaveBeenCalled();
    });
    expect(screen.getByText(/Booking failed/i)).toBeInTheDocument();
  });
});
