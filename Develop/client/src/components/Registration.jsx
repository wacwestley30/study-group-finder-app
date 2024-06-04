import React from 'react';

function Registration() {
  return (
    <div>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        
        <label htmlFor="username">Username:</label>
        <input id="username" name="username" type="text" required />
        
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;
