import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingConfirmed from '../pages/BookingConfirmed'; // Adjust the import to match your file structure
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// Mock react-router-dom's useNavigate
const navigate = jest.fn();

jest.mock('axios');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => navigate,
}));

const initialFormData = {
    creditCardNumber: '1234123412341234',
    validUntill: '2024-11-02',
    cvcNo: '123',
    specialRequestText: 'None',
    roomDetails: {
        countryUID: 'USA',
        totalPrice: 200,
        parent: 2,
        children: 1,
        hotelDuration: 3,
        startDate: '2024-07-25',
        endDate: '2024-07-28',
        roomBooking: '1',
    },
};

// const mockToken = 'mockToken';
// const mockUser = { id: 'user123' };
// const navigate = useNavigate();

const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UiLCJpZCI6IjY2OWFiMTM2YTZhMGFiYmVlNmZlODg2YyIsImlhdCI6MTcyMTYzMzc4NiwiZXhwIjoxNzIxNzIwMTg2fQ.bJLcsWdpKz9ocFcVryPfoOkeu7QqUONGT1PB_j6CDpY';
const mockUser = { id: '669ab136a6a0abbee6fe886c' };
// const navigate = useNavigate();


beforeEach(() => {
    localStorage.setItem('token', mockToken);
    navigate.mockClear();
    axios.post.mockClear();
});

test('handles booking submission successfully', async () => {
    axios.post.mockResolvedValue({ status: 201 });

    render(<BookingConfirmed initialFormData={initialFormData} user={mockUser} />);

    fireEvent.click(screen.getByText('Confirm Booking'));

    expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5001/api/bookings/',
        {
            destinationID: initialFormData.roomDetails.countryUID,
            totalPayment: initialFormData.roomDetails.totalPrice.toFixed(2),
            creditCardNumber: initialFormData.creditCardNumber,
            cardExpiryDate: initialFormData.validUntill,
            cvc: initialFormData.cvcNo,
            specialRequest: initialFormData.specialRequestText,
            numberOfAdults: initialFormData.roomDetails.parent,
            numberOfChildren: initialFormData.roomDetails.children,
            numberOfNights: initialFormData.roomDetails.hotelDuration,
            startDate: initialFormData.roomDetails.startDate,
            endDate: initialFormData.roomDetails.endDate,
            rooms: [initialFormData.roomDetails.roomBooking],
        },
        {
            headers: {
                Authorization: `Bearer ${mockToken}`,
                memberID: mockUser.id,
                'Content-Type': 'application/json',
            },
        }
    );

    await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith('/bookingCompleted', {
            state: { formData: initialFormData },
        });
    });
});

// test('handles booking submission failure', async () => {
//     axios.post.mockRejectedValue(new Error('Booking failed'));

//     render(<BookingConfirmed initialFormData={initialFormData} user={mockUser} />);

//     fireEvent.click(screen.getByText('Submit Booking'));

//     await waitFor(() => {
//         expect(screen.getByText('An error occurred. Please try again.')).toBeInTheDocument();
//     });

//     expect(axios.post).toHaveBeenCalledWith(
//         'http://localhost:5001/api/bookings/',
//         {
//             destinationID: initialFormData.roomDetails.countryUID,
//             totalPayment: initialFormData.roomDetails.totalPrice.toFixed(2),
//             creditCardNumber: initialFormData.creditCardNumber,
//             cardExpiryDate: initialFormData.validUntill,
//             cvc: initialFormData.cvcNo,
//             specialRequest: initialFormData.specialRequestText,
//             numberOfAdults: initialFormData.roomDetails.parent,
//             numberOfChildren: initialFormData.roomDetails.children,
//             numberOfNights: initialFormData.roomDetails.hotelDuration,
//             startDate: initialFormData.roomDetails.startDate,
//             endDate: initialFormData.roomDetails.endDate,
//             rooms: [initialFormData.roomDetails.roomBooking],
//         },
//         {
//             headers: {
//                 Authorization: `Bearer ${mockToken}`,
//                 // memberID: mockUser.id,
//                 'Content-Type': 'application/json',
//             },
//         }
//     );
// });
