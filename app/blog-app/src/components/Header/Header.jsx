import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, handleLogout, username }) => {
  return (
    <header className="site-header" role="banner" itemScope="itemscope" itemType="http://schema.org/WPHeader">
      <h1 className="site-title" itemScope itemType="http://schema.org/Organization">
        10up Blog
      </h1>
      <nav className="site-navigation" role="navigation" itemScope="itemscope" itemType="http://schema.org/SiteNavigationElement">
        <ul className="primary-menu">
          <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1912">
            <Link to="/">Home</Link>
          </li>
          <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1915">
            <Link to="/about">About</Link>
          </li>
          {isLoggedIn ? (
            <li className="logged-in menu-item menu-item-type-custom menu-item-object-custom menu-item-1915">
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          ) : (
            <li className="logged-in menu-item menu-item-type-custom menu-item-object-custom menu-item-1915">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
