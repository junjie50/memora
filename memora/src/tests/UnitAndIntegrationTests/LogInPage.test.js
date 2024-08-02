// Import necessary functions and modules for testing
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LogInPage from '../../pages/LogInPage.js';
import axios from 'axios';
import {
  getCookie,
  submitLoginDetails,
  validateLoginDetails,
  displaySuccessfulMessage,
  displayUnsuccessfulMessage,
  useCheckAuthentication
} from '../../services/LoginForm.js';

const BASE_URL = 'https://memora-backend-2eebe428f36a.herokuapp.com';

// Mocking the axios module to control its behavior in testsjest.mock('axios');
jest.mock('axios');

test
describe('LogInPage', () => {
// Clear all mocks before each test to ensure no state is carried over
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(
      <Router>
        <LogInPage />
      </Router>
    );
    
    expect(screen.getByPlaceholderText(/Your Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Password/i)).toBeInTheDocument();
  });

  test('handles login successfully', async () => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UiLCJpZCI6IjY2OWFiMTM2YTZhMGFiYmVlNmZlODg2YyIsImlhdCI6MTcyMTYzMzc4NiwiZXhwIjoxNzIxNzIwMTg2fQ.bJLcsWdpKz9ocFcVryPfoOkeu7QqUONGT1PB_j6CDpY';
    const mockResponse = { data: { token: mockToken } };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(
      <Router>
        <LogInPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Your Username/i), { target: { value: 'mike' } });
    fireEvent.change(screen.getByPlaceholderText(/Your Password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByText(/Login/i, { selector: 'button.LILogIn' }));
    //// Wait for axios POST request to be called and verify it
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/api/users/login`, { username: 'mike', password: '123456' });

    // Check if the token is set in cookies and local storage
    expect(document.cookie).toContain(`token=${mockToken}`);
    expect(localStorage.getItem('token')).toBe(mockToken);
  });


  test('handles login failure', async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { message: 'Authentication failed' } } });

    render(
        <Router>
          <LogInPage />
        </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Your Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Your Password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText(/Login/i, { selector: 'button.LILogIn' }));
    await waitFor(() => 
      expect(screen.getByRole('alert')).toHaveTextContent(/Failed to retrieve from token/i)
    );
  });

  //unit tests added
  it('updates input according to user input', () => {
    render(
      <Router>
        <LogInPage />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText(/Your Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Your Password/i), { target: { value: 'password123' } });
    expect(screen.getByPlaceholderText(/Your Username/i).value).toBe('testuser');
    expect(screen.getByPlaceholderText(/Your Password/i).value).toBe('password123');
  });
  
});


/*
Run Specific Test (under memora/memora):
npx jest src/tests/LogInPage.test.js

Run All Test:
npx jest

After UnitAndIntegrationTests folder, under memora/memora
npx jest src/tests/UnitAndIntegrationTests/LogInPage.test.js



Test all things under UnitAndIntegrationTests folder:
npx jest src/tests/UnitAndIntegrationTests


*/



