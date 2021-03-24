import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Menu, MenuItem} from '@material-ui/core';
import CookieService from '../../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditOrder from './EditOrder';
import Status from './Status';
import UserPopup from "./UserPopup"
import axios from 'axios';
import { IconButton } from "@material-ui/core";
import Popup from 'reactjs-popup';


const Orders = () => {
    const [Orders, setOrders] = useState([])
    const [Status, setStatus] = useState([])
    const [StatusData, setStatusData] = useState({})
    const [Loading, setLoading] = useState(true)
    const [Editing, setEditing] = useState(false)
    const [OrderData, setOrderData] = useState({})
    const [display, setdisplay] = useState({display: 'None', color: 'red' });
    const [message, setmessage] = useState("none");
    const [anchorEl, setAnchorEl] = React.useState(null);
  const Add = Status.map(Add => Add
    )
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const buttonClick=(e)=>{
      setStatus(e.target.value);
    }
    const handleClose = () => {
      setAnchorEl(null);
    };
      const useStyles = makeStyles((theme) => ({
          ordersTable: {
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
      const ordersTable = useStyles();
      const cookie = CookieService.get('Bearer');
  
      
  
     const HandleEdit = () => {
        setEditing(!Editing)
      }
   
      useEffect( () => {
        setLoading(true)
        var config = {
          method: 'get',
          url: 'http://localhost:8000/api/admin/order',
          headers: { 
            'Authorization': `Bearer ${cookie}`, 
            'Content-Type': 'application/form-data'
          }};
            axios(config)
            .then(res => {
                    setOrders(res.data.map((item, index)=>  
                      {return {
                          ...item,
                          delete: {id: item.id},
                          edit: {id: item.id, index: index },
                          /* image   : linkkk + item.picture, */
                      }}));
                      setLoading(false)
            }).catch(err => {
              console.log(err.request)
            });
            // var choice ={ method: 'get',
            // url: "http://localhost:8000/api/admin/status",
            // headers: { 
            //   'Authorization': `Bearer ${cookie}`, 
            //   'Content-Type': 'application/form-data'
            // }};
            // axios(choice)
            // .then(res => {
            //         setStatus(res.data.map((key, val)=>  
            //           {return {
            //               ...key,
            //               delete: {id: key.id},
            //               edit: {id: key.id, val: val },
            //               /* image   : linkkk + key.picture, */
            //           }}));
            //           setLoading(false)
            // }).catch(err => {
            //   console.log(err.request)
            // });
        
      },[]);

      // useEffect(() => {
      //   axios.get("http://localhost:8000/api/admin/status", {
      //       headers: { 
      //           'Authorization': `Bearer ${cookie}`, 
      //           'Content-Type': 'application/form-data'
      //         },
      //   }).then((response) => {
      //     setStatus(response.data);
      //   });
      // }, []);
      console.log(Status);
      console.log(Orders);
      const DeleteOrder = async (id) => {
          setLoading(true);
   
          var config = {
          method: 'Delete',
          url: `http://localhost:8000/api/admin/order/${id}`,
          headers: { 
            'Authorization': `Bearer ${cookie}`, 
            'Content-Type': 'application/x-www-form-urlencoded'
          }};
    
            axios(config)
            .then(res => {
              setmessage("Order has been Deleted")
              setdisplay({display: 'inline', color: 'green' })
              /* props.Edit() */
              window.location.replace("/admin/ManageOrders")
              setOrders(res.data.map(item =>  
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
          field: 'overall_price',
          headerName: 'Total Price',
          width: 160,
         
        },
        { field: 'order_date', headerName: 'Ordered At' , width: 170 },
        { field: 'shipped_date', headerName: 'Expected Arrival' , width: 170 },
        {
          field: 'customer',
          headerName: 'Customer',
          width: 170,
          renderCell: (params) => (
          
              <Popup trigger={<Button variant="contained" size="small" alt="Remy Sharp">View</Button>} modal nested position="right center">
              <UserPopup details={params.row} />
            </Popup>
          ),
        },
        {
          field:'status_id',
          headerName: 'Status',
          sortable: false,
          width:170,
          renderCell: (params) => (
          <div><IconButton edge="start" aria-label="menu" aria-haspopup="true" onClick={handleClick}>
         {Status}
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
            
          ),
        },
        {
          field: 'edit',
          headerName: 'Edit',
          renderCell: (params) => (
          
              <Button style={{backgroundColor: '#36C14B'}} variant="contained" size="small" alt="Remy Sharp" onClick={
                 () =>  {
                  setOrderData(Orders[params.value.index]);
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
              <Button onClick={()=> DeleteOrder(params.value.id)} style={{backgroundColor: '#F76363'}} variant="contained" size="small" alt="Remy Sharp">
                  Delete
              </Button>
          ),
        },
        
      ];
      console.log(HandleEdit)
      if(Loading){
        return (
          <div>
              <Backdrop className={ordersTable.backdrop} open={true}>
                  <CircularProgress color="inherit" />
              </Backdrop>
          </div>
        )
      }
      if(Editing){
        return (
          <div>
              <EditOrder OrderData={OrderData} Edit={HandleEdit} />
          </div>
        )
      }else {
    return (
      <div className={ordersTable.manageorders} >
      <div className={ordersTable.ordersTable} >
      {<span style={display}>{message}</span>}
        <DataGrid rows={Orders} columns={columns} pageSize={8} width="50rem"/>

      </div>
      </div>
    );
      }
}

export default Orders
