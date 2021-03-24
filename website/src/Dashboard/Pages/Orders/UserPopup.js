import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import CookieService from '../../Service/CookieService';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 60,
  },
  tablecell: {
    fontSize: '10pt'
},
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 200,
    height: 200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function UserPopup(props) {
 const [User,setUser]=useState([]);
  const classes = useStyles();
  const cookie = CookieService.get('Bearer');
  let {user_id}=props.details;
 
  useEffect( () => {
  
    
     axios.get(`http://localhost:8000/api/admin/retrieve/${user_id}`,{
      headers: { 
        'Authorization': `Bearer ${cookie}`, 
        'Content-Type': 'application/form-data'
      },
    })
        .then(res => {
         
                // setUser(res.data.map((item, index)=>  
                //   {return {
                //       ...item,
                //       delete: {id: item.id},
                //       edit: {id: item.id, index: index },
                //       /* image   : linkkk + item.picture, */
                //   }}));
                setUser(res.data[0]);
                  
        }).catch(err => {
          console.log(err.request)
        });
       
    
  },[]);
 
  console.log(User)

  return (
    <div className={classes.root} >
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              <Typography variant="body1" gutterBottom>
                  {"Name:"+User.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {'Email: '+User.email}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {'Phone: '+User.phone}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {'Address: '+User.address}
                </Typography>
              </Grid>
      
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
