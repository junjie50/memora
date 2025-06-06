import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterPage from '../../pages/RegisterPage.js';
import axios from 'axios';
import {
    submitMemberDetails,
    validateMemberDetails,
    validationFailed,
    displaySuccessfulMessage,
    displayUnsuccessfulMessage
} from '../../services/RegistrationForm.js';

jest.mock('axios');  // This will mock the axios module

jest.mock('../../services/RegistrationForm.js', () => ({
    submitMemberDetails: jest.fn(),
    validateMemberDetails: jest.fn(),
    validationFailed: jest.fn(),
    displaySuccessfulMessage: jest.fn(),
    displayUnsuccessfulMessage: jest.fn()
}));

const BASE_URL = 'https://memora-backend-2eebe428f36a.herokuapp.com';

const mockNavigate = jest.fn();

const mockRegisterData = {
    title: 'Mrs',
    firstName: 'Dor',
    lastName: 'Wang',
    username: 'doris11',
    address: 'upper changi',
    phoneNumber: '12345421',
    email: 'doris1.doee@example.com',
    password: '123456',
    over21: true,
    agreeToTerms: true
};

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

beforeEach(() => {
    mockNavigate.mockReset();
    sessionStorage.clear();
    jest.clearAllMocks(); // Clear all mock calls
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

    it('updates input according to customer input', () => {
        render(
            <Router>
                <RegisterPage />
            </Router>
        );

        fireEvent.change(screen.getByTestId("title"), { target: { value: 'Mrs' } });
        fireEvent.change(screen.getByTestId("firstName"), { target: { value: 'Dor' } });
        fireEvent.change(screen.getByTestId("lastName"), { target: { value: 'Wang' } });
        fireEvent.change(screen.getByTestId("username"), { target: { value: 'doris11' } });
        fireEvent.change(screen.getByTestId("address"), { target: { value: 'upper changi' } });
        fireEvent.change(screen.getByTestId("phoneNumber"), { target: { value: '12345421' } });
        fireEvent.change(screen.getByTestId("email"), { target: { value: 'doris1.doee@example.com' } });
        fireEvent.change(screen.getByTestId("password"), { target: { value: '123456' } });

        expect(screen.getByTestId("title").value).toBe('Mrs');
        expect(screen.getByTestId("firstName").value).toBe('Dor');
        expect(screen.getByTestId("lastName").value).toBe('Wang');
        expect(screen.getByTestId("username").value).toBe('doris11');
        expect(screen.getByTestId("address").value).toBe('upper changi');
        expect(screen.getByTestId("phoneNumber").value).toBe('12345421');
        expect(screen.getByTestId("email").value).toBe('doris1.doee@example.com');
        expect(screen.getByTestId("password").value).toBe('123456');
    });

    it('updates checkbox according to customer input', () => {
        render(
            <Router>
                <RegisterPage />
            </Router>
        );
        
        fireEvent.click(screen.getByTestId("over21"));
        fireEvent.click(screen.getByTestId("agreeToTerms"));
        
        expect(screen.getByTestId("over21").checked).toBe(true);
        expect(screen.getByTestId("agreeToTerms").checked).toBe(true);
    });

    //integration testing, submit data to cloud
    it('validates the registration data correctly', async () => {
        console.log('Test started');
        validateMemberDetails.mockReturnValue(true); // Mock validation to always pass
        submitMemberDetails.mockImplementation((data, callback) => {
            console.log('submitMemberDetails called with:', data);
            callback({ data: { id: 'mock-member-id' } });
        });
        // displaySuccessfulMessage.mockImplementation(() => {});
        displaySuccessfulMessage.mockImplementation(() => {
            console.log('displaySuccessfulMessage called');
        });

        render(
            <Router>
                <RegisterPage />
            </Router>
        );

        console.log('Component rendered');

        // Set all form fields
        Object.entries(mockRegisterData).forEach(([key, value]) => {
            const element = screen.getByTestId(key);
            if (element) {
                if (key === 'over21' || key === 'agreeToTerms') {
                    if (value === true) {
                        fireEvent.click(element);
                    }
                } else {
                    fireEvent.change(element, { target: { value } });
                }
                console.log(`Set ${key} to ${value}`);
            } else {
                console.warn(`Element with data-testid="${key}" not found`);
            }
        });
        
        console.log('All form fields set');

        // Log entire form state after setting fields
        await act(async () => {
            console.log('About to to submit form');
            // submit!!!!!
            fireEvent.submit(screen.getByTestId('registration-form'));
            console.log('Form submitted');
            await new Promise(resolve => setTimeout(resolve, 100)); // Wait a bit longer
        });

        // Log calls to submitMemberDetails
        console.log('validateMemberDetails calls:', validateMemberDetails.mock.calls);
        console.log('submitMemberDetails calls:', submitMemberDetails.mock.calls);
        console.log('displaySuccessfulMessage calls:', displaySuccessfulMessage.mock.calls);

        expect(validateMemberDetails).toHaveBeenCalledWith(mockRegisterData);
        expect(submitMemberDetails).toHaveBeenCalledWith(mockRegisterData, expect.any(Function));
        // expect(displaySuccessfulMessage).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    it('returns false for incomplete registration data', async () => {
        validateMemberDetails.mockReturnValue(false);
        validationFailed.mockImplementation(() => {});

        render(
            <Router>
                <RegisterPage />
            </Router>
        );

        const incompleteData = {
            title:'',
            firstName: 'Dor',
            lastName: 'Wang',
            username: '',
            address: 'upper changi',
            phoneNumber: '123454221',
            email: 'doris.doe@example.com',
            password: '123456',
            over21: false,
            agreeToTerms: false
        };

        Object.entries(incompleteData).forEach(([key, value]) => {
            const element = screen.getByTestId(key);
            if (element) {
                if (typeof value === 'boolean') {
                    if (value) fireEvent.click(element);
                } else {
                    fireEvent.change(element, { target: { value } });
                }
            }
        });

        // fireEvent.change(screen.getByTestId("firstName"), { target: { value: incompleteData.firstName } });
        // fireEvent.change(screen.getByTestId("lastName"), { target: { value: incompleteData.lastName } });
        // fireEvent.change(screen.getByTestId("address"), { target: { value: incompleteData.address } });
        // fireEvent.change(screen.getByTestId("phoneNumber"), { target: { value: incompleteData.phoneNumber } });
        // fireEvent.change(screen.getByTestId("email"), { target: { value: incompleteData.email } });
        // fireEvent.change(screen.getByTestId("password"), { target: { value: incompleteData.password } });
        // fireEvent.click(screen.getByText(/I confirm that I am over the age of 21./i));
        // fireEvent.click(screen.getByText(/I have read and agree to Memora's Terms of Use and Privacy Policy./i));

        await act(async () => {
            // fireEvent.click(screen.getByText(/Register/i));
            fireEvent.submit(screen.getByTestId('registration-form'));

        });

        console.log('validateMemberDetails calls:', validateMemberDetails.mock.calls);
        console.log('validationFailed calls:', validationFailed.mock.calls);

        expect(validationFailed).toHaveBeenCalled();
        expect(validateMemberDetails).toHaveBeenCalled();
        expect(validateMemberDetails).toHaveReturnedWith(false);
        expect(validationFailed).toHaveBeenCalled();

        // expect(alertMock).toHaveBeenCalledWith('Please fill in all required fields.');
        // alertMock.mockRestore();

        // await waitFor(() => {
        //     expect(validateMemberDetails).toHaveBeenCalledWith(incompleteData);
        //     expect(validationFailed).toHaveBeenCalled();
        // });
        // await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
        // expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/api/users/`, { incompleteData});
    });
});


/*
under memora/memora
npx jest src/tests/UnitAndIntegrationTests/LogInPage.test.js

*/