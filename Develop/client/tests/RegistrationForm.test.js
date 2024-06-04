import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Registration from "../src/components/Registration"; 
import React from 'react';

describe('Registration Form', () => {
    test('renders registration form with required fields', () => {
        render(<Registration />);
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Username:')).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    });
    test('form submits with valid input', async () => {
        // First render
        render(<Registration />);
        // Fill out form fields
        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@test.com' } });
        fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
        // Submit form
        fireEvent.click(screen.getByText('Register'));
        // Wait for submission
        await waitFor(() => {
            expect(screen.getByText('Registration successful')).toBeInTheDocument();
        }, { timeout: 1000 });
        //verify form clears after submission
        expect(screen.getByLabelText('Email:')).toHaveValue('');
        expect(screen.getByLabelText('Username:')).toHaveValue('');
        expect(screen.getByLabelText('Password:')).toHaveValue('');
    });
    test('displays error message when required fields are not filled out', async () => {
        render(<Registration />);
    
        fireEvent.click(screen.getByText('Register'));
        
        await waitFor(() => {
            expect(screen.getByText('Please fill out all required fields')).toBeInTheDocument();
        }, { timeout: 1000 });
    });
});