import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Bottombar.css';
import { SiGooglehome } from 'react-icons/si';
import { BsFillCartFill, BsFillPersonFill } from 'react-icons/bs';
import { TiThListOutline } from 'react-icons/ti';
import { BiMessageAltDetail } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';

const BottomNavbar = () => {
  const location = useLocation();
  const urlL = location.pathname;

  return (
    <div style={{ WebkitTapHighlightColor: 'transparent' }} className='bottom-nav-bar'>
      <ul>
        <li>
          {/* Use Link for internal navigation */}
          <Link to='/'>
            <SiGooglehome color={urlL === '/' ? '#007AFF' : '#777777'} />
          </Link>
        </li>
        
        <li>
          {/* Use Link to navigate to '/cart' */}
          <Link to='/cart'>
            <BsFillCartFill color={urlL === '/cart' ? '#007AFF' : '#777777'} />
          </Link>
        </li>
        <li>
          <Link to='/myorders' style={{ fontSize: '20px', transition: 'transform 0.3s' }}>
            <TiThListOutline   color={urlL === '/myorders' ? '#007AFF' : '#777777'}/>
          </Link>
        </li>
        {/* <li>
          <a href='#' style={{ fontSize: '25px', transition: 'transform 0.3s' }}>
            <BsFillPersonFill color={urlL === '/account' ? '#007AFF' : '#777777'}/>
          </a>
        </li> */}
      </ul>
    </div>
  );
};

export default BottomNavbar;
