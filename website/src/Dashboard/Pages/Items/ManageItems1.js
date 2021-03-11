import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import CookieService from '../../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditItem from './EditItem';
import axios from 'axios';
import Card from './popup'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';

function ManageItem() {
  const { register , handleSubmit, reset } = useForm();
  const [DollarRate, setDollarRate] = useState(0)
  const [Items, setItems] = useState([])
  const [Loading, setLoading] = useState(true)
  const [Editing, setEditing] = useState(false)
  const [ItemData, setItemData] = useState({})
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("none");
    const useStyles = makeStyles((theme) => ({
      formm: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      rate:{
        display: 'flex',
        justifyContent: 'center',
      },
      input:{
        display: 'flex',
        justifyContent: 'center',
        marginBottom:'1%',
        marginTop:'1%'
      },
      submit: {
        marginLeft:'1%',
        width: "10%",
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: blue['#94aabe'],
        '&:hover': {
          backgroundColor: blue['#003366'],
        },
      },
        ItemsTable: {
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
        manageItems : {
          /* backgroundColor: "rgba(116, 255, 116, 0.145)", */
          height : '86vh',
        }
      }));
      const classes = useStyles();
      const cookie = CookieService.get('Bearer');

    

   const HandleEdit = () => {
      setEditing(!Editing)
    }
    const Modify = async (data) => {
      const fd = new FormData();
      let id = 1;
        fd.append('rate', data.rate)
      let headers = {
        'method' : 'POST',
         data : fd,
         headers: {
          'Authorization': `Bearer ${cookie}`, 
         }
       };
       axios(`http://localhost:8000/api/admin/usdRate/${id}?_method=PUT`, headers)
      .then(res => {
          setDollarRate(data.rate)
    }).catch(err => {
      console.log(err.request)
    })
  }
 
    useEffect( () => {
      setLoading(false)
      var config = {
        method: 'get',
        url: 'http://localhost:8000/api/item',
        headers: { 
          'Authorization': `Bearer ${cookie}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
          axios(config)
          .then(res => {
                  setItems(res.data.data[0]);
                  setDollarRate(res.data.data[1][0].rate)
                    setLoading(false)
          }).catch(err => {
            console.log(err.request)
          })
    },[]);
    const DeleteItem = async (id) => {
      var config = {
      method: 'Delete',
      url: `http://localhost:8000/api/admin/item/${id}`,
      headers: { 
        'Authorization': `Bearer ${cookie}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      }};
        axios(config)
        .then(res => {
          console.log(res)
          setItems(Items.filter(item => item.id !== id))    
        }).catch(err => {
          console.log(err)
        })
        setLoading(false)
  }
    const columns = [
        {
            field: 'image',
            headerName: 'Picture',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <img style={{width: '1', height: '1'}} alt="Remy Sharp" src= {`http://localhost:8000/storage/${params.row.image}`}/>
            ),
        },
      {
        field: 'Name',
        headerName: 'Name',
        width: 140,
        valueGetter: (params) =>
          `${params.getValue('name') || ''}`,
      },
      {
        field: 'Category',
        headerName: 'Category',
        width: 120,
        valueGetter: (params) =>
          `${params.getValue('category_name') || ''}`,
      },
      {
        field: 'Featured',
        headerName: 'Featured',
        width: 117,
        valueGetter: (params) =>
          `${params.getValue('is_featured') || ''}`,
      },
      {
        field: 'Offer',
        headerName: 'Offer',
        width: 88,
        valueGetter: (params) =>
          `${params.getValue('is_offer') || ''}`,
      },
      
      {
        field: 'view',
        headerName: 'view',
        width: 110,
        renderCell: (params) => (
        
            <Popup trigger={<Button variant="contained" size="small" alt="Remy Sharp">View</Button>} modal nested position="right center">
            <Card details={params.row} rate={DollarRate}/>
          </Popup>
        ),
      },
      {
        field: 'edit',
        headerName: 'Edit',
        renderCell: (params) => (
        
            <Button style={{backgroundColor: '#36C14B'}} variant="contained" size="small" alt="Remy Sharp" onClick={
               () =>  {
                 let dataofitem = Items[params.rowIndex]
                setItemData(dataofitem);
                setEditing(true);
                console.log(ItemData)
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
            <Button onClick={()=> DeleteItem(params.row.id)} style={{backgroundColor: '#F76363'}} variant="contained" size="small" alt="Remy Sharp">
                Delete
            </Button>
        ),
      },
      
    ];
    console.log(HandleEdit)
    if(Loading){
      return (
        <div>
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
      )
    }
    if(Editing){
      return (
        <div>
            <EditItem ItemData={ItemData} Edit={HandleEdit} />
        </div>
      )
    }else {
  return (
      <>
        <p className={classes.input}>Dollar Rate: {DollarRate}</p>
        <form
         onSubmit={handleSubmit((data) => Modify(data))}
          >
            <div className={classes.rate}>
            <div>
              <TextField
                autoComplete="rate"
                name="rate"
                variant="outlined"
                required
                id="rate"
                label="rate"
                inputRef={register}
                autoFocus
              />
              </div>
            <Button
            alt="Remy Sharp"
            type="submit"
            size="small"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          Update
          </Button>
          </div>
      </form>
    <div className={classes.manageItems} >
    <div className={classes.ItemsTable} >
    {<span style={display}>{message}</span>}
      <DataGrid rows={Items} columns={columns} pageSize={8}/>
    </div>
    </div>
    </>
  );
    }
}


export default ManageItem;