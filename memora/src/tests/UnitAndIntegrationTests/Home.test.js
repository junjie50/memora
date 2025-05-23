import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import Home from '../../pages/Home';
import CountrySelect from '../../components/Autocomplete';
import axios from 'axios';
import mockAxios from 'jest-mock-axios';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useNavigate: jest.fn(), 
  }));

jest.mock('../../components/Autocomplete', () => {
  return function MockCountrySelect({ onCountrySelect }) {
    return (
      <div>
        <input
          role="combobox"
          aria-label="Country select"
          onChange={(e) => onCountrySelect('country-uid', e.target.value)}
        />
        <div role="listbox">
          <div role="option" onClick={() => onCountrySelect('country-uid', 'Japan')}>
            Japan
          </div>
          <div role="option" onClick={() => onCountrySelect('country-uid', 'Singapore')}>
            Singapore
          </div>
        </div>
      </div>
    );
  };
});

const mockOnCountrySelect = jest.fn();

describe('Home component functions - Unit tests', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockImplementation(() => mockNavigate);
  });

  afterEach(() => {
    mockNavigate.mockReset();
    mockAxios.reset();
  });
  
  it('handles selecting a country', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const countrySelectInput = screen.getByRole('combobox', { name: /Country select/i });
    fireEvent.change(countrySelectInput, { target: { value: 'Japan' } });

    const countryOption = screen.getByRole('option', { name: /Japan/i });
    fireEvent.click(countryOption);

    expect(countrySelectInput.value).toBe('Japan');
  });

  it('filters country options based on user input', () => {
    render(<CountrySelect onCountrySelect={mockOnCountrySelect} />);
  
    const input = screen.getByLabelText(/Country select/i);
    fireEvent.change(input, { target: { value: 'J' } });
  
    expect(screen.getByText(/Japan/i)).toBeInTheDocument();
  });

  it('allows keyboard navigation and selection', () => {
    render(<CountrySelect onCountrySelect={mockOnCountrySelect} />);
  
    const input = screen.getByLabelText(/Country Select/i);
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Japan' } });
  
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
  
    expect(mockOnCountrySelect).toHaveBeenCalledWith('country-uid', 'Japan');
  });
  
  it('increments and decrements the number of adults', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const personButton = screen.getByText(/person/i);
    fireEvent.click(personButton);

    const addAdultButton = screen.getAllByText(/plus/i)[0]; // initial value is 2
    fireEvent.click(addAdultButton);
    const adultCount = screen.getByTestId('adult-count');
    expect(adultCount).toHaveTextContent('3');

    const minusAdultButton = screen.getAllByText(/minus/i)[0];
    fireEvent.click(minusAdultButton);
    fireEvent.click(minusAdultButton);
    expect(adultCount).toHaveTextContent('1');
  });

  it('prevents decrementing adults below 1', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const personButton = screen.getByText(/person/i);
    fireEvent.click(personButton);

    const minusAdultButton = screen.getAllByText(/minus/i)[0];
    fireEvent.click(minusAdultButton);
    fireEvent.click(minusAdultButton);
    fireEvent.click(minusAdultButton);

    const adultCount = screen.getByTestId('adult-count');
    expect(adultCount).toHaveTextContent('1'); // minimum 1
  });

  it('prevents incrementing adults above 20', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const personButton = screen.getByText(/person/i);
    fireEvent.click(personButton);

    const addAdultButton = screen.getAllByText(/plus/i)[0];
    for (let i = 0; i < 20; i++) {
      fireEvent.click(addAdultButton);
    }

    const adultCount = screen.getByTestId('adult-count');
    expect(adultCount).toHaveTextContent('20');
  });

  it('increments and decrements the number of children', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const personButton = screen.getByText(/person/i);
    fireEvent.click(personButton);

    const addChildButton = screen.getAllByText(/plus/i)[1];// Initial value is 1
    fireEvent.click(addChildButton);
    const childrenCount = screen.getByTestId('children-count');
    expect(childrenCount).toHaveTextContent('2');

    const minusChildButton = screen.getAllByText(/minus/i)[1];
    fireEvent.click(minusChildButton);
    fireEvent.click(minusChildButton);
    expect(childrenCount).toHaveTextContent('0');
  });

  it('prevents decrementing children below 0', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const personButton = screen.getByText(/person/i);
    fireEvent.click(personButton);

    const minusChildButton = screen.getAllByText(/minus/i)[1];
    fireEvent.click(minusChildButton);
    fireEvent.click(minusChildButton);

    const childrenCount = screen.getByTestId('children-count');
    expect(childrenCount).toHaveTextContent('0');
  });

  it('prevents incrementing children above 20', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const personButton = screen.getByText(/person/i);
    fireEvent.click(personButton);

    const addChildButton = screen.getAllByText(/plus/i)[1];
    for (let i = 0; i < 20; i++) {
      fireEvent.click(addChildButton);
    }

    const childrenCount = screen.getByTestId('children-count');
    expect(childrenCount).toHaveTextContent('20');
  });

  it('increments and decrements the number of rooms', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const personButton = screen.getByText(/person/i);
    fireEvent.click(personButton);

    const addRoomButton = screen.getAllByText(/plus/i)[2]; // Initial value is 1
    fireEvent.click(addRoomButton);
    const roomCount = screen.getByTestId('room-count');
    expect(roomCount).toHaveTextContent('2');

    const minusRoomButton = screen.getAllByText(/minus/i)[2];
    fireEvent.click(minusRoomButton);
    fireEvent.click(minusRoomButton);
    expect(roomCount).toHaveTextContent('1');
  });

  it('prevents decrementing rooms below 1', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const personButton = screen.getByText(/person/i);
    fireEvent.click(personButton);

    const minusRoomButton = screen.getAllByText(/minus/i)[2];
    for (let i = 0; i < 2; i++) {
      fireEvent.click(minusRoomButton);
    }

    const roomCount = screen.getByTestId('room-count');
    expect(roomCount).toHaveTextContent('1');
  });

  it('updates check-in date', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const checkinInput = screen.getByLabelText(/checkin/i);
    fireEvent.change(checkinInput, { target: { value: '2024-07-06' } });
    expect(checkinInput.value).toBe('2024-07-06');
  });

  it('updates check-out date', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const checkoutInput = screen.getByLabelText(/checkout/i);
    fireEvent.change(checkoutInput, { target: { value: '2024-07-07' } });
    expect(checkoutInput.value).toBe('2024-07-07');
  });
});

