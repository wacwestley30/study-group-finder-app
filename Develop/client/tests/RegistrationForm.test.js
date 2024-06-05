import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from '../src/components/RegisterForm'; 
import { ADD_USER } from '../src/components/mutations'; 

// mock the useNavigate hook 
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));


describe('RegisterForm', () => {
  // check if the modal renders when isOpen is true
  test('renders our RegisterForm when isOpen is true', () => {
    render(
      <MockedProvider>
        <MemoryRouter>
          <RegisterForm isOpen={true} onClose={() => {}} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  //check if the modal does not render when isOpen is false
  test('does not render RegisterForm when isOpen is false', () => {
    render(
      <MockedProvider>
        <MemoryRouter>
          <RegisterForm isOpen={false} onClose={() => {}} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/username/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /register/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /register/i })).not.toBeInTheDocument();
  });


  //check if form input work correctly
  test('updates input fields on user input', () => {
    render(
      <MockedProvider>
        <MemoryRouter>
          <RegisterForm isOpen={true} onClose={() => {}} />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
    expect(screen.getByLabelText(/username/i)).toHaveValue('testuser');
    expect(screen.getByLabelText(/password/i)).toHaveValue('password123');
  });

  // Test to check if form submission works correctly
  test('handles form submission', async () => {
    const mocks = [
      {
        request: {
          query: ADD_USER,
          variables: {
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123',
          },
        },
        result: {
          data: {
            addUser: {
              token: 'test-token',
              user: {
                _id: '1',
                username: 'testuser',
                email: 'test@example.com',
              },
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <RegisterForm isOpen={true} onClose={() => {}} />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await screen.findByRole('button', { name: /register/i });
  });
});
