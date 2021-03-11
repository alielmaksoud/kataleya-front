import React, { useState, useEffect } from 'react';
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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CookieService from '../../Service/CookieService';
import { useHistory } from "react-router-dom";
import axios from 'axios'

/* function Copyright() {
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
} */


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
    studentsloading: {
      color: 'green',
      position: 'fixed',
      zIndex: '0',
      width: '70%',
      height: '84vh',
      marginTop: '1%',
      'marginLeft': '15%',
    },
    editclass : {
      /* backgroundColor: 'rgba(116, 255, 116, 0.145)' */
    }
 
  },
}));



function EditItem(props) {
  const { register , handleSubmit} = useForm();
  const cookie = CookieService.get('Bearer');
  const NewAdminclass = useStyless();
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("none");
  const [Loading, setLoading] = useState(true)
  const [Sections, setSections] = useState([]);
  const [Classes, setClasses] = useState([]);
  let history = useHistory();
 const {ItemData} = props
console.log(ItemData)

  const Modify = async (data) => {
    console.log(data)
    let id = props.AdminData.id
    let file = data.file[0]
    const fd = new FormData();
    if(file){
      fd.append('file', file)
      fd.append("picture", data['first_name'].slice(-2) + data['phone'].slice(-1) + data['last_name'].slice(-2))
     }
    fd.append("first_name", data.first_name)
    fd.append("last_name", data.last_name)
    fd.append("email", data.email)
    fd.append("phone", data.phone)
    fd.append("section_id", data.section_id)
    fd.append("class_id", data.class_id)
    let headers = {
      'method' : 'POST',
       data : fd,
       headers: {
         'Authorization': `Bearer ${cookie}`,
       }
     };
     axios(`http://localhost:8000/api/student/${id}`, headers)
    .then(res => {
        console.log(res)
     setmessage("Student info has been Modified")
     setdisplay({display: 'inline', color: 'green' })
     props.Edit()
     window.location.replace("/admin/ManageStudents")
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


 if(Loading) {
      return (
        <div>
            <Backdrop className={NewAdminclass.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
      )
 }
 else {
  return (
    <div className={NewAdminclass.editclass} >
    <Container component="main" maxWidth="md">
      <div className={NewAdminclass.paperr}>
        <Typography component="h1" variant="h5">
          Edit Student Profile
        </Typography>
        {<span style={display}>{message}</span>}
        <form onSubmit={handleSubmit((data) => Modify(data))} className={NewAdminclass.formm} >
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={props.AdminData.first_name}
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="First Name"
                inputRef={register}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={props.AdminData.last_name}
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="last_name"
                autoComplete="lname"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              {/* <TextField
                defaultValue={props.AdminData.phone}
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="lname"
                inputRef={register}
              />
              </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={props.AdminData.email}
                variant="outlined"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              value={CurrentClass}
              id="class_id"
              select
              onChange={handleChangeClass}
              name="class_id"
              inputRef={register}
              SelectProps={{
              native: true,
          }}
          helperText="Please select CLass"
        >
          {Classes.map((option) => { 
            return (
            <option key={option.id} value={option.id}>
              {option.class_name}
            </option>
          )
          }
          )}
        </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
              value={CurrentSection}
              onChange={handleChangeSection}
              id="section_id"
              select
              name="section_id"
              inputRef={register}
              SelectProps={{
              native: true,
          }}
          helperText="Please select Section"
        > */}
          {Sections.map((option) => { 
            return (
            <option key={option.id} value={option.id}>
              {option.section_name}
            </option>
          )
          }
          )}
        {/* </TextField> */}
            </Grid>
            <Grid item xs={12}>
            <label for="image">Profile Picture</label>
              <TextField
                variant="outlined"
                fullWidth
                name="file"
                type="file"
                id="file"
                inputRef={register}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            className={NewAdminclass.submit}
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
                history.push("/admin/ManageStudents");
            }}
            className={NewAdminclass.submit}
          >
            Cancel
          </Button>
        </form>
      </div>
      <Box mt={1.3}>
    {/*     <Copyright /> */}
      </Box>
    </Container>
    </div>
  );
          }
}

export default EditItem;