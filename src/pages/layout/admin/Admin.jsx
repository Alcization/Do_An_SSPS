import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './Admin.css'; // Sử dụng file CSS để tùy chỉnh giao diện

function MainComponent() {
    return (
        <div>
            <Header />
            <div className='grid-container'>
                <div className='grid-menu'><Sidebar /></div>
                <div className='grid-main'><Outlet /></div>
            </div>

        </div>
    );
}

export default MainComponent;
