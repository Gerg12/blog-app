import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import './App.css';

function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
	const [username, setUsername] = useState('');

	useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
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
				console.log('Everything is ok');
        const data = await response.json();
        const token = data.token; // Assuming the token is received in the response

        // Validate the token
        const isValidToken = await validateToken(token);
        if (isValidToken) {
					console.log('Valid Token');
          setIsLoggedIn(true); // Set logged in status to true if the token is valid
					localStorage.setItem('isLoggedIn', 'true');
					localStorage.setItem('username', username);
					setUsername(username);
					console.log('After setting');
					console.log(username);
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
  const validateToken = async (token) => {
    try {
      const response = await fetch('https://js1.10up.com/wp-json/jwt-auth/v1/token/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

	const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('username');
		setUsername('');
  };


  return (
    <Router>
      <div>
				<Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} username={username} />

        <Routes>
					<Route
						path="/"
						element={
							isLoggedIn ? (
								<Home username={username} />
							) : (
								<Navigate to={isLoggedIn ? '/' : '/login'} replace />
							)
						}
					/>
					<Route
						path="/about"
						element={
							isLoggedIn ? (
								<About />
							) : (
								<Login handleLogin={handleLogin} />
							)
						}
					/>
					<Route
						path="/login"
						element={
							isLoggedIn ? (
								<Home />
							) : (
								<Login handleLogin={handleLogin} />
							)
						}
					/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
