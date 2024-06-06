import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

const RegisterModal = ({ isOpen, onClose }) => {
  // Define state variables
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    onCompleted: (data) => {
      console.log('Registration successful', data);
      // Close the modal
      onClose();
    },
  });

  // Function to handle register form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      await addUser({
        variables: { email, username, password },
      });
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h2 className="title">Register</h2>
          {/* Register form */}
          <form onSubmit={handleRegister}>
            {/* Email input field */}
            <div className="field">
              <label className="label" htmlFor="registerEmail">Email</label>
              <div className="control">
                <input
                  id="registerEmail"
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* Username input field */}
            <div className="field">
              <label className="label" htmlFor="registerUsername">Username</label>
              <div className="control">
                <input
                  id="registerUsername"
                  className="input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* Password input field */}
            <div className="field">
              <label className="label" htmlFor="registerPassword">Password</label>
              <div className="control">
                <input
                  id="registerPassword"
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
                <button className="button is-link registerButton" type="submit" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </div>
          </form>
          {/* Display error message if there's an error */}
          {error && <p className="error">Registration failed: {error.message}</p>}
        </div>
      </div>
      {/* Modal close button */}
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default RegisterModal;