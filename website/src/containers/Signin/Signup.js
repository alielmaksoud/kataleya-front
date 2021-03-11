import React, { useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { green } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import { useForm } from "react-hook-form";
import { IconContext } from 'react-icons';
import Logo from '../../../src/assets/icons/logo.png';
import { useHistory } from "react-router-dom";
import CookieService from '../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Kataleya
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
  /*   paddingTop : theme.spacing(10), */
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: blue['#94aabe'],
    '&:hover': {
      backgroundColor: blue['#003366'],
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: 'green',
    },
 
  },
}));

function Signup(props) {

  const classes = useStyles();
  let history = useHistory();
  const [display, setdisplay] = useState("none")
  const { register , handleSubmit, errors } = useForm();
  const cookie = CookieService.get('Bearer');
  const [Verified, setVerified ] = useState("");
  const [message, setmessage] = useState("")

  useEffect(() => {
    var config = {
      method: 'post',
      url: 'http://localhost:8000/api/user/verify',
      headers: { 
        'Authorization': `Bearer ${cookie}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      }};

        axios(config)
        .then(res => {
            if(res.data.message === "Verified"){
                setVerified("true");
            }else {
              setVerified("error");
            }
        }).catch(err => {
          console.log(err.request)
          setVerified("error");
        })
    
  });


  const Auth = async (data) => {
   
     axios.post('http://localhost:8000/api/user/register',
    {
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password
      
    })
    .then(res => {
      CookieService.set('Bearer ', res.data.access_token, { path: "/", 'max-Age': res.data.expires_in})
      CookieService.set('av ', res.data.av, { path: "/", 'max-Age': res.data.expires_in})
      history.push("/profile");
      window.location.replace("/signin");
    })
  .catch((error) => {
    if(error.response){
      /* setmessage(Object.entries(error.response.data.error).map((item, index) => " " + item[1] + " ")) */
      setdisplay('inline');
    }else {
      setmessage("N e t w o r k  E r r o r")
      setdisplay('inline');
    }
  })
}

  if(Verified === "true"){
      history.push("/profile");
      return (
        <div>
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
        )
  }else if(Verified.length === 0){
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
        <IconContext.Provider value={{ color: '#B5DFBB' }}>

      <div className='main-color' >
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome To Kataleya
        </Typography>
        {errors.exampleRequired && <span>This field is lalaa</span>}
        {<span style={{display: display, color: 'red' }}>{message}</span>}
        <form onSubmit={handleSubmit((data) => Auth(data))} className={classes.form}>
          
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            type="name"
            name="name"
            inputRef={register}
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            type="phone"
            name="phone"
            inputRef={register}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            inputRef={register}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit} >
            Signup
          </Button>
        </form>
        <Typography component="h1" variant="h5">
          Back to <Link color="blue" href="/signin">
        Signin
      </Link> 
        </Typography>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
    </IconContext.Provider>
  );
  }
}


export default Signup;