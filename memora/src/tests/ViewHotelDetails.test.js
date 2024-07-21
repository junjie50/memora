// ViewHotelDetails.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ViewHotelDetails from '../pages/ViewHotelDetails';
import { retrieveAvailableHotelRooms, retrieveStaticHotelDetailByHotelID } from '../services/ascenda-api.js';

jest.mock('../services/ascenda-api.js', () => ({
  retrieveAvailableHotelRooms: jest.fn(),
  retrieveStaticHotelDetailByHotelID: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ hotelId: '123' }),
}));

beforeEach(() => {
  mockNavigate.mockReset();
  sessionStorage.clear();
});

describe('ViewHotelDetails component', () => {
  const mockHotelData = {
    id: '123',
    name: 'Test Hotel',
    address: '123 Test Street',
    rating: 4.5,
    trustyou: { score: { overall: 90 } },
    description: '<p>Test description</p>',
    amenities_ratings: [
      { name: 'Cleanliness', score: 90 },
      { name: 'Location', score: 85 },
    ],
    amenities: {
      tVInRoom: true,
      freeWifi: true,
    },
    categories: {
      luxury: { name: 'Luxury', score: 95, popularity: 0.8 },
    },
    rooms: [
      { id: '1', name: 'Deluxe Room', key: 'deluxe', price: 100, images: [{ url: 'room1.jpg' }], description: 'A deluxe room', additionalInfo: 'Some info' },
      { id: '2', name: 'Standard Room', key: 'standard', price: 80, images: [{ url: 'room2.jpg' }], description: 'A standard room', additionalInfo: 'Some info' },
    ],
    original_metadata: {
      country: 'Test Country',
      city: 'Test City',
    },
    image_details: {
      prefix: 'https://example.com/',
      suffix: '.jpg',
      default_image_index: 'hotel1'
    }
  };

  const mockAvailableRoomsData = {
    data: {
      rooms: mockHotelData.rooms,
    },
  };

  it('renders loading state initially', () => {
    render(
      <Router>
        <ViewHotelDetails />
      </Router>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders error state', async () => {
    retrieveAvailableHotelRooms.mockRejectedValueOnce(new Error('Failed to fetch'));
    retrieveStaticHotelDetailByHotelID.mockRejectedValueOnce(new Error('Failed to fetch'));

    sessionStorage.setItem('homeForm', JSON.stringify({ countryUID: 'SG', checkin: '2024-07-01', checkout: '2024-07-07', parent: 2, children: 1, rooms: 1 }));

    render(
      <Router>
        <ViewHotelDetails />
      </Router>
    );

    await waitFor(() => expect(screen.getByText(/Error loading hotel data/i)).toBeInTheDocument());
    expect(screen.getByText(/Failed to load hotel data: Failed to fetch/i)).toBeInTheDocument();
  });

  it('renders hotel details correctly', async () => {
    retrieveAvailableHotelRooms.mockResolvedValueOnce(mockAvailableRoomsData);
    retrieveStaticHotelDetailByHotelID.mockResolvedValueOnce({ data: mockHotelData });

    sessionStorage.setItem('homeForm', JSON.stringify({ countryUID: 'SG', checkin: '2024-07-01', checkout: '2024-07-07', parent: 2, children: 1, rooms: 1 }));

    render(
      <Router>
        <ViewHotelDetails />
      </Router>
    );

    await waitFor(() => expect(screen.getByText(/Test Hotel/i)).toBeInTheDocument());
    expect(screen.getByText(/123 Test Street/i)).toBeInTheDocument();
    expect(screen.getByText(/4.5 \/ 5/i)).toBeInTheDocument();
    expect(screen.getByText(/TrustYou Score: 90/i)).toBeInTheDocument();
    expect(screen.getByText(/Hotel overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Cleanliness/i)).toBeInTheDocument();
    expect(screen.getByText(/Luxury/i)).toBeInTheDocument();
  });

  it('handles room count increment and decrement', async () => {
    retrieveAvailableHotelRooms.mockResolvedValueOnce(mockAvailableRoomsData);
    retrieveStaticHotelDetailByHotelID.mockResolvedValueOnce({ data: mockHotelData });

    sessionStorage.setItem('homeForm', JSON.stringify({ countryUID: 'SG', checkin: '2024-07-01', checkout: '2024-07-07', parent: 2, children: 1, rooms: 1 }));

    render(
      <Router>
        <ViewHotelDetails />
      </Router>
    );

    await waitFor(() => expect(screen.getByText(/Test Hotel/i)).toBeInTheDocument());

    const incrementButtons = screen.getAllByText('+');
    const decrementButtons = screen.getAllByText('-');
    const roomCountInputs = screen.getAllByRole('textbox');

    fireEvent.click(incrementButtons[0]);
    expect(roomCountInputs[0].value).toBe('1');

    fireEvent.click(incrementButtons[0]);
    expect(roomCountInputs[0].value).toBe('2');

    fireEvent.click(decrementButtons[0]);
    expect(roomCountInputs[0].value).toBe('1');

    fireEvent.click(decrementButtons[0]);
    expect(roomCountInputs[0].value).toBe('0');
  });

  it('handles booking submission', async () => {
    retrieveAvailableHotelRooms.mockResolvedValueOnce(mockAvailableRoomsData);
    retrieveStaticHotelDetailByHotelID.mockResolvedValueOnce({ data: mockHotelData });

    sessionStorage.setItem('homeForm', JSON.stringify({ countryUID: 'SG', checkin: '2024-07-01', checkout: '2024-07-07', parent: 2, children: 1, rooms: 1 }));

    render(
      <Router>
        <ViewHotelDetails />
      </Router>
    );

    await waitFor(() => expect(screen.getByText(/Test Hotel/i)).toBeInTheDocument());

    const incrementButtons = screen.getAllByText('+');
    fireEvent.click(incrementButtons[0]);

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/bookingPageLoggedIn', {}));

    //debugging step to log the stored booking form
    const bookingForm = JSON.parse(sessionStorage.getItem('bookingForm'));
    console.log('Stored booking form:', bookingForm);

    expect(bookingForm).toMatchObject({
      hotelId: '123',
      roomBooking: [{ key: 'deluxe', roomOrder: 1, price: 100 }],
    });
  });
});
