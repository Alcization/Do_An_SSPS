import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import './Home.css';

function Home() {
    return (
        <div className="home">
          <Header />
          <MainContent />
          <Footer />
        </div>
    );
}

export default Home;