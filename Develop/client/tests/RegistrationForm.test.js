import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Registration from '../src/components/Registration';

describe('Registration Form', () => {
  test('renders registration form with required fields', () => {
    render(<Registration />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  });

  test('form submits with hardcoded valid input and clears the form', () => {
    render(<Registration />);
    // Emulate valid user input
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'Password123!' } });
    // Submit the form
    fireEvent.click(screen.getByText('Register'));
    // Verify form is cleared
    expect(screen.getByLabelText('Email:')).toHaveValue('');
    expect(screen.getByLabelText('Username:')).toHaveValue('');
    expect(screen.getByLabelText('Password:')).toHaveValue('');
  });

  test('displays error messages for invalid input', async () => {
    render(<Registration />);
    // Emulate invalid user input
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'invalidemail' } });
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'short' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'weak' } });
    // Submit the form
    fireEvent.click(screen.getByText('Register'));
    // Log error messages
    console.log('Email error message:', screen.getByText('Invalid email address'));
    console.log('Username error message:', screen.getByText('Invalid username'));
    console.log('Password error message:', screen.getByText('Invalid password'));
    // Verify error messages
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      expect(screen.getByText('Invalid username')).toBeInTheDocument();
      expect(screen.getByText('Invalid password')).toBeInTheDocument();
    });
  });

  test('does not display error messages for valid input', async () => {
    render(<Registration />);
    // Emulate valid user input
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'Password123!' } });
    // Submit the form
    fireEvent.click(screen.getByText('Register'));
    // Verify no error messages
    await waitFor(() => {// NOT toBE
      expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
      expect(screen.queryByText('Invalid username')).not.toBeInTheDocument();
      expect(screen.queryByText('Invalid password')).not.toBeInTheDocument();
    });
  });

  test('handles specific input', () => {
    render(<Registration />);
    // Emulate specific user input
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'Password123!' } });
    // Verify input changes
    expect(screen.getByLabelText('Email:')).toHaveValue('user@example.com');
    expect(screen.getByLabelText('Username:')).toHaveValue('testuser');
    expect(screen.getByLabelText('Password:')).toHaveValue('Password123!');
  });

  test('renders with initial state (empty form)', () => {
    render(<Registration />);
    // Verify initial input values are empty
    expect(screen.getByLabelText('Email:')).toHaveValue('');
    expect(screen.getByLabelText('Username:')).toHaveValue('');
    expect(screen.getByLabelText('Password:')).toHaveValue('');
  });
});
