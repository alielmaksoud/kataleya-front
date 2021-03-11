import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import CookieService from '../../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';



const Testimonials = () => {
    const [Testimonials, setTestimonials] = useState([])
    const [Loading, setLoading] = useState(true)
    const [Editing, setEditing] = useState(false)
    const [TestimonialData, setTestimonialData] = useState({})
    const [display, setdisplay] = useState({display: 'None', color: 'red' });
    const [message, setmessage] = useState("none");
      const useStyles = makeStyles((theme) => ({
          testimonialsTable: {
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
      const testimonialsTable = useStyles();
      const cookie = CookieService.get('Bearer');
  
      
  
     const HandleEdit = () => {
        setEditing(!Editing)
      }
   
      useEffect( () => {
        setLoading(true)
        var config = {
          method: 'get',
          url: 'http://localhost:8000/api/admin/testimonial',
          headers: { 
            'Authorization': `Bearer ${cookie}`, 
            'Content-Type': 'application/form-data'
          }};
            axios(config)
            .then(res => {
                    setTestimonials(res.data.map((item, index)=>  
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
      console.log(Testimonials)
      const DeleteTestimonial = async (id) => {
          setLoading(true);
   
          var config = {
          method: 'Delete',
          url: `http://localhost:8000/api/admin/testimonial/${id}`,
          headers: { 
            'Authorization': `Bearer ${cookie}`, 
            'Content-Type': 'application/x-www-form-urlencoded'
          }};
    
            axios(config)
            .then(res => {
              setmessage("Testimonial has been Deleted")
              setdisplay({display: 'inline', color: 'green' })
              /* props.Edit() */
              window.location.replace("/admin/ManageTestimonials")
              setTestimonials(res.data.map(item =>  
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
        { field: 'content', headerName: 'Review' , width: 170 },
        { field: 'image', headerName: 'Image' , width: 170 },
        {
          field: 'delete',
          headerName: 'Delete',
          sortable: false,
          renderCell: (params) => (
              <Button onClick={()=> DeleteTestimonial(params.value.id)} style={{backgroundColor: '#F76363'}} variant="contained" size="small" alt="Remy Sharp">
                  Delete
              </Button>
          ),
        },
        
      ];
      console.log(HandleEdit)
      if(Loading){
        return (
          <div>
              <Backdrop className={testimonialsTable.backdrop} open={true}>
                  <CircularProgress color="inherit" />
              </Backdrop>
          </div>
        )
      }
     
    return (
      <div className={testimonialsTable.managetestimonials} >
      <div className={testimonialsTable.testimonialsTable} >
      {<span style={display}>{message}</span>}
        <DataGrid rows={Testimonials} columns={columns} pageSize={8}/>
      </div>
      </div>
    );
      
}

export default Testimonials
