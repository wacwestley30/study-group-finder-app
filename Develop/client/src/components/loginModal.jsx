import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'; // Adjust the import path according to your project structure

// Define the LoginModal component
const LoginModal = ({ isOpen, onClose }) => {
  // Define state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Use the LOGIN_USER mutation
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      console.log('Login successful', data);
      // Close the modal
      onClose();
    },
  });

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      await login({
        variables: { email, password },
      });
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h2 className="title">Login</h2>
          {/* Login form */}
          <form onSubmit={handleLogin}>
            {/* Email input field */}
            <div className="field">
              <label className="label" htmlFor="loginEmail">Email</label>
              <div className="control">
                <input
                  id="loginEmail"
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* Password input field */}
            <div className="field">
              <label className="label" htmlFor="loginPassword">Password</label>
              <div className="control">
                <input
                  id="loginPassword"
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* Submit button */}
            <div className="field">
              <div className="control">
                <button className="button is-link loginButton" type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </div>
          </form>
          {/* Display error message if there's an error */}
          {error && <p className="error">Login failed: {error.message}</p>}
        </div>
      </div>
      {/* Modal close button */}
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default LoginModal;