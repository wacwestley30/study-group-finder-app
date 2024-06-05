// Import dependencies
import React, { useState } from 'react';
import LoginModal from './loginModal'; // Import LoginModal component

// Define the Navbar component
function Navbar() {
  // Define state to track whether the modal is open or closed
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Render the Navbar component
  return (
    <div className="navbar"> {/* Navbar container */}
      <div className="navbar-menu"> {/* The right side of the navbar */}
        <div className="navbar-end"> {/* the right side of the navbar-menu (could be repetitive) */}
          <div className="navbar-item"> {/* Navbar item */}
            <h1 className="title">blah blah blah heres ur dumb ole modal</h1> {/* Title (navbar-brand will push this to the left side of navbar. nav-bar start could also work while inside navbar-menu )*/}
            {/* Button to open the login modal */}
            <button className="button is-primary" onClick={() => setIsModalOpen(true)}>Login</button>
          </div>
        </div>
      </div>
      
      {/* Render the LoginModal component */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

// Export the Navbar component
export default Navbar;


