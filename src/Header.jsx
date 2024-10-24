import React from 'react';
import './Header.css';
import { assets } from './assets/assets';

const Header = () => {
  return (
    <div className='header' id='header'>
      <div className="header-content">
        <div className="header-content-left">
        <a><img src={assets.logo} alt="" className="logo"/></a>

          <h1>ग्राम मानचित्र</h1>
          <p>Geo Spatial based Decision Support System for Panchayats</p>
        </div>
        <div className='header-content-right'>
          <div className='header-images'>
          <a href="https://amritmahotsav.nic.in/" target="_blank" rel="noopener noreferrer">
              <img src={assets.ajadi} alt="Ajadi Logo" />
            </a>
            <a href="https://www.nic.in/" target="_blank" rel="noopener noreferrer">
              <img src={assets.l} alt="Logo L" />
            </a>
            <a href="https://www.meity.gov.in/" target="_blank" rel="noopener noreferrer">
              <img src={assets.Emblem} alt="Emblem" />
            </a>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
