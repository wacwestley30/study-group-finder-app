// Import dependencies
import { useState } from 'react';
import LoginModal from './loginModal';
import RegisterModal from './registerModal';

function Navbar() {
  // Define state to track whether the modal is open or closed
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-menu">
        <div className="navbar-start">
            <h1 className="title has-text-light is-flex is-align-items-center has-text-weight-bold ml-3">Studdy</h1>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            {/* Button to open the login modal */}
            <button className="button is-primary" onClick={() => setIsLoginModalOpen(true)}>Login</button>
            {/* Button to open the register modal */}
            <button className="button is-link" onClick={() => setIsRegisterModalOpen(true)}>Register</button>
          </div>
        </div>
      </div>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </nav>
  );
}

// Export the Navbar component
export default Navbar;



