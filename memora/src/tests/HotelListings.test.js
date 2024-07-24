import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HotelListings from '../pages/HotelListings'; // Adjust the import path if necessary
import { retrieveAvailableHotels, retrieveHotelsByDestinationID } from '../services/ascenda-api';
import '@testing-library/jest-dom';

jest.mock('../services/ascenda-api');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const initialEntries = [
  {
    pathname: '/hotellistings',
    state: {
      selectedCountry: 'Japan',
      countryUID: '123',
      checkin: '2024-10-01',
      checkout: '2024-10-10',
      parent: 2,
      children: 1,
      rooms: 1,
      hotelDuration: 6,
      guests: 3,
    },
  },
];

describe('HotelListings Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Test 1: Fetch Hotels & Display
  test('fetches and displays hotels correctly', async () => {
    retrieveAvailableHotels.mockResolvedValue({
      data: {
        hotels: [
          { id: '1', price: 600, rating: 4.5, name: 'Hotel One', trustyou: { score: { overall: 90 } }, description: 'Description for hotel one', image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '1' } },
          { id: '2', price: 800, rating: 4.0, name: 'Hotel Two', trustyou: { score: { overall: 80 } }, description: 'Description for hotel two', image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '2' } }
        ],
      },
    });

    retrieveHotelsByDestinationID.mockResolvedValue({
      data: [
        { id: '1', description: 'Full description for hotel one', image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '1' } },
        { id: '2', description: 'Full description for hotel two', image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '2' } }
      ],
    });

    render(
      <MemoryRouter initialEntries={initialEntries}>
        <HotelListings />
      </MemoryRouter>
    );

    await waitFor(() => expect(retrieveAvailableHotels).toHaveBeenCalled());
    await waitFor(() => expect(retrieveHotelsByDestinationID).toHaveBeenCalled());

    expect(screen.getByText('Hotel One')).toBeInTheDocument();
    expect(screen.getByText('Hotel Two')).toBeInTheDocument();
  });

  //Test 2: Filter by hotel price
  test('filters hotels by price', async () => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <HotelListings />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Hotel One')).toBeInTheDocument());

    // Debug: Check initial state and component before interaction
    console.log('Initial price range value:', screen.getByLabelText('Price Range').value);

    fireEvent.change(screen.getByLabelText('Price Range'), { target: { value: 100 } });

    // Debug: Check the state after changing the price range
    console.log('Updated price range value:', screen.getByLabelText('Price Range').value);

    fireEvent.click(screen.getByText('Search'));

    // Debug: Check the filtered hotels after clicking the search button
    await waitFor(() => {
      screen.debug();
      expect(screen.queryByText('Hotel Two')).not.toBeInTheDocument();
      expect(screen.getByText('Hotel One')).toBeInTheDocument();
    });
  });

// Test 3: Filter by star rating
test('filters hotels by star rating', async () => {
    retrieveAvailableHotels.mockResolvedValue({
      data: {
        hotels: [
          { id: '1', price: 600, rating: 5.0, name: 'Hotel One', trustyou: { score: { overall: 90 } }, description: 'Description for hotel one', image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '1' } },
          { id: '2', price: 800, rating: 4.0, name: 'Hotel Two', trustyou: { score: { overall: 80 } }, description: 'Description for hotel two', image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '2' } }
        ],
      },
    });

    retrieveHotelsByDestinationID.mockResolvedValue({
      data: [
        { id: '1', description: 'Full description for hotel one', image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '1' } },
        { id: '2', description: 'Full description for hotel two', image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '2' } }
      ],
    });

    render(
      <MemoryRouter initialEntries={initialEntries}>
        <HotelListings />
      </MemoryRouter>
    );

    await waitFor(() => expect(retrieveAvailableHotels).toHaveBeenCalled());
    await waitFor(() => expect(retrieveHotelsByDestinationID).toHaveBeenCalled());

    await waitFor(() => expect(screen.getByText('Hotel One')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Hotel Two')).toBeInTheDocument());

    // Debug: Print the current state of the DOM before applying the filter
    console.log('Before applying filter:');
    screen.debug();

    // Select 4-star rating filter
    fireEvent.click(screen.getByLabelText('★★★★☆ 4 Star'));
    fireEvent.click(screen.getByText('Search'));

    // Debug: Print the current state of the DOM after applying the filter
    console.log('After applying filter:');
    screen.debug();

    // Increase the timeout for waitFor
    await waitFor(
      () => {
        // Debug: Print the filtered hotels
        console.log('Filtered hotels:');
        screen.debug();

        expect(screen.getByText('Hotel Two')).toBeInTheDocument();
        expect(screen.queryByText('Hotel One')).not.toBeInTheDocument();
      },
      { timeout: 5000 } // Increase the timeout to 5 seconds
    );
  });
});