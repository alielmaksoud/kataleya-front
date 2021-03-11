import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button } from "@material-ui/core";
import {Menu, MenuItem} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";
import './Featured.css';


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

  },

  image: {
    
  },

  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ComplexGrid(props) {
const { register , handleSubmit, reset } = useForm();
const { id, image, name, description, is_offer} = props.details
const {rate}=props
const {item_attributes}=props

 
  const [price, setPrice] = useState(item_attributes[0].price)
  const [offer, setOffer] = useState(item_attributes[0].offer_price)
  


  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
        setAnchorEl(null);
      };
  const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

const handleChangeSize = (event) => {
  const pickedAttributes= (item_attributes.filter((item) => item.id == event.target.value))
    
    setPrice(pickedAttributes[0].price)
    setOffer(pickedAttributes[0].offer_price)

    }
    
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item className={classes.image}>
          <img className={classes.img} alt="complex" src= {`http://localhost:8000/storage/${image}`} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              <Typography  style={ {fontWeight:"bold"}} variant="body1" gutterBottom>
                  {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {description}
                </Typography>
                
               
              </Grid>
              <div>
           {/*  <Button style={{ alignSelf:"center", width:"100%", color:"black", backgroundColor:"lightgray" }} edge="start" aria-label="menu" aria-haspopup="true" onClick={handleClick}>
             Choose Bottle Size
            </Button> */}
            <Typography  style={ {fontWeight:"bold"}} variant="body1" gutterBottom>
                  choose Size
            </Typography>
              <TextField
                id="bottle_size"
                select
                // label="Category"
                onChange={handleChangeSize}
                /* defaultValue={item_attributes[0].id} */
                name="bottle_size"
                inputRef={register}
                SelectProps={{
                native: true,
                }}
                helperText=""
                variant="outlined"
              >
                  {item_attributes.map((option) => {
                    return (
                    <option key={option.id} value={option.id}>
                      {option.bottle_size}
                    </option>
                    )}
                  )}
              </TextField>
              
              {is_offer ? 
              <Typography  style={ {fontWeight:"bold"}} variant="body1" gutterBottom>
               
              Price: <div className="offer">{price*rate} LBP</div> 
               <br></br>
              Offer Price: {offer*rate} LBP
              </Typography> : <Typography  style={ {fontWeight:"bold"}} variant="body1" gutterBottom>
                  Price: {price*rate} LBP
              </Typography>}
              
            
       
      

        </div>
         <Button className="buttonn" style={{ alignSelf:"center", width:"50%", color:"black", backgroundColor:"lightgray" }} edge="start" aria-label="menu" aria-haspopup="true" onClick={handleClick}>
             Add To Cart
        </Button>

            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
