import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from './mutations';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

// define RegisterForm component, and pass isOpen/onClose as props 
  const RegisterForm = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [addUser, { error }] = useMutation(ADD_USER); // useMutation hook for addUser
  const navigate = useNavigate();  

  // handles registration submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addUser({
        variables: { email, username, password },
      });
      console.log('Registering with', { email, username, password }); // Remove password before deploy
      navigate('/home'); // Set to home as a placeholder for now but we need to discuss.
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  // if isopen is false, return null (do not render the modal)
  if (!isOpen) return null;

  // render the registration form if isopen is true
  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h2 className="title">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="field">
              <label className="label" htmlFor="email">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="username">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="password">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-link registerButton" type="submit">Register</button>
              </div>
            </div>
          </form>
          {error && <p>Error: {error.message}</p>}
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default RegisterForm;
