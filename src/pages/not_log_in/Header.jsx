import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import LoginButton from './LoginButton';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="headerContent">
        <Logo />
        <Navigation />
        <LoginButton />
      </div>
    </header>
  );
};

export default Header;