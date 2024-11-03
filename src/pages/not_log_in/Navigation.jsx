import React from 'react';
import './Navigation.css';

const Navigation = () => {
  const navItems = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'about', label: 'Về chúng tôi' },
    { id: 'services', label: 'Dịch vụ' },
  ];

  return (
    <nav className="navigation">
      {navItems.map((item) => (
        <a key={item.id} href={`#${item.id}`} className="navItem">
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;