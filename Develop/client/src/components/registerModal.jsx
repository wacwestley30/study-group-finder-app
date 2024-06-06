// Import dependencies
import { useState } from 'react';

// Define the RegisterModal component
const RegisterModal = ({ isOpen, onClose }) => {
// Define state variables for username and password
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Placeholder for register logic *****

    // Log email, username and password to console
    console.log('Registering with', { email, username, password });
    // Close the modal
    onClose();
  };

  // If modal is not open, return null
  if (!isOpen) return null;

  // Render the RegisterModal component
  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}> {/* Modal container with ternary operator to add or remove is active class (This allows you to obtain the style of a certain state without having to trigger it. (cosmetic)) */}
      <div className="modal-background" onClick={onClose}></div> {/* Modal background is a transparent overlay that can act as a click target to close the modal*/}
      <div className="modal-content"> {/* Modal content a horizontally and vertically centered container, with a maximum width of 640px, in which you can include any content (could be the problem with not displaying full width) */}
        <div className="box"> {/* Box container */}
          <h2 className="title">Register</h2> {/* Title */}
          {/* Register form */}
          <form onSubmit={handleRegister}>
            {/* Email input field */}
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
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
              <label className="label">Username</label>
              <div className="control">
                <input
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
              <label className="label">Password</label>
              <div className="control">
                <input
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
                <button className="button is-link registerButton" type="submit">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Modal close button */}
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

// Export the RegisterModal component
export default RegisterModal;
