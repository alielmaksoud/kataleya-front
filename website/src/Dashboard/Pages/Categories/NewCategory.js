import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { green } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import { useForm } from "react-hook-form";
import CookieService from '../../Service/CookieService';
import { useHistory } from "react-router-dom";
import axios from 'axios'


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
   
  },
  editclass : {
    /* backgroundColor: "rgba(116, 255, 116, 0.145)", */
    height : '86vh'
  }
 
}));



function NewCategory() {
  const { register , handleSubmit , reset } = useForm();
  const cookie = CookieService.get('Bearer');
  const NewCategoryclass = useStyless();
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("none");
  let history = useHistory();


  const Create = async (data) => {
    const fd = new FormData();
    fd.append("category_name", data.category_name)
    fd.append("description", data.description)

    let headers = {
      headers: {
        'Content-Type':'form-data',
        'Authorization': `Bearer ${cookie}`,
      }
    };
    axios.post('http://localhost:8000/api/admin/category', fd, headers)
   .then(res => {
    setmessage(data.category_name + " has been added")
    setdisplay({display: 'inline', color: 'green' })
    reset();
    window.location.replace("/admin/ManageCategory")
   })
  .catch((error) => {
   if(error.response){
     console.log(error.response.data);
     setmessage(Object.entries(error.response.data.errors).map((item, index) => " " + item[1] + " "))
    setdisplay({display: 'inline', color: 'red' })
   }else {
    setmessage("N e t w o r k  E r r o r")
    setdisplay({display: 'inline', color: 'red' })
  }
  })
}
  return (
    <div className={NewCategoryclass.editclass} >
    <Container  component="main" maxWidth="md">
      <div className={NewCategoryclass.paperr}>
        <Typography component="h1" variant="h5">
          New Category
        </Typography>
        {<span style={display}>{message}</span>}
        <form onSubmit={handleSubmit((data) => Create(data))} className={NewCategoryclass.formm} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
       
                autoComplete="category_name"
                name="category_name"
                variant="outlined"
                required
                fullWidth
                id="category_name"
                label="Category Name"
                inputRef={register}
                autoFocus
              />
            </Grid>
            
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                inputRef={register}
              />
            </Grid>
           
          </Grid>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            className={NewCategoryclass.submit}
          >
            Create Category
          </Button>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            onClick={()=> {
                history.push("/admin/ManageCategory");
                
            }}
            className={NewCategoryclass.submit}
          >
            Cancel
          </Button>
        </form>
      </div>
    </Container>
    </div>
  );
}

export default NewCategory;