import React, { useState } from 'react';
import LoginModal from './LoginModal/LoginModal';

function loginModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="loginModal">
      <h1 className="title">blah blah blah heres ur dumb ole modal</h1>
      <button className="button is-primary" onClick={() => setIsModalOpen(true)}>Login</button>
      
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default loginModal;