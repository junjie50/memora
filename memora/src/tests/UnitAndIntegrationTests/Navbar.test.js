import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import * as LoginForm from '../../services/LoginForm';

jest.mock('../../services/LoginForm');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Navbar component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });


    test('renders navbar elements', () => {
        LoginForm.useCheckAuthentication.mockReturnValue({ user: null, authenticated: false });
        
        render(
            <Router>
                <Navbar />
            </Router>
        );

        expect(screen.getByAltText(/Logo/i)).toBeInTheDocument();
        expect(screen.getByText(/Recommendation/i)).toBeInTheDocument();
        expect(screen.getByText(/Your Bookings/i)).toBeInTheDocument();
        expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
    });


    test('displays user picture when authenticated', () => {
        LoginForm.useCheckAuthentication.mockReturnValue({ user: { username: 'testuser' }, authenticated: true });
        
        render(
            <Router>
                <Navbar />
            </Router>
        );

        expect(screen.getByAltText(/User/i)).toBeInTheDocument(); //alt="User" after {authenticated && user
        expect(screen.queryByText(/Login/i)).not.toBeInTheDocument(); //no more login button
    });


    test('navigates to login page when Login button is clicked', () => {
        LoginForm.useCheckAuthentication.mockReturnValue({ user: null, authenticated: false });
        
        render(
            <Router>
                <Navbar />
            </Router>
        );

        fireEvent.click(screen.getByText(/Login/i));
        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });


    test('navigates to updateProfilePage when clicked profile picture', () => {
        LoginForm.useCheckAuthentication.mockReturnValue({ user: { username: 'testuser' }, authenticated: true });
        
        render(
            <Router>
                <Navbar />
            </Router>
        );

        fireEvent.click(screen.getByAltText(/User/i));
        expect(mockNavigate).toHaveBeenCalledWith("/updateProfilePage");
    });
});

/*
under Memora:
npx jest src/tests/UnitAndIntegrationTests/Navbar.test.js

*/