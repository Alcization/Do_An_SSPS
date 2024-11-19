import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import home from '../../../assets/home.png';
import printer from '../../../assets/printer small.png';
import slider from '../../../assets/sliders.png';
import chart from '../../../assets/bar-chart-2.png';
import clipboard from '../../../assets/clipboard.png';
import book from '../../../assets/book.png';
import user from '../../../assets/user_icon.png';

const navItems = [
  { icon_: {home}, label_: "Trang chủ", centered: true, link_: "admin/admin_home" },
  { icon_: {printer}, label_: "Máy in", centered: true, link_: "admin/printer_status" },
  { icon_: {slider}, label_: "Cấu hình", centered: true, link_: "admin/printer_info" },
  { icon_: {chart}, label_: "Báo cáo", centered: true, link_: "admin/admin_home" },
  { icon_: {clipboard}, label_: "Lịch sử", centered: true, link_: "admin/admin_home" },
  { icon_: {book}, label_: "Thư viện", marginTop: true, link_: "admin/admin_home" },
  { icon_: {user}, label_: "Người dùng", marginTop: true, link_: "admin/admin_home" }
];

const LeftSidebar = () => {
  return (
    <nav className="Sidebar">
      {navItems.map((item, index) => (

        <NavLink key={index} to={`/${item.link_}`} className="nav_Item">
          <img src={Object.values(item.icon_)} alt={item.label_} />
          <span>{item.label_}</span>
        </NavLink>

      ))}
    </nav>
  );
};

export default LeftSidebar;