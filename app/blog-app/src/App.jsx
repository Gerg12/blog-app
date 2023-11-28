import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import './App.css';

function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);


  // Function to perform login
  const handleLogin = async (username, password, navigate) => {
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
					navigate('/');
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


  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
					<Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/about" element={<About />} />
					<Route
						path="/login"
						element={<Login handleLogin={handleLogin} />}
					/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
