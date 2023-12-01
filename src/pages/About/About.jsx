import React, { useEffect, useState } from 'react';
import { fetchPageContent } from '../../utils/api';

const About = () => {
  const [pageContent, setPageContent] = useState('');
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    const pageId = 91;
    fetchPageContent(pageId)
      .then(data => {
        setPageContent(data?.content?.rendered || '');
        setPageTitle(data?.title?.rendered || '');
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