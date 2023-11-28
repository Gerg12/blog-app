import React, { useEffect, useState } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://js1.10up.com/wp-json/wp/v2/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title.rendered}</h3>
            {/* Assuming 'content' contains the body of the post */}
            <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;