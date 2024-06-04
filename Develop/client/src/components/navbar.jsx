import React, { useState } from 'react';
import LoginModal from './LoginModal/LoginModal';

function loginModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="loginModal">
      <h1 className="title">Welcome to the App</h1>
      <button className="button is-primary" onClick={() => setIsModalOpen(true)}>Login</button>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default loginModal;
