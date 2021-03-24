import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { green } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import { useForm } from "react-hook-form";
import CookieService from '../../Service/CookieService';
import { useHistory } from "react-router-dom";
import axios from 'axios'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" style={{cursor: "alias", textDecoration: "none"}}>
        Learning Management System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyless = makeStyles((themee) => ({
  paperr: {
    paddingTop : themee.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  formm: {
    width: '100%', // Fix IE 11 issue.
    marginTop: themee.spacing(1),
  },
  submit: {
    margin: themee.spacing(1, 0, 0),
    marginLeft: "35%",
    marginRight: "35%",
    width: "30%",
    color: themee.palette.getContrastText(green[500]),
    backgroundColor: blue['#94aabe'],
    '&:hover': {
      backgroundColor: blue['#003366'],
    },
    backdrop: {
      zIndex: themee.zIndex.drawer + 1,
      color: 'green',
    },
    editclass : {
     /*  backgroundColor: 'rgba(116, 255, 116, 0.145)' */
    }
  },
}));


const EditOrder = (props) => {
  const cookie = CookieService.get('Bearer');
  let history = useHistory();
  const NewOrderclass = useStyless();
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("none");
  const [OrderData, setOrderData] = useState(props.OrderData);
  
  const HandleChange = (e) => {
     let target = e.target.value
      setOrderData({...OrderData, [e.target.name]: target})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

     let id = OrderData['id']
     const fdd = new FormData();

    fdd.append("overall_price", OrderData['overall_price'])
    fdd.append("order_date", OrderData['order_date'])
    fdd.append("shipped_date", OrderData['shipped_date'])
    fdd.append("address", OrderData['address'])
    let headers = {
     'method' : 'POST',
      data : fdd,
      headers: {
        'Authorization': `Bearer ${cookie}`,
      }
    };
    axios(`http://localhost:8000/api/admin/order/${id}?_method=PUT`, headers)
   .then(res => {
       console.log(res)
    setmessage("Order info has been Modified")
    setdisplay({display: 'inline', color: 'green' })
    props.Edit()
    window.location.replace("/admin/ManageOrders")
   })
  .catch((error) => {
   if(error.response){
     console.log(error);
    setmessage(Object.entries(error.response.data.errors).map((item, index) => " " + item[1] + " "))
    setdisplay({display: 'inline', color: 'red' })
   }else {
    setmessage("N e t w o r k  E r r o r")
    setdisplay({display: 'inline', color: 'red' })
  }
  })

}  
  return (
    <div className={NewOrderclass.editclass} >
    <Container component="main" maxWidth="md">
      <div className={NewOrderclass.paperr}>
        <Typography component="h1" variant="h5">
          Edit Order Profile
        </Typography>
        {<span style={display}>{message}</span>}
        <form onSubmit={(e)=> handleSubmit(e)} className={NewOrderclass.form} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={OrderData.overall_price}
                onChange={(e) => HandleChange(e)}
                autoComplete="overall_price"
                name="overall_price"
                variant="outlined"
                required
                fullWidth
                id="overall_price"
                label="Total Price"
                
                autoFocus
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                defaultValue={OrderData.order_date}
                onChange={(e) => HandleChange(e)}
                variant="outlined"
                required
                id="order_date"
                label="Ordered At"
                name="order_date"
                autoComplete="order_date"
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={OrderData.shipped_date}
                onChange={(e) => HandleChange(e)}
                variant="outlined"
                required
                id="shipped_date"
                label="Expected Arrival "
                name="shipped_date"
                autoComplete="shipped_date"
               
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               defaultValue={OrderData.address}
                onChange={(e) => HandleChange(e)}
                variant="outlined"
                name="Address"
                label="Address"
                type="Address"
                id="Address"
                autoComplete="current-Address"
                
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            className={NewOrderclass.submit}
          >
            Save
          </Button>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            onClick={()=> {
                props.Edit()
                history.push("/admin/ManageOrders");
            }}
            className={NewOrderclass.submit}
          >
            Back
          </Button>
        </form>
      </div>
      <Box mt={1.3}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}

export default EditOrder
