import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    handleTokenExpiration();
  }, []);

  // Function to perform login
  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('https://js1.10up.com/wp-json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Assuming the token is received in the response

        // Validate the token
        const isValidToken = await validateToken(token);
        if (isValidToken) {
          setIsLoggedIn(true); // Set logged in status to true if the token is valid
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', username);
          setUsername(username);
        }
      } else {
        // Handle login error
        setIsLoggedIn(false);
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Function to validate token
  const validateToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      return expirationTime > currentTime; // Check if the token is not expired
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

  // Function to handle token expiration
  const handleTokenExpiration = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !validateToken(storedToken)) {
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      setUsername('');
    }
  };

  // Function to invalidate the token
  const invalidateToken = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('token'); // Remove or set token to an expired state
    setUsername('');
    console.log('Token invalidated.');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setUsername('');
  };

  return {
    isLoggedIn,
    username,
    handleLogin,
    handleLogout,
    invalidateToken,
  };
};