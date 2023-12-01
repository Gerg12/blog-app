import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const isLoggedIn = !!token; // Check if token exists to determine login status

  useEffect(() => {
    handleTokenExpiration();
  }, []);

  const setLocalStorageData = (receivedToken, receivedUsername) => {
    setToken(receivedToken);
    setUsername(receivedUsername);
    localStorage.setItem('token', receivedToken);
    localStorage.setItem('username', receivedUsername);
  };

  const cleanupLocalStorage = () => {
    setToken('');
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(
        'https://js1.10up.com/wp-json/jwt-auth/v1/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const receivedToken = data.token;

        // Validate the received token
        const isValidToken = await validateToken(receivedToken);
        if (isValidToken) {
          setLocalStorageData(receivedToken, username);
        }
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

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

  const handleTokenExpiration = () => {
    if (token && !validateToken(token)) {
      cleanupLocalStorage();
    }
  };

  const invalidateToken = () => {
    cleanupLocalStorage();
    console.log('Token invalidated.');
  };

  const handleLogout = () => {
    cleanupLocalStorage();
  };

  return {
    isLoggedIn,
    username,
    handleLogin,
    handleLogout,
    invalidateToken,
  };
};
