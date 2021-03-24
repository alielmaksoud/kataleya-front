
import React from 'react';
import { IconContext } from 'react-icons';
import { FcMenu } from "react-icons/fc";
import CookieService from '../../Service/CookieService.js';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';



function Navbar({CheckSidebar, forwardedRef}) {
    const av = CookieService.get('av');
    const linkkk = "http://localhost:8000/api/admins/avatars/" + av;

  function logout(){
    const cookie = CookieService.get('Bearer');
    var config = {
      method: 'post',
      url: 'http://localhost:8000/api/admin/logout',
      headers: { 
        'Authorization': `Bearer ${cookie}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      }};

        axios(config)
        .then(res => {
           CookieService.remove('Bearer');
           CookieService.remove('av');
           window.location.replace("/")
        }).catch(err => {
           console.log(err)
           CookieService.remove('Bearer');
           CookieService.remove('av');
           window.location.replace("/")

        })
  }

  return (
    <IconContext.Provider value={{ color: '#B5DFBB' }}>
        <div className='navbarr'>
    
          <Button  onClick={CheckSidebar} className='menu-bars' ref={forwardedRef}>
            {/* <FaIcons.FaBars  /> */}
           <FcMenu/>
          </Button>
          <div className="head-title">
          {/* <img className='logo' src={Logo} alt="Logo" /> */}
          <Typography className='menu-text' component="h1" variant="h5">
          Kataleya
         </Typography>
          </div>
          <Button onClick={()=> logout() } className="logoutbutton">
           <Avatar style={{width: '32px', height: '32px', marginRight: '10px'}} alt="image" src={linkkk}/>
              Logout
          </Button>
        </div>  
    </IconContext.Provider>
  );
}

export default Navbar;