import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import CookieService from '../../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditUser from './EditUser';
import axios from 'axios';



function ManageUser() {
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
          height: '70vh',
          marginTop: '1%',
          marginLeft: '15%',
         
        },
        backdrop: {
          zIndex: theme.zIndex.drawer + 1,
          color: 'green',
        },
        manageusers : {
          /* backgroundColor: "rgba(116, 255, 116, 0.145)", */
          height : '86vh',
        }
      }));
    const usersTable = useStyles();
    const cookie = CookieService.get('Bearer');

    

   const HandleEdit = () => {
      setEditing(!Editing)
    }
 
    useEffect( () => {
      setLoading(true)
      var config = {
        method: 'get',
        url: 'http://localhost:8000/api/admin/user/show',
        headers: { 
          'Authorization': `Bearer ${cookie}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
          axios(config)
          .then(res => {
                  setUsers(res.data.map((item, index)=>  
                    {return {
                        ...item,
                        delete: {id: item.id},
                        edit: {id: item.id, index: index },
                        /* image   : linkkk + item.picture, */
                    }}));
                    setLoading(false)
          }).catch(err => {
            console.log(err.request)
          })
    },[]);
    console.log(Users)
    
    const DeleteUser = async (id) => {
        setLoading(true);
 
        var config = {
        method: 'Delete',
        url: `http://localhost:8000/api/admin/user/${id}`,
        headers: { 
          'Authorization': `Bearer ${cookie}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
  
          axios(config)
          .then(res => {
            setmessage("User has been Deleted")
            setdisplay({display: 'inline', color: 'green' })
            /* props.Edit() */
            window.location.replace("/admin/ManageUser")
            setUsers(res.data.map(item =>  
              {return {
                  ...item,
                  delete: item.id,
                  edit: item.id,
                  /* image   : linkkk + item.picture */
              }}));
                  
          }).catch(err => {
            console.log(err.request)
          })

          /* axios(config2)
          .then(res => {
    
          }).catch(err => {
            console.log(err.request)
          }) */
          setLoading(false)
    }
    const columns = [

      { field: 'id', headerName: 'ID', width:65},
      {
        field: 'Name',
        headerName: 'Name',
        width: 160,
        valueGetter: (params) =>
          `${params.getValue('name') || ''}`,
      },
      { field: 'phone', headerName: 'Phone Number' , width: 250 },
      { field: 'email', headerName: 'Email' , width: 250 },
      { field: 'created_at', headerName: 'Registered on' , width: 250 },
     
      
      
      {
        field: 'edit',
        headerName: 'Edit',
        renderCell: (params) => (
        
            <Button style={{backgroundColor: '#36C14B'}} variant="contained" size="small" alt="Remy Sharp" onClick={
               () =>  {
                setUserData(Users[params.value.index]);
                setEditing(true);
               }}>
                Edit
            </Button>
        ),
      },
      {
        field: 'delete',
        headerName: 'Delete',
        sortable: false,
        renderCell: (params) => (
            <Button onClick={()=> DeleteUser(params.value.id)} style={{backgroundColor: '#F76363'}} variant="contained" size="small" alt="Remy Sharp">
                Delete
            </Button>
        ),
      },
      
    ];
    console.log(HandleEdit)
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
            <EditUser UserData={UserData} Edit={HandleEdit} />
        </div>
      )
    }else {
  return (
    <div className={usersTable.manageusers} >
    <div className={usersTable.usersTable} >
    {<span style={display}>{message}</span>}
      <DataGrid rows={Users} columns={columns} pageSize={8}/>
    </div>
    </div>
  );
    }
}


export default ManageUser;