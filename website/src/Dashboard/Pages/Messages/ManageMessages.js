import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CookieService from '../../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';



const ManageMessages = () => {
    const [Messages, setMessages] = useState([])
    const [Loading, setLoading] = useState(true)
    const [Editing, setEditing] = useState(false)
    const [display, setdisplay] = useState({display: 'None', color: 'red' });
    const [message, setmessage] = useState("none");
      const useStyles = makeStyles((theme) => ({
          messagesTable: {
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
          manageadmins : {
            /* backgroundColor: "rgba(116, 255, 116, 0.145)", */
            height : '86vh',
          }
        }));
      const messagesTable = useStyles();
      const cookie = CookieService.get('Bearer');
  
      
  
     const HandleEdit = () => {
        setEditing(!Editing)
      }
   
      useEffect( () => {
        setLoading(true)
        var config = {
          method: 'get',
          url: 'http://127.0.0.1:8000/api/admin/messages',
          headers: { 
            'Authorization': `Bearer ${cookie}`, 
            'Content-Type': 'application/form-data'
          }};
            axios(config)
            .then(res => {
                    setMessages(res.data.map((item, index)=>  
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
      console.log(Messages)
      const DeleteMessage = async (id) => {
          setLoading(true);
   
          var config = {
          method: 'Delete',
          url: `http://localhost:8000/api/admin/messages/${id}`,
          headers: { 
            'Authorization': `Bearer ${cookie}`, 
            'Content-Type': 'application/x-www-form-urlencoded'
          }};
    
            axios(config)
            .then(res => {
              setmessage("Message has been Deleted")
              setdisplay({display: 'inline', color: 'green' })
              /* props.Edit() */
              window.location.replace("/admin/ManageMessages")
              setMessages(res.data.map(item =>  
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
  
        { field: 'id', headerName: 'ID', width:150},
        {
          field: 'name',
          headerName: 'Name',
          width: 160,
         
        },
        { field: 'email', headerName: 'Email' , width: 170 },
        { field: 'content', headerName: 'message' , width: 170 },
        { field: 'title', headerName: 'title' , width: 170 },
        {
          field: 'delete',
          headerName: 'Delete',
          sortable: false,
          renderCell: (params) => (
              <Button onClick={()=> DeleteMessage(params.value.id)} style={{backgroundColor: '#F76363'}} variant="contained" size="small" alt="Remy Sharp">
                  Delete
              </Button>
          ),
        },
        
      ];
      console.log(HandleEdit)
      if(Loading){
        return (
          <div>
              <Backdrop className={messagesTable.backdrop} open={true}>
                  <CircularProgress color="inherit" />
              </Backdrop>
          </div>
        )
      }
     
    return (
      <div className={messagesTable.managemessages} >
      <div className={messagesTable.messagesTable} >
      {<span style={display}>{message}</span>}
        <DataGrid rows={Messages} columns={columns} pageSize={8}/>
      </div>
      </div>
    );
      
}

export default ManageMessages
