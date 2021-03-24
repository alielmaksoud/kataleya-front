// export default Cart
import React, { useState, useEffect } from 'react';
import { DataGrid, SortMenuItems } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CookieService from '../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import 'reactjs-popup/dist/index.css';
import { useForm } from "react-hook-form";
import { green } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
import { red} from '@material-ui/core/colors';
import ButtonGroup from "@material-ui/core/ButtonGroup";
function Cart(props) {
  const [Loading, setLoading] = useState(true)
  const [Editing, setEditing] = useState(false)
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("none");
  const[cartItem,setCartItem]=useState([]);
  const [result,setResult]=useState([]);
  const [overallPrice,setOverallPrice]=useState("");
  const[Items,setItems]=useState([]);
 
  function getArraySum(a){
    var total=0;
    for(var i in a) { 
        total += a[i];
    }
    return total;
}
    const useStyles = makeStyles((theme) => ({
      formm: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      rate:{
        display: 'flex',
        justifyContent: 'center',
      },
      input:{
        display: 'flex',
        justifyContent: 'center',
        marginBottom:'1%',
        marginTop:'1%'
      },
      submit: {
        marginLeft:'1%',
        width: "10%",
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: blue['#94aabe'],
        '&:hover': {
          backgroundColor: blue['#003366'],
        },
      },
        ItemsTable: {
          color: 'green',
          position: 'relative',
          zIndex: '0',
          width: '70%',
          height: '70vh',
          marginTop: '1%',
          marginLeft: '0%',
         
        },
        backdrop: {
          zIndex: theme.zIndex.drawer + 1,
          color: 'green',
        },
        manageItems : {
          /* backgroundColor: "rgba(116, 255, 116, 0.145)", */
          height : '86vh',
        }
      }));
      const classes = useStyles();
      const cookie = CookieService.get('Bearer');
   const HandleEdit = () => {
      setEditing(!Editing)
    }
  
    useEffect( () => {
      setLoading(false)
      var configg = {
        method: 'get',
        url: 'http://localhost:8000/api/user/cartItem',
        headers: { 
          'Authorization': `Bearer ${cookie}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
           axios(configg)
          .then(res => {
                // console.log(res.data,"asdasd");
              setCartItem(res.data)
              setResult(cartItem.map(({ price,quantity }) =>Number(price*quantity)))
              setOverallPrice(getArraySum(result))
             
          }).catch(err => {
            console.log(err.request)
          })

    },[]);
console.log(result)
console.log(overallPrice)
  

function handleIncrement(e,id){

let updatedItems = [...cartItem];

let targetedItem = updatedItems.filter((item)=>{
  return item.id === id 
})[0];
console.log("Targeted Item",targetedItem);
targetedItem.quantity += 1;
setResult(cartItem.map(({ price,quantity }) =>Number(price*quantity)))
setOverallPrice(getArraySum(result))
setCartItem(updatedItems);

let headers = {
  'method' : 'POST',
   data : targetedItem,
   headers: {
     'Authorization': `Bearer ${cookie}`,
   }
 };
 axios(`http://localhost:8000/api/user/cartItem/${id}?_method=PUT`, headers)
.then(res => {
    console.log(res.data)
     console.log(cartItem)
})
.catch((error) => {
if(error.response){
  console.log(error);
}
})
}
function handleDecrement(id){
  let updatedItems = [...cartItem];

  let targetedItem = updatedItems.filter((item)=>{
    return item.id === id 
  })[0];
  console.log("Targeted Item",targetedItem);
  targetedItem.quantity -= 1;
  setCartItem(updatedItems);
  setResult(cartItem.map(({ price }) =>Number(price)))
  setOverallPrice(getArraySum(result))
  let headers = {
    'method' : 'POST',
     data : targetedItem,
     headers: {
       'Authorization': `Bearer ${cookie}`,
     }
   };
   axios(`http://localhost:8000/api/user/cartItem/${id}?_method=PUT`, headers)
  .then(res => {
      console.log(res.data)
       console.log(cartItem)
  })
  .catch((error) => {
  if(error.response){
    console.log(error);
  }
  })
}
console.log(cartItem)
  /////////////////////
  const DeleteItem = async (id) => {
      var config = {
      method: 'Delete',
      url: `http://localhost:8000/api/user/cartItem/${id}`,
      headers: { 
        'Authorization': `Bearer ${cookie}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      }};
        axios(config)
        .then(res => {
          console.log(res)
          setCartItem(cartItem.filter(item => item.id !== id))    
        }).catch(err => {
          console.log(err)
        })
        setLoading(false)
  }
    const columns = [
        {
            field: 'image',
            headerName: 'Picture',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <img style={{width: '1', height: '1'}} alt="Remy Sharp" src= {`http://localhost:8000/storage/${params.row.image}`}/>
            ),
        },
        { field: 'name', headerName: 'name', width: 130 },
  { field: 'bottle_size', headerName: 'bottle_size', width: 130 },
  { field: 'price', headerName: 'price', width: 130 },
  { field: 'quantity', headerName: 'quantity', width: 130,
        renderCell:(params)=>(

        <ButtonGroup size="small" aria-label="small outlined button group">
         <Button style={{color:'blue', backgroundColor:'white'}} onClick={(e)=>{  handleIncrement(e,params.row.id)}}>+</Button>
          <Button style={{color:'black', backgroundColor:'white', fontWeight:'30px'}}  disabled>{params.row.quantity}</Button>
          {params.row.quantity==1?<Button   style={{color:'red',backgroundColor:'white'}} disabled onClick={()=>{handleDecrement(params.row.id)}}>-</Button>:<Button   style={{color:'red',backgroundColor:'white'}}  onClick={()=>{handleDecrement(params.row.id)}}>-</Button>}
        
       </ButtonGroup>
        
    
          
           
          
    ),
    
},
     
      {
        field: 'delete',
        headerName: 'Remove',
        sortable: false,
        renderCell: (params) => (
            <Button onClick={()=> DeleteItem(params.row.id)} style={{backgroundColor: '#F76363'}} variant="contained" size="small" alt="Remy Sharp">
                Remove
            </Button>
        ),
      },
 
      
    ];
//     const Submit = async () => {
//       if(Verified === "true"){
//       const data = new FormData();
//       data.append("item_id", ItemId);
//       data.append("cart_id", CartId);
//       //data.append("price", price);
//      data.append('price',price)
//       data.append("bottle_size",size);
//       data.append("image",image);
//       data.append('name',name);
//       try {
//         await axios.post("http://localhost:8000/api/user/cartItem", data, {
//           headers: { 
//             'Authorization': `Bearer ${cookie}`, 
//             'Content-Type': 'application/x-www-form-urlencoded'
//           }
//         }).then((response) => {
//           setmessage(name + " has been added")
//           setdisplay({display: 'inline', color: 'green' })
//           console.log(response.data);
         
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     }else{
//       window.alert("you must sign in to add to cart");
//     };
    
// } ;
const [anchorEl, setAnchorEl] = React.useState(null);
// const handleClick = (event) => {
//   setAnchorEl(event.currentTarget);
  

// };
    console.log(HandleEdit)
    if(Loading){
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
      <>
    <p>Your Items</p>  
    <div className={classes.manageItems} >
    <div className={classes.ItemsTable} >
    {<span style={display}>{message}</span>}
      <DataGrid rows={cartItem} columns={columns} pageSize={8} width="250px"/>
    </div>
    </div>
    <div>Total Price:{overallPrice}LBP</div>
    <Button className="button-profile"  style={{ alignSelf:"center", width:"30%", color:"black", backgroundColor:"lightgray" }} edge="start" aria-label="menu" aria-haspopup="true"  >
             Checkout
             </Button>
    </>
  );
    }
}


export default Cart;