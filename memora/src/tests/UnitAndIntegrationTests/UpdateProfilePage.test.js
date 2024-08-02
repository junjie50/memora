import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UpdateProfilePage from '../../pages/UpdateProfilePage';
import * as AccountUpdateForm from '../../services/AccountUpdateForm';
import * as LoginForm from '../../services/LoginForm';

jest.mock('../../services/AccountUpdateForm');
jest.mock('../../services/LoginForm');
jest.mock('../../components/Navbar', () => () => <div data-testid="navbar-mock" />); //for testing replace navbar div with this

jest.mock('../../services/LoginForm', () => ({
    ...jest.requireActual('../../services/LoginForm'),
    useCheckAuthentication: () => ({ user: { username: 'testuser' }, authenticated: true }),
    getCookie: jest.fn().mockReturnValue('mock-token'),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
    useLocation: () => ({ state: { from: '/' } }),
}));

describe('UpdateProfilePage', () => {
    const mockMemberInfo = {
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        address: '123 Main St',
        phoneNumber: '1234567890',
        email: 'john@example.com',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        AccountUpdateForm.fetchMemberInfo.mockResolvedValue(mockMemberInfo);
        window.alert = jest.fn(); //important
        // LoginForm.useCheckAuthentication.mockReturnValue({ user: { username: 'testuser' }, authenticated: true });
    });

    test('renders member s profile with mocked member info', async () => {
        render(
            <Router>
                <UpdateProfilePage />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByDisplayValue('Mr')).toBeInTheDocument();
            expect(screen.getByDisplayValue('John')).toBeInTheDocument();
            expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
            expect(screen.getByDisplayValue('johndoe')).toBeInTheDocument();
            expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument();
            expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
            expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
        });
    });

    test('handles profilePage update successfully', async () => {
        AccountUpdateForm.submitUpdatedDetails.mockResolvedValue({});

        render(
            <Router>
                <UpdateProfilePage />
            </Router>
        );

        // Wait for component updated with mocked member info (important!!)
        await waitFor(() => {
            expect(screen.getByDisplayValue('John')).toBeInTheDocument();
        });    

        await act(async () => {
            // fireEvent.change(screen.getByPlaceholderText('New Password'), { target: { value: 'newpassword' } });
            fireEvent.click(screen.getByText('Update Profile'));
        });

        await waitFor(() => {
            expect(AccountUpdateForm.submitUpdatedDetails).toHaveBeenCalledWith(
                'testuser',
                'mock-token',
                expect.objectContaining({
                    ...mockMemberInfo,
                })
            );
            expect(window.alert).toHaveBeenCalledWith('Profile updated successfully');
        });
    });

    test('handles profilePage update failure', async () => {
        AccountUpdateForm.submitUpdatedDetails.mockRejectedValue(new Error('Update failed'));

        render(
            <Router>
                <UpdateProfilePage />
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(screen.getByText('Update Profile'));
        });

        await waitFor(() => {
            // expect(screen.getByText('Failed to update profile')).toBeInTheDocument();
            expect(window.alert).toHaveBeenCalledWith('Failed to update profile');
        });
    });

    test('handles account delete', async () => {
        window.confirm = jest.fn(() => true);
        AccountUpdateForm.deleteAccount.mockResolvedValue({});
        // window.alert = jest.fn();

        render(
            <Router>
                <UpdateProfilePage />
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(screen.getByText('Delete Account'));
        });

        await waitFor(() => {
            expect(AccountUpdateForm.deleteAccount).toHaveBeenCalledWith('testuser','mock-token');
            // expect(screen.getByText('Account deleted successfully')).toBeInTheDocument();
            expect(window.alert).toHaveBeenCalledWith('Account deleted successfully');
        });
    });

    test('handles account deletion cancellation', async () => {
        window.confirm = jest.fn(() => false); //mock window.confirm, returns false (from handleDeleteAccountClick)

        render(
            <Router>
                <UpdateProfilePage />
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(screen.getByText('Delete Account'));
        });

        expect(AccountUpdateForm.deleteAccount).not.toHaveBeenCalled(); //check deleteAccount is not called
    });

    test('handles account deletion failure', async () => {
        window.confirm = jest.fn(() => true);
        AccountUpdateForm.deleteAccount.mockRejectedValue(new Error('Deletion failed'));

        await act(async () => {
            //act: ensures that all updates related to rendering, state changes, or effects have been processed (completed) before moving to the next assertion. 
            render(
                <Router>
                    <UpdateProfilePage />
                </Router>
            );
        });

        await waitFor(() => { //mock throw error, wait for alert('Failed to delete account');
            fireEvent.click(screen.getByText('Delete Account'));
        });

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Failed to delete account');
        });
    });
});