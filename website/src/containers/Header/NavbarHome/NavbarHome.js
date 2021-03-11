import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { FcMenu } from "react-icons/fc";
import axios from 'axios';
import Logo from '../../../logo.png';
import Button from '@material-ui/core/Button';
import {Link } from 'react-router-dom';
import '../Header.css';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function NavbarHome() {
 /////// hamburger menu

 const [click, setClick] = useState(false);
    const setButton = useState(true)[1];

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    useEffect(() => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }, [setButton])


  //////// nav tim
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/signin"><MenuItem onClick={handleMenuClose}>login</MenuItem></Link>
      <Link to="/profile"><MenuItem onClick={handleMenuClose}>My account</MenuItem></Link>
    </Menu>
  );
 
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );



  return (
    <div className={classes.grow}>
      <AppBar position="static">
      <div className='navbar'>
        <Toolbar>
        <div className={classes.sectionDesktop}>
          
        <Link to="/" >
        <img className='logo' src={Logo} alt="Logo" /> 
        </Link>
          </div>
 

        <div className={classes.sectionMobile}>
        <nav className='navbar-mobile'>
                <div className="menu-icon-mobile" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu-mobile active' : 'nav-menu-mobile'}>
                <li className='nav-item-mobile'>
                        <Link to="/about" className='nav-links-mobiles' onClick={closeMobileMenu}>
                            About us
                   </Link>
                    </li>
                    <li className='nav-item-mobile'>
                        <Link to="/" className='nav-links-mobiles' onClick={closeMobileMenu}>
                            Kataleya
                   </Link>
                    </li>
                    <li className='nav-item-mobile'>
                        <Link to="/productlist" className='nav-links-mobiles' onClick={closeMobileMenu}>
                            Perfumes
                   </Link>
                    </li>
                    <li className='nav-item-mobile'>
                        <Link to="/offers" className='nav-links-mobiles' onClick={closeMobileMenu}>
                            Offers
                   </Link>
                    </li>
                    <li className='nav-item-mobile'>
                        <Link to="/featured" className='nav-links-mobiles' onClick={closeMobileMenu}>
                           Featured
                   </Link>
                    </li>
                    <li className='nav-item-mobile'>
                        <Link to="/contact" className='nav-links-mobiles' onClick={closeMobileMenu}>
                            Contact Us
                   </Link>
                    </li>

                </ul>

            </nav>
           
        </div> 

        <div className={classes.sectionMobile}>
          <div className="logo-mobile">
          <Link to="/" >
          <img className='logo' src={Logo} alt="Logo" />
          </Link>
          </div>
        </div>
        <div className={classes.sectionDesktop}>
        <div className="navbarrr">
            <ul>
            <li>
            <Link to="/about">About us</Link>
            </li>
            <li>
            <Link to="/productlist">Perfumes</Link>
            </li>
            <li>
            <Link to="/featured">Featured</Link>
            </li>
            <li>
            <Link to="/offers">Offers</Link>
            </li>
            <li>
            <Link to="/contact">Contact</Link>
            </li>
            </ul>
        </div> 
        </div>  
          

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <div className="account-logo">
          <Link to='/signin'>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              /* onClick={handleProfileMenuOpen} */
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            </Link>
            </div>
          </div>
         <div className={classes.sectionMobile}>
           
           <Link to='/signin'>
         <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              /* onClick={handleProfileMenuOpen} */
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            </Link>
            
          </div>
        </Toolbar>
        </div>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

