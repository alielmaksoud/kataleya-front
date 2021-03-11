import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { Button } from '@material-ui/core';
import Card from './Popup'

function CardItemFeatures(props) {
  let { id, image, name, description,category_name} = props.data
  let {price} = props.data.item_attributes[0]
  let {bottle_size} = props.data.item_attributes[0]
  let {item_attributes} = props.data
  let {rate}= props
  let {data}= props
  

   /*  props.data.item_attributes[0].map((item) => {
      console.log(item.price, 'hahahhaahah')
    }); */

   /* console.log( props.data.item_attributes[0].price,'fatima') */

  return (
    <>
      <li className='cards__Features__item'>
        <div className='cards__Features__item__link'>
          <img
            className='cards__Features__item__img'
            alt=''
            src= {  `http://localhost:8000/storage/${image} `}
            
          />
           <div className="cards__Features__item__labels">
            <span className="cards__Features__item__label">{category_name}</span>
            

          </div>
          <div className="cards__Features__item__title">
            <p>{name+' ★'} </p>
          </div>
          <div className='cards__Features__item__info'>
            <p className='cards__Features__item__text'>{description}</p>
            <p className='cards__Features__item__text'><span style={{ fontWeight: "bold" }} >Price: </span> {price*rate}</p>
            <p className='cards__Features__item__text'><span style={{ fontWeight: "bold" }} >Size: </span> {bottle_size} mL</p>
            
          </div>
          <Popup  trigger={<Button className="buttonn"  style={{ alignSelf:"center",fontSize: "small", width:"100%",color:"black", backgroundColor:"lightgray"}} variant="contained" size="Large" alt="Remy Sharp">Show Details</Button>} modal nested position="right center">
            <Card details={data} rate={rate} item_attributes={item_attributes}/>
            </Popup>

        </div>
        
      </li>
      

    </>

  );
}

export default CardItemFeatures;