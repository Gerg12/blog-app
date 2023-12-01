import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import { useAuth } from './utils/auth';
import './App.css';

function App() {

	const { isLoggedIn, username, handleLogin, handleLogout, invalidateToken } = useAuth();

  return (
    <Router>
      <div>
				<Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} username={username} />

				{/* Button to invalidate the token */}
        {/* <button onClick={invalidateToken}>Invalidate Token</button> */}

        <Routes>
					<Route
						path="/"
						element={
							isLoggedIn ? (
								<Home />
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
