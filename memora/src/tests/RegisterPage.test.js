import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage.js';
import {
    submitMemberDetails,
    validateMemberDetails,
    validationFailed,
    displaySuccessfulMessage,
    displayUnsuccessfulMessage
} from '../services/RegistrationForm.js';

jest.mock('../services/RegistrationForm.js', () => ({
    submitMemberDetails: jest.fn(),
    validateMemberDetails: jest.fn(),
    validationFailed: jest.fn(),
    displaySuccessfulMessage: jest.fn(),
    displayUnsuccessfulMessage: jest.fn()
}));


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

beforeEach(() => {
    mockNavigate.mockReset();
    sessionStorage.clear();
});

  
describe('RegisterPage component', () => {
    it('Renders the registration form', () => {
        render(
            <Router>
                <RegisterPage />
            </Router>
        );

        expect(screen.getByTestId("title")).toBeInTheDocument();
        expect(screen.getByTestId("firstName")).toBeInTheDocument();
        expect(screen.getByTestId("lastName")).toBeInTheDocument();
        expect(screen.getByTestId("username")).toBeInTheDocument();
        expect(screen.getByTestId("address")).toBeInTheDocument();
        expect(screen.getByTestId("phoneNumber")).toBeInTheDocument();
        expect(screen.getByTestId("email")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();

        expect(screen.getByText(/I confirm that I am over the age of 21./i)).toBeInTheDocument();
        expect(screen.getByText(/I have read and agree to Memora's Terms of Use and Privacy Policy./i)).toBeInTheDocument();
        expect(screen.getByText(/Register/i)).toBeInTheDocument();
    });


    it('validates the registration data correctly', async () => {
        const mockRegisterData = {
          title: 'Mrs',
          firstName: 'Dor',
          lastName: 'Wang',
          username: 'doris11',
          address: 'upper changi',
          phoneNumber: '123454221',
          email: 'doris.doe@example.com',
          password: '123456'
        };
    
        // const isValid = validateMemberDetails(mockRegisterData);
        // expect(isValid).toBe(true);
        await waitFor(() => expect(validateMemberDetails(mockRegisterData)).toHaveBeenCalled());

    });

    it('validates the registration data correctly', async () => {
        const mockRegisterData = {
            title: 'Mrs',
            firstName: 'Dor',
            lastName: 'Wang',
            username: 'doris11',
            address: 'upper changi',
            phoneNumber: '123454221',
            email: 'doris.doe@example.com',
            password: '123456'
        };

        validateMemberDetails.mockReturnValue(true);

        render(
            <Router>
                <RegisterPage />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: mockRegisterData.title } });
        fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: mockRegisterData.firstName } });
        fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: mockRegisterData.lastName } });
        fireEvent.change(screen.getByPlaceholderText(/Your Phone Number/i), { target: { value: mockRegisterData.phoneNumber } });
        fireEvent.change(screen.getByPlaceholderText(/Your Email Address/i), { target: { value: mockRegisterData.email } });
        fireEvent.change(screen.getByPlaceholderText(/Your Password/i), { target: { value: mockRegisterData.password } });
        fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: mockRegisterData.username } });
        fireEvent.change(screen.getByPlaceholderText(/Your Address/i), { target: { value: mockRegisterData.address } });
        fireEvent.click(screen.getByText(/I confirm that I am over the age of 21./i));
        fireEvent.click(screen.getByText(/I have read and agree to Memora's Terms of Use and Privacy Policy./i));

        fireEvent.click(screen.getByText(/Register/i));

        await waitFor(() => {
            expect(validateMemberDetails).toHaveBeenCalled();
            expect(validateMemberDetails).toHaveBeenCalledWith(mockRegisterData);
        });
    });

    // it('returns false for incomplete registration data', async () => {
    //     const incompleteData = {
    //         firstName: 'Dor',
    //         lastName: 'Wang',
    //         username: '',
    //         address: 'upper changi',
    //         phoneNumber: '123454221',
    //         email: 'doris.doe@example.com',
    //         password: '123456'
    //     };

    //     validateMemberDetails.mockReturnValue(false);

    //     render(
    //         <Router>
    //             <RegisterPage />
    //         </Router>
    //     );

    //     fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: incompleteData.firstName } });
    //     fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: incompleteData.lastName } });
    //     fireEvent.change(screen.getByPlaceholderText(/Your Phone Number/i), { target: { value: incompleteData.phoneNumber } });
    //     fireEvent.change(screen.getByPlaceholderText(/Your Email Address/i), { target: { value: incompleteData.email } });
    //     fireEvent.change(screen.getByPlaceholderText(/Your Password/i), { target: { value: incompleteData.password } });
    //     fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: incompleteData.username } });
    //     fireEvent.change(screen.getByPlaceholderText(/Your Address/i), { target: { value: incompleteData.address } });
    //     fireEvent.click(screen.getByText(/I confirm that I am over the age of 21./i));
    //     fireEvent.click(screen.getByText(/I have read and agree to Memora's Terms of Use and Privacy Policy./i));

    //     fireEvent.click(screen.getByText(/Register/i));

    //     await waitFor(() => {
    //         expect(validateMemberDetails).toHaveBeenCalled();
    //         expect(validateMemberDetails).toHaveBeenCalledWith(incompleteData);
    //     });
    // });
});


// npx jest src/tests/RegisterPage.test.js