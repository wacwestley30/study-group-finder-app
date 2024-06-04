import React from 'react';
import { render, waitFor } from '@testing-library/react';

import LoginModal from './src/components/loginModal';

it('submits login form with username and password input', async () => {
  const onCloseMock = jest.fn(); // Mocking onClose function

  const { getByLabelText } = render(<LoginModal isOpen={true} onClose={onCloseMock} />);

  // Get username and password inputs
  const usernameInput = getByLabelText('Username');
  const passwordInput = getByLabelText('Password');

  // need to update the username and password ****
  const Username = '?';
  const Password = '?';

  // Wait for the login logic to complete
  await waitFor(() => {
    
    // this is wrong. need to push updated username and password into fields****
    expect(console.log).toHaveBeenCalledWith(`Logging in with ${Username},${Password}`);

    expect(onCloseMock).toHaveBeenCalled();
  });
});

describe('Cypress "Login Modal" Tests', () => {
  it('mounts', () => {
    cy.mount(<LoginModal />)
  });
});

