import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ViewHotelDetails from '../../pages/ViewHotelDetails.js';
import { retrieveAvailableHotelRooms, retrieveStaticHotelDetailByHotelID } from '../../services/ascenda-api.js';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useLoadScript } from '@react-google-maps/api';

jest.mock('../../services/ascenda-api.js', () => ({
  retrieveAvailableHotelRooms: jest.fn(),
  retrieveStaticHotelDetailByHotelID: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ hotelId: '123' }),
}));

jest.mock('@react-google-maps/api', () => ({
  GoogleMap: jest.fn(({ children }) => <div data-testid="google-map">{children}</div>),
  MarkerF: jest.fn(() => <div data-testid="markerf" />),
  useLoadScript: jest.fn(),
}));

beforeEach(() => {
  mockNavigate.mockReset();
  sessionStorage.clear();
  retrieveAvailableHotelRooms.mockReset();
  retrieveStaticHotelDetailByHotelID.mockReset();
});

const mockHotelData = {
  id: '123',
  name: 'Test Hotel',
  address: '123 Test Street',
  latitude: 1.234,
  longitude: 5.678,
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
    { id: '1', name: 'Deluxe Room', key: 'deluxe', price: 100, images: [{ url: 'room1.jpg' }], description: 'A deluxe room', additionalInfo: 'Some info', roomAdditionalInfo: { breakfastInfo: 'Breakfast included' } },
    { id: '2', name: 'Standard Room', key: 'standard', price: 80, images: [{ url: 'room2.jpg' }], description: 'A standard room', additionalInfo: 'Some info', roomAdditionalInfo: { breakfastInfo: 'No breakfast' } },
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

beforeEach(() => {
  useLoadScript.mockReturnValue({
    isLoaded: false,
    loadError: null,
  });
});

describe('ViewHotelDetails component - Unit testing', () => {
  it('renders loading state initially', () => {
    useLoadScript.mockReturnValue({
      isLoaded: false,
      loadError: null,
    });

    render(
      <Router>
        <ViewHotelDetails />
      </Router>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders error state', async () => {
    useLoadScript.mockReturnValueOnce({
      isLoaded: true,
      loadError: null,
    });

    retrieveAvailableHotelRooms.mockRejectedValueOnce(new Error('Failed to fetch'));
    retrieveStaticHotelDetailByHotelID.mockRejectedValueOnce(new Error('Failed to fetch'));

    sessionStorage.setItem('homeForm', JSON.stringify({ countryUID: 'SG', checkin: '2024-07-01', checkout: '2024-07-07', parent: 2, children: 1, rooms: 1}));

    render(
      <Router>
        <ViewHotelDetails />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to load hotel data: Failed to fetch/i)).toBeInTheDocument();
    });
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

    useLoadScript.mockReturnValueOnce({
      isLoaded: true,
      loadError: null,
    });

    await waitFor(() => expect(screen.getByText(/Test Hotel/i)).toBeInTheDocument());
    expect(screen.getByText(/123 Test Street/i)).toBeInTheDocument();
    expect(screen.getByText(/4.5 \/ 5/i)).toBeInTheDocument();
    expect(screen.getByText(/TrustYou Score: 90/i)).toBeInTheDocument();
    expect(screen.getByText(/Hotel overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Cleanliness/i)).toBeInTheDocument();
    expect(screen.getByText(/Luxury/i)).toBeInTheDocument();
    expect(screen.getByTestId('google-map')).toBeInTheDocument();
    expect(screen.getByTestId('markerf')).toBeInTheDocument();
  });

  it('testing map loading state', async () => {
    retrieveStaticHotelDetailByHotelID.mockResolvedValue({
      data: mockHotelData
    });

    retrieveAvailableHotelRooms.mockResolvedValue({
      data: {
        rooms: mockHotelData.rooms
      }
    });

    sessionStorage.setItem('homeForm', JSON.stringify({
      countryUID: 'SG',
      checkin: '2024-07-01',
      checkout: '2024-07-07',
      parent: 2,
      children: 1,
      rooms: 1
    }));

    useLoadScript.mockReturnValueOnce({
      isLoaded: false,
      loadError: null,
    });

    render(
      <Router>
        <ViewHotelDetails />
      </Router>
    );

    await waitFor(() => expect(screen.getByText(/Loading maps/i)).toBeInTheDocument());
  });

  it('displays the map with correct hotel location', async () => {
    retrieveAvailableHotelRooms.mockResolvedValueOnce(mockAvailableRoomsData);
    retrieveStaticHotelDetailByHotelID.mockResolvedValueOnce({ data: mockHotelData });

    sessionStorage.setItem('homeForm', JSON.stringify({ countryUID: 'SG', checkin: '2024-07-01', checkout: '2024-07-07', parent: 2, children: 1, rooms: 1 }));
  
    useLoadScript.mockReturnValue({
      isLoaded: true,
      loadError: null,
    });
  
    render(
      <Router>
        <ViewHotelDetails />
      </Router>
    );
  
    await waitFor(() => expect(screen.getByText(/Test Hotel/i)).toBeInTheDocument());
  
    // Check that the GoogleMap component receives the correct center prop
    expect(GoogleMap).toHaveBeenCalledWith(
      expect.objectContaining({ center: { lat: mockHotelData.latitude, lng: mockHotelData.longitude } }),
      {}
    );
  
    // Check that a marker is rendered at the hotel's location
    expect(MarkerF).toHaveBeenCalledWith(
      expect.objectContaining({ position: { lat: mockHotelData.latitude, lng: mockHotelData.longitude } }),
      {}
    );
  });

  it('renders error state when map fails to load', async () => {
    retrieveStaticHotelDetailByHotelID.mockResolvedValue({
      data: mockHotelData
    });

    retrieveAvailableHotelRooms.mockResolvedValue({
      data: {
        rooms: mockHotelData.rooms
      }
    });

    sessionStorage.setItem('homeForm', JSON.stringify({
      countryUID: 'SG',
      checkin: '2024-07-01',
      checkout: '2024-07-07',
      parent: 2,
      children: 1,
      rooms: 1
    }));
    
    useLoadScript.mockReturnValue({
      isLoaded: false,
      loadError: new Error('Map failed to load'),
    });
  
    render(
      <Router>
        <ViewHotelDetails />
      </Router>
    );
  
    await waitFor(() => expect(screen.getByText(/Error loading maps/i)).toBeInTheDocument());
  });

  it('handles room count increment and decrement', async () => {
    retrieveAvailableHotelRooms.mockResolvedValueOnce(mockAvailableRoomsData);
    retrieveStaticHotelDetailByHotelID.mockResolvedValueOnce({ data: mockHotelData });

    sessionStorage.setItem('homeForm', JSON.stringify({ countryUID: 'SG', checkin: '2024-07-01', checkout: '2024-07-07', parent: 2, children: 1, rooms: 1 }));

    useLoadScript.mockReturnValue({
      isLoaded: true,
      loadError: null,
    });

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

  it('renders the correct number of rooms', async () => {
    retrieveAvailableHotelRooms.mockResolvedValueOnce(mockAvailableRoomsData);
    retrieveStaticHotelDetailByHotelID.mockResolvedValueOnce({ data: mockHotelData });
  
    sessionStorage.setItem('homeForm', JSON.stringify({ countryUID: 'SG', checkin: '2024-07-01', checkout: '2024-07-07', parent: 2, children: 1, rooms: 1 }));
  
    useLoadScript.mockReturnValue({
      isLoaded: true,
      loadError: null,
    });
  
    render(
      <Router>
        <ViewHotelDetails />
      </Router>
    );
  
    await waitFor(() => expect(screen.getByText(/Test Hotel/i)).toBeInTheDocument());
    
    const rooms = screen.getAllByTestId('room-card');
    expect(rooms.length).toBe(mockHotelData.rooms.length);
  });
  
  it('renders room details correctly', async () => {
    retrieveAvailableHotelRooms.mockResolvedValueOnce(mockAvailableRoomsData);
    retrieveStaticHotelDetailByHotelID.mockResolvedValueOnce({ data: mockHotelData });
  
    sessionStorage.setItem('homeForm', JSON.stringify({ countryUID: 'SG', checkin: '2024-07-01', checkout: '2024-07-07', parent: 2, children: 1, rooms: 1 }));
  
    useLoadScript.mockReturnValue({
      isLoaded: true,
      loadError: null,
    });
  
    render(
      <Router>
        <ViewHotelDetails />
      </Router>
    );
  
    await waitFor(() => expect(screen.getByText(/Test Hotel/i)).toBeInTheDocument());
  
    mockHotelData.rooms.forEach(room => {
      expect(screen.getByText(room.name)).toBeInTheDocument();
      expect(screen.getByText(`SGD ${room.price.toFixed(2)}`)).toBeInTheDocument();
    });
  });

  it('renders message for no hotel data available', async () => {
    retrieveStaticHotelDetailByHotelID.mockResolvedValueOnce({ data: undefined });
    
    sessionStorage.setItem('homeForm', JSON.stringify({
      countryUID: 'SG',
      checkin: '2024-07-01',
      checkout: '2024-07-07',
      parent: 2,
      children: 1,
      rooms: 1
    }));
  
    render(
      <Router>
        <ViewHotelDetails />
      </Router>
    );
  
    await waitFor(() => {
      expect(screen.getByText(/Error loading hotel data/i)).toBeInTheDocument();
      expect(screen.getByText(/Failed to load hotel data: Invalid response from API/i)).toBeInTheDocument();
    });
  });

  it('submit button is disabled when no rooms are selected', async () => {
    retrieveAvailableHotelRooms.mockResolvedValueOnce(mockAvailableRoomsData);
    retrieveStaticHotelDetailByHotelID.mockResolvedValueOnce({ data: mockHotelData });
  
    sessionStorage.setItem('homeForm', JSON.stringify({ countryUID: 'SG', checkin: '2024-07-01', checkout: '2024-07-07', parent: 2, children: 1, rooms: 1 }));
  
    useLoadScript.mockReturnValue({
      isLoaded: true,
      loadError: null,
    });
  
    render(
      <Router>
        <ViewHotelDetails />
      </Router>
    );
  
    await waitFor(() => expect(screen.getByText(/Test Hotel/i)).toBeInTheDocument());
    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).toBeDisabled();
  });

  it ('submit button is enabled when rooms are selected', async () => {
    retrieveAvailableHotelRooms.mockResolvedValueOnce(mockAvailableRoomsData);
    retrieveStaticHotelDetailByHotelID.mockResolvedValueOnce({ data: mockHotelData });
  
    sessionStorage.setItem('homeForm', JSON.stringify({ countryUID: 'SG', checkin: '2024-07-01', checkout: '2024-07-07', parent: 2, children: 1, rooms: 1 }));
  
    useLoadScript.mockReturnValue({
      isLoaded: true,
      loadError: null,
    });
  
    render(
      <Router>
        <ViewHotelDetails />
      </Router>
    );
  
    await waitFor(() => expect(screen.getByText(/Test Hotel/i)).toBeInTheDocument());
    const incrementButtons = screen.getAllByText('+');
    fireEvent.click(incrementButtons[0]);
    
    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).toBeEnabled();
  });
});


describe('ViewHotelDetails component - Integration testing', () => {
  it('handles submit button and nav to BookingPageLoggedIn', async () => {
    retrieveAvailableHotelRooms.mockResolvedValueOnce(mockAvailableRoomsData);
    retrieveStaticHotelDetailByHotelID.mockResolvedValueOnce({ data: mockHotelData });
  
    sessionStorage.setItem('homeForm', JSON.stringify({
      countryUID: 'SG',
      checkin: '2024-07-01',
      checkout: '2024-07-07',
      parent: 2,
      children: 1,
      rooms: 1
    }));
  
    useLoadScript.mockReturnValue({
      isLoaded: true,
      loadError: null,
    });
  
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
  
    const bookingForm = JSON.parse(sessionStorage.getItem('bookingForm'));
    console.log('Stored booking form:', bookingForm);
    expect(bookingForm).toMatchObject({
      hotelId: '123',
      roomBooking: [{ key: 'deluxe', roomOrder: 1, price: 100, description: 'A deluxe room', breakfastInfo: 'Breakfast included' }],
    });
  });  
});