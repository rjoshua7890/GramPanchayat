import React from 'react';
import './Footer.css';
import { assets } from './assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-left">
          <img src={assets.logo} alt="Logo" />
          <ul></ul>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>
        <div className="footer-center">
          <p>@This site is designed, developed, hosted and maintained by National Informatics Centre, Ministry of Electronics & Information Technology, Government of India.</p>
          <a href="https://www.digitalindia.gov.in/" target="_blank" rel="noopener noreferrer">
            <img src={assets.dl} alt="Digital India Logo" />
          </a>
        </div>
        <div className="footer-right">
          <div className="footer-disclaimer">
            <p>Disclaimer</p>
            <a href="https://www.nic.in/" target="_blank" rel="noopener noreferrer">
              <img src={assets.l} alt="Logo L" />
            </a>
            <a href="https://www.india.gov.in/" target="_blank" rel="noopener noreferrer">
              <img src={assets.india} alt="India Logo" />
            </a>
          </div>
        </div>
      </div>
      <hr />
      </div>
  );
}

export default Footer;
