import React, { useEffect, useState } from 'react';
import './PostList.css';
import { fetchPosts, fetchAuthors } from '../../utils/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [authorNames, setAuthorNames] = useState({});

  useEffect(() => {
    fetchPosts()
      .then(data => {
        setPosts(data);
        return fetchAuthors(data);
      })
      .then(authorNamesData => {
        setAuthorNames(authorNamesData);
      });
  }, []);

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
