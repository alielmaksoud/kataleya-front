import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import CookieService from '../../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditStudent from './EditStudent';
import axios from 'axios';
const itemsData = [];


function ManageItem1() {
  const [Items, setItems] = useState([])
  const [Loading, setLoading] = useState(true)
  const [Editing, setEditing] = useState(false)
  const [ItemData, setItemData] = useState({})
    const useStyles = makeStyles((theme) => ({
        studentTable: {
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
        manageStudent : {
          /* backgroundColor: "rgba(116, 255, 116, 0.145)", */
          height : '86vh',
        }
      }));
    const itemsTable = useStyles();
    const cookie = CookieService.get('Bearer');
    const linkkk = "http://localhost:8000/api/students/avatars/"
    

   const HandleEdit = () => {
      setEditing(!Editing)
    }
 
    useEffect( () => {
      setLoading(true)
      var config = {
        method: 'get',
        url: 'http://localhost:8000/api/item',
        headers: { 
          'Authorization': `Bearer ${cookie}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
          axios(config)
          .then(res => {
           console.log(res)
             itemsData = res.data.data[0]
             
                  // setItems(res.data.map((item, index)=>  
                  //   {return {
                  //       ...item,
                  //       delete: {id: item.id, img: item.picture},
                  //       edit: {id: item.id, index: index },
                  //       image   : linkkk + item.picture,
                  //   }}));
                    setLoading(false)
          }).catch(err => {
            console.log(err.request)
          })
    },[]);
    console.log(itemsData)
    // const DeleteItem = async (id, img) => {
    const DeleteItem = async (id) => {
        setLoading(true);
        // console.log(img)
        // var config2 = {
        //   method: 'Delete',
        //   url: `http://localhost:8000/api/students/delavatar/${img}`,
        //   headers: { 
        //     'Authorization': `Bearer ${cookie}`, 
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   }};
 
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
            
            // setItems(res.data.map(item =>  
            //   {return {
            //       ...item,
            //       delete: item.id,
            //       edit: item.id,
            //       image   : linkkk + item.picture
            //   }}));
                  
          }).catch(err => {
            console.log(err)
          })

          // axios(config2)
          // .then(res => {
    
          // }).catch(err => {
          //   console.log(err)
          // })
          setLoading(false)
    }
    const columns = [
      {
        field: 'image',
        headerName: 'Picture',
        width: 60,
        sortable: false,
        renderCell: (params) => (
          console.log(params)
            // <Avatar style={{width: '1', height: '1'}} alt="Remy Sharp" src={params.value}/>
        ),
      },
      { field: 'name', headerName: 'Name', width:95},
      
    //   {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     width: 150,
    //     valueGetter: (params) =>
    //       `${params.getValue('first_name') || ''} ${params.getValue('last_name') || ''}`,
    //   },
      // { field: 'price', headerName: 'Price', width: 100},
      // { field: 'bottle_size', headerName: 'Sizes Available', width: 100},
      { field: 'description', headerName: 'Description' , width: 160 },
    //   { field: 'phone', headerName: 'Phone', type:'number', width: 110 },
      {
        field: 'edit',
        headerName: 'Edit',
        sortable: false,
        renderCell: (params) => (
        
            <Button style={{backgroundColor: '#36C14B'}} variant="contained" size="small" alt="Remy Sharp" onClick={
               () =>  {
                 console.log(params)
                setItemData(params.row);
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
            <Button onClick={()=> {
            DeleteItem(params.row.id)}
            } style={{backgroundColor: '#F76363'}} variant="contained" size="small" alt="Remy Sharp">
                Delete
            </Button>
        ),
      },
      
    ];
    if(Loading){
      return (
        <div>
            <Backdrop className={itemsTable.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
      )
    }
    if(Editing){
      return (
        <div>
            <EditStudent ItemData={ItemData} Edit={HandleEdit} />
        </div>
      )
    }else {
  return (
    <div className={itemsTable.manageStudent} >
    <div className={itemsTable.studentTable} >
      HIIII
      {/* {}
      <DataGrid rows={Items[0]} columns={columns} pageSize={8}/> */}
    </div>
    </div>
  );
    }
}


export default ManageItem1;