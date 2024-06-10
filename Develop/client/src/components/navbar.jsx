import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './loginModal';
import RegisterModal from './registerModal';
import NavLinks from './UI/navlinks';
import Auth from '../utils/auth';

function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    Auth.logout();
  };

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="is-hidden-touch">
          <div className="navbar-brand is-align-items-center">
            <a href="/">
              <h1 className="title has-text-light has-text-weight-bold pl-3">Studdy</h1>
            </a>
          </div>
        </div>
        <div className="is-hidden-desktop has-text-centered">
          <div className="is-flex is-align-items-center is-justify-content-space-between">
            <div className="is-flex-grow-1 is-flex is-justify-content-center pl-6">
              <a href="/">
                <h1 className="title has-text-light has-text-weight-bold pl-2">Studdy</h1>
              </a>
            </div>
            <a
              role="button"
              className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={toggleMenu}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            {Auth.loggedIn() ? (
              <NavLinks
                links={[
                  <Link key={1} className="nav-link" to="/">Home</Link>,
                  <Link key={3} className="nav-link" to="/me">Profile</Link>
                ]}
              />
            ) : (
              <NavLinks
                links={[
                  <Link key={1} className="nav-link" to="/">Home</Link>
                ]}
              />
            )}
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {Auth.loggedIn() ? (
                <button className="button is-danger" onClick={handleLogout}>Logout</button>
              ) : (
                <>
                  <button className="button is-primary" onClick={() => setIsLoginModalOpen(true)}>Login</button>
                  <button className="button is-link ml-3" onClick={() => setIsRegisterModalOpen(true)}>Register</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </nav>
  );
}

export default Navbar;