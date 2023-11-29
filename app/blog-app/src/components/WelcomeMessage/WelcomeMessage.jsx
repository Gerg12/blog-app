import React from 'react';

const WelcomeMessage = ({ username }) => {
  return (
    <section className="welcome logged-in">
      Welcome, {username}!
    </section>
  );
};

export default WelcomeMessage;
