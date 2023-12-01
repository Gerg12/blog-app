import React, { useEffect, useState } from 'react';
import PostList from '../../components/PostList/PostList';
import WelcomeMessage from '../../components/WelcomeMessage/WelcomeMessage';

const Home = () => {

	const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="home">
      {username && <WelcomeMessage username={username} />}
			<PostList />
    </div>
  );
};

export default Home;
