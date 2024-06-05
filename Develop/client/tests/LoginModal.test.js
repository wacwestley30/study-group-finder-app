import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginModal from './src/components/loginModal';

it('submits login form with username and password input', async () => {
  const onCloseMock = jest.fn(); // Mocking onClose function

  const { getByLabelText } = render(<LoginModal isOpen={true} onClose={onCloseMock} />);

  // Get username and password inputs
  const usernameInput = getByLabelText('Username');
  const passwordInput = getByLabelText('Password');

  // Set the username and password
  const Username = 'testuser';
  const Password = 'testpassword';

  // Simulate user input
  fireEvent.change(usernameInput, { target: { value: Username } });
  fireEvent.change(passwordInput, { target: { value: Password } });

  // Simulate form submission
  fireEvent.submit(usernameInput.closest('form'));

  // Wait for the login logic to complete
  await waitFor(() => {
    expect(console.log).toHaveBeenCalledWith(`Logging in with ${Username},${Password}`);
    expect(onCloseMock).toHaveBeenCalled();
  });
});

describe('Cypress "Login Modal" Tests', () => {
  it('mounts', () => {
    cy.mount(<LoginModal />);
  });
});


