import React, { useState } from 'react';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validateUsername = (username) => {
    return username.length >= 8 && username.length <= 30;
  };

  const validatePassword = (password) => {
    const reUpperCase = /[A-Z]/;
    const reSpecialChar = /[!@#$&*]/;
    const reDigit = /[0-9]/;
    return password.length >= 8 && reUpperCase.test(password) && reSpecialChar.test(password) && reDigit.test(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrors = {};
    if (!validateEmail(formData.email)) {
      formErrors.email = 'Invalid email address';
    }
    if (!validateUsername(formData.username)) {
      formErrors.username = 'Invalid username';
    }
    if (!validatePassword(formData.password)) {
      formErrors.password = 'Invalid password';
    }
  
    // Log invalid credentials
    console.log('Invalid credentials:', formData);
  
console.log('Form errors on submit:', formErrors); // Log errors
setErrors(formErrors);

if (Object.keys(formErrors).length === 0) {
    console.log('Form submitted with valid data', formData);
    // Update formData after logging
    setFormData({
        email: '',
        username: '',
        password: ''
        });
    }
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required={true}
      />
      {errors.email && <span data-testid="email-error">{errors.email}</span>}

      <label htmlFor="username">Username:</label>
      <input
        id="username"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        required={true}
      />
      {errors.username && <span data-testid="username-error">{errors.username}</span>}

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required={true}
      />
      {errors.password && <span data-testid="password-error">{errors.password}</span>}

      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;
//    Invalid credentials: {
//    email: 'user@example.com',
//    username: 'testuser',
//    password: 'Password123!'
//  }
// it appears valid credentials are being passed 
// and my test is failing because no error messages are thrown