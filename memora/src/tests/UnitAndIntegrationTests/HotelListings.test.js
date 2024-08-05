import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import HotelListings, { HotelCard, FilterSection, Pagination, SortOptions } from '../../pages/HotelListings';
import ViewHotelDetails from '../../pages/ViewHotelDetails';
import { retrieveAvailableHotels, retrieveHotelsByDestinationID, retrieveStaticHotelDetailByHotelID, retrieveAvailableHotelRooms } from '../../services/ascenda-api.js';
import '@testing-library/jest-dom';

jest.mock('../../services/ascenda-api.js');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const initialEntries = [
  {
    pathname: '/hotellistings',
    state: {
      selectedCountry: 'Japan',
      countryUID: 'fRZM',
      checkin: '2024-10-01',
      checkout: '2024-10-10',
      parent: 2,
      children: 1,
      rooms: 1,
      hotelDuration: 9,
      guests: 3,
    },
  },
];

describe('Unit Tests for HotelListings Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    sessionStorage.clear();
  });

  // FilterSection Component Tests
  test('changes star rating when a star is selected', () => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <HotelListings />
      </MemoryRouter>
    );

    const checkbox = screen.getByLabelText('★★★★☆ 4 Star');
    fireEvent.click(checkbox);
    expect(screen.getByLabelText('★★★★☆ 4 Star').checked).toBe(true);
  });

  test('changes price range when the range slider is moved', () => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <HotelListings />
      </MemoryRouter>
    );

    const slider = screen.getByLabelText('Price Range');
    fireEvent.change(slider, { target: { value: 500 } });
    expect(slider.value).toBe("500");
  });

  test('calls the search function when the search button is clicked', () => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <HotelListings />
      </MemoryRouter>
    );

    const button = screen.getByText('Search');
    fireEvent.click(button);
    // Assuming the default state of filteredHotels would be set to some value after clicking search
    waitFor(() => {
      expect(screen.queryByText('Hotel One')).not.toBeInTheDocument();
    });
  });

  // SortOptions Component Tests
  test('changes sort criteria when a new option is selected', () => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <HotelListings />
      </MemoryRouter>
    );

    const select = screen.getByLabelText(/Sort by:/i);
    fireEvent.change(select, { target: { value: 'price-low-to-high' } });
    expect(select.value).toBe('price-low-to-high');
  });


  // Pagination Component Tests
  test('calls handlePaginationClick when next button is clicked', async () => {
    retrieveAvailableHotels.mockResolvedValue({
      data: {
        hotels: Array.from({ length: 21 }, (_, i) => ({
          id: i + 1,
          price: (i + 1) * 100,
          rating: (i % 5) + 1,
          name: `Hotel ${i + 1}`,
          trustyou: { score: { overall: 85 } },
          description: `Description for hotel ${i + 1}`,
          image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '0' },
        })),
      },
    });
  
    retrieveHotelsByDestinationID.mockResolvedValue({
      data: Array.from({ length: 21 }, (_, i) => ({
        id: i + 1,
        description: `Full description for hotel ${i + 1}`,
        image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '0' },
      })),
    });
  
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <HotelListings />
      </MemoryRouter>
    );
  
    await waitFor(() => expect(retrieveAvailableHotels).toHaveBeenCalled());
    await waitFor(() => expect(retrieveHotelsByDestinationID).toHaveBeenCalled());
  
    // Assuming initial page is 1
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
  
    // Check if the page number 2 is now active
    await waitFor(() => {
      const activePageButton = screen.getByRole('button', { name: '2' });
      expect(activePageButton).toHaveClass('active');
    });
  });

  test('calls handlePaginationClick when previous button is clicked', async () => {
    // Mock data setup for hotels
    retrieveAvailableHotels.mockResolvedValue({
      data: {
        hotels: Array.from({ length: 21 }, (_, i) => ({
          id: i + 1,
          price: (i + 1) * 100,
          rating: (i % 5) + 1,
          name: `Hotel ${i + 1}`,
          trustyou: { score: { overall: 85 } },
          description: `Description for hotel ${i + 1}`,
          image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '0' },
        })),
      },
    });
  
    retrieveHotelsByDestinationID.mockResolvedValue({
      data: Array.from({ length: 21 }, (_, i) => ({
        id: i + 1,
        description: `Full description for hotel ${i + 1}`,
        image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '0' },
      })),
    });
  
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <HotelListings />
      </MemoryRouter>
    );
  
    // Wait for the mock data to be called
    await waitFor(() => expect(retrieveAvailableHotels).toHaveBeenCalled());
    await waitFor(() => expect(retrieveHotelsByDestinationID).toHaveBeenCalled());
  
    // Initially, check if the previous button is disabled on the first page
    await waitFor(() => {
      expect(screen.getByText(/Prev/i)).toBeDisabled();
    });
  
    // Click the next button to navigate to the next page
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
  
    // Wait for the next page to be active
    await waitFor(() => {
      const activePageButton = screen.getByRole('button', { name: '2' });
      expect(activePageButton).toHaveClass('active');
    });
  
    // Click the previous button to navigate back to the previous page
    const prevButton = screen.getByText(/Prev/i);
    fireEvent.click(prevButton);
  
    // Check if the page number 1 is now active again
    await waitFor(() => {
      const activePageButton = screen.getByRole('button', { name: '1' });
      expect(activePageButton).toHaveClass('active');
    });
  });

  test('calls handlePaginationClick when a specific page number is clicked', async () => {
    retrieveAvailableHotels.mockResolvedValue({
      data: {
        hotels: Array.from({ length: 21 }, (_, i) => ({
          id: i + 1,
          price: (i + 1) * 100,
          rating: (i % 5) + 1,
          name: `Hotel ${i + 1}`,
          trustyou: { score: { overall: 85 } },
          description: `Description for hotel ${i + 1}`,
          image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '0' },
          pricePerNight: ((i + 1) * 100 / initialEntries[0].state.hotelDuration).toFixed(2)
        }))
      }
    });
  
    retrieveHotelsByDestinationID.mockResolvedValue({
      data: Array.from({ length: 21 }, (_, i) => ({
        id: i + 1,
        description: `Full description for hotel ${i + 1}`,
        image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '0' }
      }))
    });
  
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <HotelListings />
      </MemoryRouter>
    );
  
    await waitFor(() => expect(retrieveAvailableHotels).toHaveBeenCalled());
    await waitFor(() => expect(retrieveHotelsByDestinationID).toHaveBeenCalled());
  
    // Click on the page 2 button
    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);
  
    // Assuming currentPage state would be updated
    await waitFor(() => {
      expect(screen.getByText('2')).toBeEnabled();
    });
  });

  // HotelCard Component Tests
  test('calls handleClick when the "See more details" button is clicked', () => {
    const handleSeeMoreDetails = jest.fn();
    const hotel = {
      id: 1,
      name: 'Test Hotel',
      rating: 4,
      price: 1800, // Total price for 9 nights
      trustyou: { score: { overall: 85 } },
      description: 'Test description',
      image_details: { prefix: 'http://example.com/', default_image_index: '0', suffix: '.jpg' },
      pricePerNight: (1800 / initialEntries[0].state.hotelDuration).toFixed(2)
    };

    render(
      <MemoryRouter initialEntries={initialEntries}>
        <HotelCard hotel={hotel} handleSeeMoreDetails={handleSeeMoreDetails} />
      </MemoryRouter>
    );

    const button = screen.getByText(/See more details/i);
    fireEvent.click(button);
    expect(handleSeeMoreDetails).toHaveBeenCalledWith(hotel.id);
  });


  // HotelListings Component Tests
  test('fetches and displays hotels correctly', async () => {
    retrieveAvailableHotels.mockResolvedValue({
      data: {
        hotels: [
          { id: '1', price: 5400, rating: 4.5, name: 'Hotel One', trustyou: { score: { overall: 90 } }, description: 'Description for hotel one', image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '1' }, pricePerNight: (5400 / initialEntries[0].state.hotelDuration).toFixed(2) },
          { id: '2', price: 7200, rating: 4.0, name: 'Hotel Two', trustyou: { score: { overall: 80 } }, description: 'Description for hotel two', image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '2' }, pricePerNight: (7200 / initialEntries[0].state.hotelDuration).toFixed(2) }
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

  // Test Filter by hotel price
  test('filters hotels by price', async () => {
    retrieveAvailableHotels.mockResolvedValue({
      data: {
        hotels: [
          { id: '1', price: 5400, rating: 5.0, name: 'Hotel One', trustyou: { score: { overall: 90 } }, description: 'Description for hotel one', image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '1' }, pricePerNight: (5400 / initialEntries[0].state.hotelDuration).toFixed(2) },
          { id: '2', price: 7200, rating: 4.0, name: 'Hotel Two', trustyou: { score: { overall: 80 } }, description: 'Description for hotel two', image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '2' }, pricePerNight: (7200 / initialEntries[0].state.hotelDuration).toFixed(2) }
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

    // Change price range to filter out more expensive hotels
    const priceRangeSlider = screen.getByLabelText('Price Range');
    fireEvent.change(priceRangeSlider, { target: { value: 600 } });

    // Click search button to apply the filter
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.queryByText('Hotel Two')).not.toBeInTheDocument();
      expect(screen.getByText('Hotel One')).toBeInTheDocument();
    });
  });

  // Test Filter by star rating
  test('filters hotels by star rating', async () => {
    retrieveAvailableHotels.mockResolvedValue({
      data: {
        hotels: [
          { id: '1', price: 5400, rating: 5.0, name: 'Hotel One', trustyou: { score: { overall: 90 } }, description: 'Description for hotel one', image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '1' }, pricePerNight: (5400 / initialEntries[0].state.hotelDuration).toFixed(2) },
          { id: '2', price: 7200, rating: 4.0, name: 'Hotel Two', trustyou: { score: { overall: 80 } }, description: 'Description for hotel two', image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '2' }, pricePerNight: (7200 / initialEntries[0].state.hotelDuration).toFixed(2) }
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
  
    fireEvent.click(screen.getByLabelText('★★★★☆ 4 Star'));
    fireEvent.click(screen.getByText('Search'));
  
    await waitFor(() => {
      expect(screen.queryByText('Hotel One')).not.toBeInTheDocument();
      expect(screen.getByText('Hotel Two')).toBeInTheDocument();
    });
  });

  //Test sessionStorage holds when navigating to ViewHotelDetails
  test('should store hotel data in sessionStorage when "See more details" button is clicked', async () => {
    // Set the mock implementation for useNavigate within this test
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    retrieveAvailableHotels.mockResolvedValue({
      data: {
        hotels: [
          {
            id: '1',
            price: 5400,
            rating: 4.5,
            name: 'Hotel One',
            trustyou: { score: { overall: 90 } },
            description: 'Description for hotel one',
            image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '1' },
            pricePerNight: (5400 / 9).toFixed(2) // Assuming a duration of 9 days
          },
          {
            id: '2',
            price: 7200,
            rating: 4.0,
            name: 'Hotel Two',
            trustyou: { score: { overall: 80 } },
            description: 'Description for hotel two',
            image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '2' },
            pricePerNight: (7200 / 9).toFixed(2)
          }
        ],
      },
    });

    retrieveHotelsByDestinationID.mockResolvedValue({
      data: [
        {
          id: '1',
          description: 'Full description for hotel one',
          image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '1' }
        },
        {
          id: '2',
          description: 'Full description for hotel two',
          image_details: { prefix: 'https://example.com/', suffix: '.jpg', default_image_index: '2' }
        }
      ],
    });

    // Spy on sessionStorage.setItem
    jest.spyOn(window.sessionStorage.__proto__, 'setItem');

    // Render component with mock data
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <HotelListings />
      </MemoryRouter>
    );

    await waitFor(() => expect(retrieveAvailableHotels).toHaveBeenCalled());
    await waitFor(() => expect(retrieveHotelsByDestinationID).toHaveBeenCalled());

    // Ensure hotels are rendered
    await waitFor(() => expect(screen.getByText('Hotel One')).toBeInTheDocument());

    // Click the "See more details" button for the first hotel
    const button = screen.getAllByText(/See more details/i)[0]; // Select the first hotel
    fireEvent.click(button);

    // Verify that sessionStorage is called with the correct data
    expect(sessionStorage.setItem).toHaveBeenCalledWith('hotelListingForm', JSON.stringify({ hotel_id: '1' }));

    // Verify that navigate was called with the correct arguments
    expect(mockNavigate).toHaveBeenCalledWith('/ViewHotelDetails/1', { state: { hotel_id: '1' } });
  });
});