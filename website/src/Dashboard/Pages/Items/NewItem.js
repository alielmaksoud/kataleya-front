import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import { green } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import { useForm } from "react-hook-form";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CookieService from '../../Service/CookieService';
import { useHistory } from "react-router-dom";
import axios from 'axios'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paperr: {
    paddingTop : theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height : '86vh',
  },

  formm: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 0),
    marginLeft: "35%",
    marginRight: "35%",
    width: "30%",
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: blue['#94aabe'],
    '&:hover': {
      backgroundColor: blue['#003366'],
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
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



function NewItem() {
  const { register , handleSubmit, reset } = useForm();
  const cookie = CookieService.get('Bearer');
  const classes = useStyles();
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("Item couldn't be added");
  const [Loading, setLoading] = useState(true)
  const [Categories, setCategories] = useState([]);
  const [inputList, setInputList] = useState([{bottle_size_0:"", price_0:"", offer_price_0:""}]);
  const [Index, setIndex] = useState(1);
  let history = useHistory();
  const [IsFeatured, setIsFeatured] = useState(0)
  const [IsOffer, setIsOffer] = useState(0)
  



  useEffect(() => {
    setLoading(true)
    var config = {
      method: 'get',
      url: 'http://localhost:8000/api/category',
      headers: {
        'Authorization': `Bearer ${cookie}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }};
        axios(config)
        .then(res => {
                setCategories(res.data)

        }).catch(err => {
          console.log(err.request)
        })
       setLoading(false)
  },[]);

  

  const handleAddClick = () => {
    setIndex(Index + 1)
    let bottle_size = 'bottle_size_' + Index
    let price = 'price_'+ Index
    let offer_price = 'offer_price_'+ Index
    setInputList([...inputList, {[bottle_size]:"", [price]:"", [offer_price]:""}]);  
  }
  const Create = async (data) => {
    console.log(data,"data")
    const fd = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if(`${key}` == 'file'){
        fd.append('image', data.file[0])
      }
      else if(`${key}` == 'is_offer' ){
        data.is_offer ? fd.append('is_offer', 1) :  fd.append('is_offer', 0)
      }
      else if (`${key}` == 'is_featured'){
        data.is_featured ? fd.append('is_featured', 1) :  fd.append('is_featured', 0)
      }
        else fd.append(`${key}`, `${value}`)
    }
    for (var dataaa of fd) {
      console.log(dataaa);
    }
    let headers = {
      headers: {
        'Content-Type':'form-data',
        'Authorization': `Bearer ${cookie}`,
      }
    };
    axios.post('http://localhost:8000/api/admin/item', fd, headers)
   .then(res => {
    setmessage(data.name + " has been added")
    setdisplay({display: 'inline', color: 'green' })
    reset();
   })
  .catch((error) => {
    console.log(error)
   if(error.response){
     
    // setmessage(Object.entries(error.response.data.errors).map((item, index) => " " + item[1] + " "))
    setdisplay({display: 'inline', color: 'red' })
   }else {
    setmessage("N e t w o r k  E r r o r")
    setdisplay({display: 'inline', color: 'red' })
  }
  })
}
const handleChangeOffer = (event) => {
  IsOffer == 1 ? setIsOffer(0) : setIsOffer(1)
};
const handleChangeFeatured = (event) => {
  IsFeatured == 1 ? setIsFeatured(0) : setIsFeatured(1)
};

 if(Loading) {
      return (
        <div>
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
      )
 }
 else {
  return (
    <div  style={{backgroundColor: 'white'}} className={classes.editclass} >
    <Container component="main" maxWidth="md">
      <div className={classes.paperr}>
        <Typography component="h1" variant="h5">
          New Item
        </Typography>
        {<span style={display}>{message}</span>}
        

        <form
         onSubmit={handleSubmit((data) => Create(data))}
          className={classes.formm} >
              <Grid container spacing={2}>
            <Grid item xs={0} sm={3}/>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                inputRef={register}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                id="category_id"
                select
                required
                name="category_id"
                inputRef={register}
                SelectProps={{
                native: true,
                }}
                helperText="Please select Category"
                variant="outlined"
              >
                  {Categories.map((option) => {
                    return (
                    <option key={option.id} value={option.id}>
                      {option.category_name}
                    </option>
                    )}
                  )}
              </TextField>
            </Grid>
            <Grid item xs={0} sm={3}/>
            <Grid item xs={12} sm={6}>
               <TextField
                rowsMin={1} 
                rows={2}
                autoComplete="name"
                name='description'
                variant="outlined"
                required
                fullWidth
                id='description'                
                label="Description"
                inputRef={register}
                autoFocus
              />
            </Grid>
            <Grid item xs={0} sm={3}/>
            <Grid item xs={0} sm={4}/>
            <Grid item xs={6} sm={2}>
            <FormControlLabel
              control={
                <Checkbox
                id = 'is_offer'
                  checked= {IsOffer}
                  onChange={handleChangeOffer}
                  name='is_offer'
                  color="primary"
                  inputRef={register}
                />
              }
              label="Offer Item"
            />
            </Grid>
            <Grid item xs={6} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                id = 'is_featured'
                  checked= {IsFeatured}
                  onChange={handleChangeFeatured}
                  name='is_featured'
                  color="primary"
                  inputRef={register}
                />
              }
              label="Featured Item"
            />
            </Grid>
            <Grid item xs={0} sm={3}/>
            <Grid item xs={0} sm={3}/>
            <Grid item xs={12} sm={6} style={{marginBottom:'2%'}}>
            <label for="image">Image</label>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                inputRef={register}
              />
            </Grid>
            </Grid>
              <Grid container spacing={1} direction="row" justify="center" alignItems="center">
              {inputList.map((value, index) => {
                return(
                <>
                  <Grid item xs={0} sm={3}/>
                  <Grid item xs={3} sm={2}>
                  <TextField
                    id={'bottle_size_' + index }
                    name={'bottle_size_' + index}
                    label="Size"
                    required
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputRef={register}
                  />
                </Grid>
                <Grid item xs={3} sm={2}>
                <TextField
                  id={'price_' + index}
                  name={'price_' + index}
                  label="Price"
                  required
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={3} sm={2}>
                <TextField
                  id={'offer_price_' + index}
                  name={'offer_price_' + index}
                  label="Offer Price"
                  required
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={1} sm={3}/>
              
                </>) 
              })}
            <Grid item xs={8} sm={8}/>
            <Grid item xs={4} sm={4}>
              <IconButton aria-label="Add" onClick={handleAddClick}>
               <Icon className="fa fa-plus-circle" color="secondary" />
              </IconButton>
               </Grid>
              </Grid>

          <Grid container spacing={2}>

          </Grid>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Add Item
          </Button>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            onClick={()=> {
                history.push("/admin/ManageItems");
            }}
            className={classes.submit}
          >
            Cancel
          </Button>
        </form>
      </div>
    </Container>
    </div>
  );
          }
}

export default NewItem;