import React, { useEffect, useState } from 'react';

const About = () => {
  const [pageContent, setPageContent] = useState('');

  useEffect(() => {
    fetch('https://js1.10up.com/wp-json/wp/v2/pages')
      .then(response => response.json())
      .then(data => {
        // Assuming the about page has an ID of 1
        const aboutPage = data.find(page => page.id === 91);
        setPageContent(aboutPage?.content?.rendered || '');
      })
      .catch(error => {
        console.error('Error fetching page content:', error);
      });
  }, []);

  return (
    <div className="about">
      <h1>About</h1>
      <div className="page" dangerouslySetInnerHTML={{ __html: pageContent }} />
    </div>
  );
};

export default About;