describe('Home component - Integration tests', () => {
  it('handles search button click with valid inputs', () => {
    const mockNavigate = useNavigate();

    render(
      <Router>
        <Home />
      </Router>
    );

    const countrySelectInput = screen.getByRole('combobox', { name: /Country select/i });
    fireEvent.change(countrySelectInput, { target: { value: 'Japan' } });
    const countryOption = screen.getByRole('option', { name: /Japan/i });
    fireEvent.click(countryOption);

    const checkinInput = screen.getByLabelText(/checkin/i);
    fireEvent.change(checkinInput, { target: { value: '2024-08-13' } });
    const checkoutInput = screen.getByLabelText(/checkout/i);
    fireEvent.change(checkoutInput, { target: { value: '2024-08-16' } });

    const searchButton = screen.getByText(/search/i);
    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith('/hotelListings', {
      state: expect.objectContaining({
        checkin: '2024-08-13',
        checkout: '2024-08-16',
        parent: 2,
        children: 1,
        countryUID: 'country-uid',
        selectedCountry: 'Japan',
        rooms: 1,
        hotelDuration: 3,
      }),
    });
  });

  it('displays an error message if either dates are not selected', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const countrySelectInput = screen.getByRole('combobox', { name: /Country select/i });
    fireEvent.change(countrySelectInput, { target: { value: 'Japan' } });
    const countryOption = screen.getByRole('option', { name: /Japan/i });
    fireEvent.click(countryOption);

    const checkinInput = screen.getByLabelText(/checkin/i);
    fireEvent.change(checkinInput, { target: { value: '2024-07-10' } });

    //checkout not selected
  
    const searchButton = screen.getByText(/search/i);
    fireEvent.click(searchButton);
  
    const errorMessage = screen.getByText(/All fields must be filled in/i);
    expect(errorMessage).toBeInTheDocument();
  });
  
  it('displays an error message if country is not selected', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
  
    // Set valid checkin and checkout dates but do not select a country
    const checkinInput = screen.getByLabelText(/checkin/i);
    const checkoutInput = screen.getByLabelText(/checkout/i);
    fireEvent.change(checkinInput, { target: { value: '2024-07-10' } });
    fireEvent.change(checkoutInput, { target: { value: '2024-07-15' } });
  
    const searchButton = screen.getByText(/search/i);
    fireEvent.click(searchButton);
  
    const errorMessage = screen.getByText(/All fields must be filled in/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays an error when check-in and check-out dates are the same', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
  
    const countrySelectInput = screen.getByRole('combobox', { name: /Country select/i });
    fireEvent.change(countrySelectInput, { target: { value: 'Japan' } });
    const countryOption = screen.getByRole('option', { name: /Japan/i });
    fireEvent.click(countryOption);
  
    const checkinInput = screen.getByLabelText(/checkin/i);
    const checkoutInput = screen.getByLabelText(/checkout/i);
    fireEvent.change(checkinInput, { target: { value: '2024-07-10' } });
    fireEvent.change(checkoutInput, { target: { value: '2024-07-10' } });
  
    const searchButton = screen.getByText(/search/i);
    fireEvent.click(searchButton);
  
    expect(screen.getByText(/Check-out date must be after check-in date/i)).toBeInTheDocument();
  });

  it('displays an error when checkin date is after checkout date', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
  
    const countrySelectInput = screen.getByRole('combobox', { name: /Country select/i });
    fireEvent.change(countrySelectInput, { target: { value: 'Japan' } });
    const countryOption = screen.getByRole('option', { name: /Japan/i });
    fireEvent.click(countryOption);
  
    const checkinInput = screen.getByLabelText(/checkin/i);
    const checkoutInput = screen.getByLabelText(/checkout/i);
    fireEvent.change(checkinInput, { target: { value: '2024-07-05' } });
    fireEvent.change(checkoutInput, { target: { value: '2024-07-01' } });
  
    const searchButton = screen.getByText(/search/i);
    fireEvent.click(searchButton);
  
    expect(screen.getByText(/Check-out date must be after check-in date/i)).toBeInTheDocument();
  });

  it('displays an error for past dates', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
  
    const countrySelectInput = screen.getByRole('combobox', { name: /Country select/i });
    fireEvent.change(countrySelectInput, { target: { value: 'Japan' } });
    const countryOption = screen.getByRole('option', { name: /Japan/i });
    fireEvent.click(countryOption);
  
    const checkinInput = screen.getByLabelText(/checkin/i);
    const checkoutInput = screen.getByLabelText(/checkout/i);
    fireEvent.change(checkinInput, { target: { value: '2023-07-01' } });
    fireEvent.change(checkoutInput, { target: { value: '2023-07-02' } });
  
    const searchButton = screen.getByText(/search/i);
    fireEvent.click(searchButton);
  
    expect(screen.getByText(/Dates cannot be earlier than the current date/i)).toBeInTheDocument();
  });
});