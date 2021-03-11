import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { Button } from '@material-ui/core';
import Card from './Popup'

function FeaturedItem(props) {
  let { id, image, name, description,category_name} = props.data
  let {price} = props.data.item_attributes[0]
  let {bottle_size} = props.data.item_attributes[0]
  let {item_attributes} = props.data
  let {rate}= props
  let {data}= props

  

   /*  props.data.item_attributes.map((item) => {
      console.log(item.bottle_size, 'hahahhaahah')
    });  */

 /* console.log( props.data.item_attributes[0].price,'fatima') */

  return (
    <>
      <li className='product__item'>
        <div className='product__item__link'>
          <img
            className='product__item__img'
            alt=''
            src= {  `http://localhost:8000/storage/${image} `}
            
          />
           <div className="product__item__labels">
            <span className="product__item__label">{category_name}</span>

          </div>
          <div className="product__item__title">
            <p>{name+' ★'}</p>
          </div>
          <div className='product__item__info'>
            <p className='product__item__text'>{description}</p>
            <p className='product__item__text'><span style={{ fontWeight: "bold" }} >Price: </span> LBP  {price*rate}</p>
            <p className='product__item__text'><span style={{ fontWeight: "bold" }} >Size: </span> {bottle_size} mL</p>
            
          </div>
             <Popup className="buttonn"  trigger={<Button style={{ alignSelf:"center", width:"100%",color:"black", backgroundColor:"lightgray"}} variant="contained" size="Large" alt="Remy Sharp">Show Details</Button>} modal nested position="right center">
            <Card details={data} rate={rate} item_attributes={item_attributes}/>
            </Popup>

          </div>

      </li>
      
      

    </>

  );
}

export default FeaturedItem;