import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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



function EditCategory(props) {
  const { register} = useForm();
  const cookie = CookieService.get('Bearer');
  let history = useHistory();
  const NewCategoryclass = useStyless();
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("none");
  const [CategoryData, setCategoryData] = useState(props.CategoryData);
  
  const HandleChange = (e) => {
     let target = e.target.value
      setCategoryData({...CategoryData, [e.target.category_name]: target})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

     let id = CategoryData['id']
     const fdd = new FormData();
     console.log(e)

    fdd.append("category_name", CategoryData['category_name'])
    fdd.append("description", CategoryData['description'])

    let headers = {
     'method' : 'POST',
      data : fdd,
      headers: {
        'Authorization': `Bearer ${cookie}`,
      }
    };
    axios(`http://localhost:8000/api/admin/category/${id}?_method=PUT`, headers)
   .then(res => {
       console.log(res)
    setmessage("Category info has been Modified")
    setdisplay({display: 'inline', color: 'green' })
    props.Edit()
    window.location.replace("/admin/ManageCategory")
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
    <div className={NewCategoryclass.editclass} >
    <Container component="main" maxWidth="md">
      <div className={NewCategoryclass.paperr}>
        <Typography component="h1" variant="h5">
          Edit Category
        </Typography>
        {<span style={display}>{message}</span>}
        <form onSubmit={(e)=> handleSubmit(e)} className={NewCategoryclass.formm} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={CategoryData.category_name}
                onChange={(e) => HandleChange(e)}
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
            
            <Grid item xs={12}>
              <TextField
                defaultValue={CategoryData.description}
                onChange={(e) => HandleChange(e)}
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
            Save
          </Button>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            onClick={()=> {
                props.Edit()
                history.push("/admin/ManageCategory");
            }}
            className={NewCategoryclass.submit}
          >
            Back
          </Button>
        </form>
      </div>
      <Box mt={1.3}>
{/*         <Copyright /> */}
      </Box>
    </Container>
    </div>
  );
}

export default EditCategory;