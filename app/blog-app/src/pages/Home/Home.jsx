import React from 'react';
import PostList from '../../components/PostList/PostList';

const Home = ({ username }) => {
  return (
    <div className="home">
      <h2>Welcome to the 10up Blog</h2>
      <p>
        This is the landing page content. You can customize this area to display any introductory
        information about your blog.
      </p>
			<PostList />
    </div>
  );
};

export default Home;
