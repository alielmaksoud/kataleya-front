import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Button, Menu, MenuItem} from '@material-ui/core';
import CookieService from '../../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditOrder from './EditOrder';

import axios from 'axios';
import { IconButton } from "@material-ui/core";

const Status = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    // const cookie = CookieService.get('Bearer');
  //   const [Type, setType] = useState([]);
  //   const Add = Type.map(Add => Add
  //   )

  //   useEffect(() => {
  //       Axios.get("http://localhost:8000/api/admin/status", {
  //           headers: { 
  //               'Authorization': `Bearer ${cookie}`, 
  //               'Content-Type': 'application/form-data'
  //             },
  //       }).then((response) => {
  //         setType(response.data);
  //       });
  //     }, []);
  //  // const handleTypeChange = (e) => {console.clear(), console.log((Type[e.target.value]))}
  
  //   return (
  //     < select
        
  //       className="browser-default custom-select" >
  //       {
  //         Add.map((address, key) => <option key={key}value={key}>{address}</option>)
  //       }
  //     </select >)
  <div><IconButton edge="start" aria-label="menu" aria-haspopup="true" onClick={handleClick}>
  Pending
</IconButton>
<Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem onClick={handleClose}>Delivering</MenuItem>
  <MenuItem onClick={handleClose}>Delivered</MenuItem>
  <MenuItem onClick={handleClose}>Cancelled</MenuItem>
</Menu></div>

}

export default Status
