import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingPageLoggedIn from '../pages/BookingPageLoggedIn';
import axios from 'axios';

// Mock the axios module to control its behavior in tests
jest.mock('axios');

describe('BookingPageLoggedIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    expect(screen.getByTestId('areaNo')).toBeInTheDocument();
    expect(screen.getByTestId('teleNo')).toBeInTheDocument();
    expect(screen.getByTestId('emailNo')).toBeInTheDocument();

  });

  // test('handles booking submission successfully', async () => {
  //   const mockResponse = { data: { message: 'Booking confirmed' } };
  //   axios.post.mockResolvedValueOnce(mockResponse);

  //   render(
  //     <Router>
  //       <BookingPageLoggedIn />
  //     </Router>
  //   );

  //   fireEvent.change(screen.getByTestId("customerMemberId"), { target: { value: '12345' } });
  //   fireEvent.change(screen.getByTestId("customerFirstName"), { target: { value: 'john' } });
  //   fireEvent.change(screen.getByTestId("customerLastName"), { target: { value: 'doe' } });
  //   fireEvent.change(screen.getByTestId("areaNo"), { target: { value: '+65' } });
  //   fireEvent.change(screen.getByTestId("teleNo"), { target: { value: '12345678' } });
  //   fireEvent.change(screen.getByTestId("emailNo"), { target: { value: 'johndoe@gmail.com' } });
    
  //   fireEvent.click(screen.getByText(/Proceed to Booking Summary/i));

  //   await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  //   expect(axios.post).toHaveBeenCalledWith('/api/bookings', expect.any(Object));
  //   expect(screen.getByText(/Booking confirmed/i)).toBeInTheDocument();
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
