import { render, screen } from '@testing-library/react';
import Registration from '../Registration'; 

describe('Registration Form', () => {
    test('renders registration form with required fields', () => {
        render(<Registration />);
            expect(screen.getByLabelText('Email')).toBeInTheDocument();
            expect(screen.getByLabelText('Username')).toBeInTheDocument();
            expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });
});
