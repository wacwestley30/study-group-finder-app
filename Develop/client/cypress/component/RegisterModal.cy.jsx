import RegisterModal from '../../src/components/registerModal'

describe('Register Modal', () => {
  it('should take user input and close model when register button is clicked', () => {
    // Ensure the modal is open by default
    cy.mount(<RegisterModal isOpen={true} onClose={() => {}} />);

    // Input email, username, and password
    cy.get('input[type="email"]').type('testuser@example.com');
    cy.get('input[type="text"]').type('testuser');
    cy.get('input[type="password"]').type('testpassword');
    
    // Verify the input values
    cy.get('input[type="email"]').should('have.value', 'testuser@example.com');
    cy.get('input[type="text"]').should('have.value', 'testuser');
    cy.get('input[type="password"]').should('have.value', 'testpassword');

    // Stub console.log to spy on it
    cy.window().then((win) => {
        cy.stub(win.console, 'log').as('consoleLog');
    });

    // Click the register button
    cy.get('.registerButton').click();

    //expect console.log('Registering with', { email, username, password });
    cy.get('@consoleLog').should('be.calledWith', 'Registering with', { email: 'testuser@example.com', username: 'testuser', password: 'testpassword' });
    
    //Add test to check db for new user

  });
});
