import React from 'react';
import './Header.css';
import NavBar from './navbar';
import logo_printer from '../../../assets/printer_solar.png';
const Header = () => {
  return (
    <header className="header_admin1">
      <div className="header_admin1-logo">
        <h1 className="admin_navbar_logo"><img src={logo_printer} alt="" style={{height: 50, paddingRight:15}}/>HCMUT SSPS</h1>
      </div>
      <NavBar />
    </header>
  );
};

export default Header;