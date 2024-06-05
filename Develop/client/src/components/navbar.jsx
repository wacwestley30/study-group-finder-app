// can make buttons merge similar to project 2

// Import dependencies
import React, { useState } from 'react';
import LoginModal from './loginModal';
import RegisterModal from './registerModal'; // Import RegisterModal component

// Define the Navbar component
function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Define state to track whether the modal is open or closed
  return (
    <div className="navbar"> {/* Navbar container */}
      <div className="navbar-menu"> {/* Access the right side of the navbar */}
        <div className="navbar-end"> {/* Access the right side of the navbar-menu (could be repetitive) */}
          <div className="navbar-item"> {/* Navbar item */}
            <h1 className="title">blah blah blah heres ur dumb ole modal</h1> {/* Title (navbar-brand will push this to the left side of navbar. nav-bar start could also work while inside navbar-menu )*/}
            {/* Button to open the login modal */}
            <button className="button is-primary" onClick={() => setIsLoginModalOpen(true)}>Login</button>
            {/* Button to open the register modal */}
            <button className="button is-link" onClick={() => setIsRegisterModalOpen(true)}>Register</button>
          </div>
        </div>
      </div>
      
      {/* Render the LoginModal component */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      {/* Render the RegisterModal component */}
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </div>
  );
}

// Export the Navbar component
export default Navbar;



