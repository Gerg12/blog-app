import React, { useEffect, useState } from 'react';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [authorNames, setAuthorNames] = useState({});

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
      fetchAuthors(data); // Fetch author names after posts are fetched
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchAuthors = async (postsData) => {
    const authorIds = postsData.map((post) => post.author);
    const uniqueAuthorIds = [...new Set(authorIds)]; // Get unique author IDs
    const authorNamesObj = {};

    await Promise.all(
      uniqueAuthorIds.map(async (authorId) => {
        try {
          const response = await fetch(`https://js1.10up.com/wp-json/wp/v2/users/${authorId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch author with ID ${authorId}`);
          }
          const authorData = await response.json();
          authorNamesObj[authorId] = authorData.name; // Assuming 'name' field contains the author's name
        } catch (error) {
          console.error('Error fetching author details:', error);
          authorNamesObj[authorId] = 'Unknown Author';
        }
      })
    );

    setAuthorNames(authorNamesObj);
  };

  return (
    <div>
      <div itemScope itemType="https://schema.org/Blog">
        {posts.map((post) => (
          <article key={post.id} itemScope itemType="http://schema.org/BlogPosting" className="post">

            <header>

              <h2 itemProp="headline">
                {post.title.rendered}
              </h2>

              <div className="date">
                <strong>Publish Date</strong>:
                <span itemProp="datePublished">
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                </span>
              </div>

              <div className="author">
                <strong>Author</strong>:
                <span itemProp="author">
                  {authorNames[post.author] || 'Unknown Author'}
                </span>
              </div>

            </header>

            <div itemProp="articleBody" className="content" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>

          </article>
        ))}
      </div>
    </div>
  );
};

export default PostList;
