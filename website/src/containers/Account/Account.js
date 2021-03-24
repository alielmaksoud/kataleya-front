import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CookieService from '../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditAccount from './EditAccount';
import axios from 'axios';



function Account() {
  const [Users, setUsers] = useState([])
  const [Loading, setLoading] = useState(true)
  const [Editing, setEditing] = useState(false)
  const [UserData, setUserData] = useState({})
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("none");
  
    const useStyles = makeStyles((theme) => ({
        usersTable: {
          color: 'green',
          position: 'absolute',
          zIndex: '0',
          width: '70%',
          height: '10vh',
          marginTop: '1%',
          marginLeft: '15%',
         
        },
        backdrop: {
          zIndex: theme.zIndex.drawer + 1,
          color: 'blue',
        },
        manageusers : {
          /* backgroundColor: "rgba(116, 255, 116, 0.145)", */
          height : '10vh',
        }
      }));

    const usersTable = useStyles();
    const cookie = CookieService.get('Bearer');

    

   const HandleEdit = () => {
      setEditing(!Editing)
    }
 
    useEffect( () => {
/*       let id = UserData['id'] */
      setLoading(false)
      var config = {
        method: 'get',
        url: 'http://localhost:8000/api/user/profile',
        headers: { 
          'Authorization': `Bearer ${cookie}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
          axios(config)
          .then(res => {
            
            setUsers(res.data.data);
                 /*  setUsers(res.data.map((item, index)=>  
                    {return {
                        ...item,
                        edit: {id: item.id, index: index },
                    }})); */
                    setLoading(false)
          }).catch(err => {
            console.log(err.request)
          })
    },[]);
    
    console.log(Users,'usssrrrrrrrrrrr')
    
    
   /*  const columns = [
      {
        field: 'Name',
        headerName: 'Name',
        width: 160,
        valueGetter: (params) =>
          `${params.getValue('name') || ''}`,
      },
      { field: 'phone', headerName: 'Phone Number' , width: 250 },
      { field: 'email', headerName: 'Email' , width: 250 },

     
      
      
      {
        field: 'edit',
        headerName: 'Edit',
        renderCell: (params) => (
        
            <Button style={{backgroundColor: '#36C14B'}} variant="contained" size="small" alt="Remy Sharp" onClick={
               () =>  {
                setUserData(Users[params.value.index]);
                setEditing(true);
               }}>
                Update Your Profile
            </Button>
        ),
      },

      
    ]; */

    if(Loading){
      return (
        <div>
            <Backdrop className={usersTable.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
      )
    }
    if(Editing){
      return (
        <div>
            <EditAccount UserData={UserData} Edit={HandleEdit} />
        </div>
      )
    }else {
  return (
      <>
   {/*  <div className={usersTable.manageusers} >
       <div> Welcome {Users.name}</div>
    <div className={usersTable.usersTable} >
    
    <DataGrid rows={Users} columns={columns} />
    </div>
    </div> */}

       <div >
        <div >
          <div >
          <p><span style={{ fontWeight: "bold" }} >Welcome {Users.name} </span> </p>
          </div>
          <div >
{/*             <p><span style={{ fontWeight: "bold" }} >Email: </span> {Users.email}</p>
            <p ><span style={{ fontWeight: "bold" }} >Address: </span> </p> */}
            
          </div>
          <Button style={{backgroundColor: '#36C14B'}} variant="contained" size="small" alt="Remy Sharp" onClick={
               () =>  {
                setUserData(Users/* [params.value.index] */);
                setEditing(true);
               }}>
                Update Your Profile
            </Button>

        </div>
        
      </div>

    </>
  );
    }

}

export default Account;