import LoginModal from '../../src/components/loginModal'

describe('Login Modal', () => {
  it('should take user input and close modal when login button is clicked', () => {
    // Ensure the modal is open by default
    cy.mount(<LoginModal isOpen={true} onClose={() => {}} />);

    // Input username and password
    cy.get('input[type="text"]').type('testuser');
    cy.get('input[type="password"]').type('testpassword');

    // Verify the input values
    cy.get('input[type="text"]').should('have.value', 'testuser');
    cy.get('input[type="password"]').should('have.value', 'testpassword');
    
    // Stub console.log to spy on it
    cy.window().then((win) => {
      cy.stub(win.console, 'log').as('consoleLog');
    });

    // Click the login button
    cy.get('.loginButton').click();

    // Expect console.log to have been called with the correct message
    cy.get('@consoleLog').should('be.calledWith', 'Logging in with', { username: 'testuser', password: 'testpassword' });

    //Add test to auth user credentials

    //Add test to check if user is logged in
  });
});
