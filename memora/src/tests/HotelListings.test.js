import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HotelListings from '../pages/HotelListings';
import { 
  retrieveAvailableHotels, 
  retrieveHotelsByDestinationID, 
  retrieveStaticHotelDetailByHotelID, 
  retrieveAvailableHotelRooms 
} from '../services/ascenda-api.js';

jest.mock('../services/ascenda-api.js', () => ({
  retrieveAvailableHotels: jest.fn(),
  retrieveHotelsByDestinationID: jest.fn(),
  retrieveStaticHotelDetailByHotelID: jest.fn(),
  retrieveAvailableHotelRooms: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: {
      selectedCountry: 'Singapore',
      countryUID: 'SG',
      checkin: '2024-07-01',
      checkout: '2024-07-07',
      parent: 2,
      children: 1,
      rooms: 1,
      hotelDuration: 6,
      guests: 3,
    }
  }),
}));

beforeEach(() => {
  mockNavigate.mockReset();
  sessionStorage.clear();
});

describe('HotelListings component', () => {
  const mockHotelPricesData = {
    data: {
      hotels: [
        { id: '1', price: 600, name: 'Hotel One', rating: 4.5 },
        { id: '2', price: 300, name: 'Hotel Two', rating: 3.5 },
        { id: '3', price: 0, name: 'Hotel Three', rating: 4.0 }
      ]
    }
  };

  const mockHotelDetailsData = {
    data: [
      { id: '1', name: 'Hotel One', description: 'Description One', rating: 4.5, trustyou: { score: { overall: 85 } } },
      { id: '2', name: 'Hotel Two', description: 'Description Two', rating: 3.5, trustyou: { score: { overall: 75 } } }
    ]
  };

  const mockAvailableRoomsData = {
    data: {
      rooms: [
        { id: '101', name: 'Standard Room', price: 200 },
        { id: '102', name: 'Deluxe Room', price: 300 }
      ]
    }
  };

  const mockStaticHotelDetailData = {
    id: '1',
    name: 'Hotel One',
    description: 'Description One',
    rating: 4.5,
    trustyou: { score: { overall: 85 } }
  };

  it('renders loading state initially', () => {
    render(
      <Router>
        <HotelListings />
      </Router>
    );

    expect(screen.getByText(/Fetching all available hotels... This may take up to 30seconds./i)).toBeInTheDocument();
  });

  it('fetches and displays hotels', async () => {
    retrieveAvailableHotels.mockResolvedValueOnce(mockHotelPricesData);
    retrieveHotelsByDestinationID.mockResolvedValueOnce(mockHotelDetailsData);

    await act(async () => {
      render(
        <Router>
          <HotelListings />
        </Router>
      );
    });

    await waitFor(() => expect(retrieveAvailableHotels).toHaveBeenCalled());
    await waitFor(() => expect(retrieveHotelsByDestinationID).toHaveBeenCalled());

    expect(screen.getByText(/Hotel One/i)).toBeInTheDocument();
    expect(screen.getByText(/Hotel Two/i)).toBeInTheDocument();
    expect(screen.queryByText(/Hotel Three/i)).toBeNull(); // Hotel Three should be filtered out due to price 0
  });

  it('filters hotels by price range', async () => {
    retrieveAvailableHotels.mockResolvedValueOnce(mockHotelPricesData);
    retrieveHotelsByDestinationID.mockResolvedValueOnce(mockHotelDetailsData);

    await act(async () => {
      render(
        <Router>
          <HotelListings />
        </Router>
      );
    });

    await waitFor(() => expect(screen.getByText(/Hotel One/i)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/Price Range/i), { target: { value: 200 } });
    fireEvent.click(screen.getByText(/Search/i));

    await waitFor(() => {
      expect(screen.queryByText(/Hotel One/i)).toBeNull();
      expect(screen.getByText(/Hotel Two/i)).toBeInTheDocument();
    });
  });

  it('sorts hotels by guest rating', async () => {
    retrieveAvailableHotels.mockResolvedValueOnce(mockHotelPricesData);
    retrieveHotelsByDestinationID.mockResolvedValueOnce(mockHotelDetailsData);

    await act(async () => {
      render(
        <Router>
          <HotelListings />
        </Router>
      );
    });

    await waitFor(() => expect(screen.getByText(/Hotel One/i)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/Sort by/i), { target: { value: 'guest-rating' } });

    await waitFor(() => {
      const hotelNames = screen.getAllByRole('heading', { level: 3 });
      expect(hotelNames[0]).toHaveTextContent('Hotel One');
      expect(hotelNames[1]).toHaveTextContent('Hotel Two');
    });
  });

  it('paginates hotel listings', async () => {
    const manyHotels = Array.from({ length: 20 }, (_, index) => ({
      id: String(index + 1),
      price: 100 + index,
      name: `Hotel ${index + 1}`,
      rating: 3.5 + (index % 5) / 10,
    }));

    retrieveAvailableHotels.mockResolvedValueOnce({ data: { hotels: manyHotels } });
    retrieveHotelsByDestinationID.mockResolvedValueOnce({ data: manyHotels.map(hotel => ({ ...hotel, description: `Description ${hotel.id}` })) });

    await act(async () => {
      render(
        <Router>
          <HotelListings />
        </Router>
      );
    });

    await waitFor(() => expect(screen.getByText(/Hotel 1/i)).toBeInTheDocument());

    fireEvent.click(screen.getByText(/Next/i));

    await waitFor(() => {
      expect(screen.queryByText(/Hotel 1/i)).toBeNull();
      expect(screen.getByText(/Hotel 11/i)).toBeInTheDocument();
    });
  });

  it('navigates to hotel details on click', async () => {
    retrieveAvailableHotels.mockResolvedValueOnce(mockHotelPricesData);
    retrieveHotelsByDestinationID.mockResolvedValueOnce(mockHotelDetailsData);

    await act(async () => {
      render(
        <Router>
          <HotelListings />
        </Router>
      );
    });

    await waitFor(() => expect(screen.getByText(/Hotel One/i)).toBeInTheDocument());

    const buttons = screen.getAllByText(/See more details/i);
    fireEvent.click(buttons[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/ViewHotelDetails/1');
  });
});