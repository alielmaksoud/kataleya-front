import React, {useState,useEffect}from 'react';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import { FcMenu } from "react-icons/fc";
import CookieService from '../Service/CookieService';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import './Profile.css';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import Order from '../Orders/Order';
import Account from '../Account/Account';



export default function Profile() {

  const av = CookieService.get('av');
  
  function logout(){
    const cookie = CookieService.get('Bearer');
    var config = {
      method: 'post',
      url: 'http://localhost:8000/api/user/logout',
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
        <div>
          
            
            <div class="flex-container">
            <div class="flex-item-first">
            <Account />
            <br></br>
          <Button  className="button-profile" style={{ alignSelf:"center", width:"30%", color:"red", backgroundColor:"lightgray" }} edge="start" aria-label="menu" aria-haspopup="true" onClick={()=> logout() } >
              Logout
            </Button>
          </div>
             <div class="flex-item-second">
             <Cart  />
             <div>
             </div>
             <br></br>
             <div>
               <Link to="/">
             <Button className="button-profile"  style={{ alignSelf:"center", width:"30%", color:"black", backgroundColor:"lightgray" }} edge="start" aria-label="menu" aria-haspopup="true" /* onClick={() => () } */>
             Continue Shopping
             </Button>
             </Link>
            </div>
             </div>

             <div class="flex-item-third">
               <Order />
             
             </div>
            </div>
        </div>
    )
}


