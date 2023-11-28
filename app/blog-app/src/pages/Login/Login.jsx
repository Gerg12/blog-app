import React, { useState } from 'react';

function Login({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the handleLogin function passed from the parent component
      await handleLogin(username, password);
			console.log('after login handler');
    } catch (error) {
      console.error('Login error:', error);
			setLoginError(true);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
		setLoginError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
		setLoginError(false);
  };

  return (
    <div>
      <h1>Login</h1>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
