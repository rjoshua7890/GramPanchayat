import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { assets } from './assets/assets';

const Home = () => {
  return (
    <>
      <div className="homepage">
        <nav>
          <ul>
            
            <Link to="/admin" className="nav-link">
            <button>ADMIN</button>
            </Link>

            <Link to="/staff" className="nav-link">
            <button>STAFF</button>
            </Link>


            <Link to="/user" className="nav-link">
            <button>USER</button>
            </Link>

          </ul>
        </nav>
      </div>
      
    </>
  );
};

export default Home;
