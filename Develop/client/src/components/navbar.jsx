// Import dependencies
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './loginModal';
import RegisterModal from './registerModal';
import NavLinks from './UI/navlinks';

function Navbar() {
  // Define state to track whether the modal is open or closed
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-menu">
        <div className="navbar-start is-align-items-center">
          <a href="/">
            <h1 className="title has-text-light is-flex has-text-weight-bold mx-3">Studdy</h1>
          </a>
            <NavLinks
              links={[
                <Link key={1} className="nav-link" to="/">Home</Link>,
                <Link key={2} className="nav-link" to="/groups">Groups</Link>,
                <Link key={3} className="nav-link" to="/profile">Profile</Link>
              ]}
            />
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            {/* Button to open the login modal */}
            <button className="button is-primary" onClick={() => setIsLoginModalOpen(true)}>Login</button>
            {/* Button to open the register modal */}
            <button className="button is-link ml-3" onClick={() => setIsRegisterModalOpen(true)}>Register</button>
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



