import React, { useState } from 'react';

function Registration() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  //when form is submitted, sets isRegistered to true
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsRegistered(true);//
  };

  //updates the formdata state object with the latest values entered by the user
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          required 
          value={formData.email} 
          onChange={handleChange}
        />
        
        <label htmlFor="username">Username:</label>
        <input 
          id="username" 
          name="username" 
          type="text" 
          required 
          value={formData.username} 
          onChange={handleChange}
        />
        
        <label htmlFor="password">Password:</label>
        <input 
          id="password" 
          name="password" 
          type="password" 
          required 
          value={formData.password} 
          onChange={handleChange}
        />
        
        <button type="submit">Register</button>
      </form>
      {isRegistered && <p>Registration successful</p>}
    </div>
  );
}

export default Registration;
