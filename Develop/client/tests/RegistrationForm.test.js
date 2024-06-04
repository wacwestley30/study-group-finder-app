import { render, screen } from '@testing-library/react';
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
});

