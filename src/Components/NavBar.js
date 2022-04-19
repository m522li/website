import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';
import {Button} from './Button';


function NavBar() {
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true); //here too
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)
    const refreshPage = () => window.location.reload(false)
    const openLinkedIn = () => window.open('https://www.google.com/')
    const openGithub = () => window.open('https://github.com/m522li')
    
    //this makes the buttons become a condensed menu
    const showButton = () => {
        if(window.innerWidth <=960 ){
            setButton(false)
        }
        else
        {
            setButton(true)
        }
    };
    
    useEffect(() => {showButton()}, []);
    window.addEventListener('resize', showButton);
    return (
        <>
          <nav className='navbar'>
            <div className='navbar-container'>
              <Link to='/' className='navbar-reset' onClick={refreshPage}>
                Reset
              </Link>
              <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                  <Link to='/' className='nav-links' onClick={openLinkedIn}>
                    Resume
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/services'
                    className='nav-links'
                    onClick={openGithub}
                  >
                    GitHub
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/products'
                    className='nav-links'
                    onClick={openLinkedIn}
                  >
                    LinkedIn
                  </Link>
                </li>
    
              </ul>
              
            </div>
          </nav>
        </>
      );
    }

export default NavBar
