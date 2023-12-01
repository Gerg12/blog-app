import React, { useEffect, useState } from 'react';

const About = () => {
  const [pageContent, setPageContent] = useState('');
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    fetch('https://js1.10up.com/wp-json/wp/v2/pages')
      .then(response => response.json())
      .then(data => {
        const aboutPage = data.find(page => page.id === 91);
        setPageContent(aboutPage?.content?.rendered || '');
        setPageTitle(aboutPage?.title?.rendered || '');
      })
      .catch(error => {
        console.error('Error fetching page content:', error);
      });
  }, []);

  return (
    <div className="about">
      <h1>{pageTitle}</h1>
      <div className="page" dangerouslySetInnerHTML={{ __html: pageContent }} />
    </div>
  );
};

export default About;