import React, { useEffect, useState } from 'react';
import './Offers.css';
import OffersItem from './OffersItem';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Offers() {
  const [perfume, setPerfume] = useState([])
  const [rate, setRate] = useState(0)
  const [offer, setOffer] = useState([])
  const offerItems = [];

  useEffect( () => {

    var config = {
      method: 'get',
      url: 'http://localhost:8000/api/item'
};
        axios(config)

        
       .then(res => {
         setPerfume(res.data.data[0]);
         res.data.data[0].map((item) =>{
         if (item.is_offer){
         offerItems.push(item)
         }
    
       });

      setOffer(offerItems)
      setRate(res.data.data[1][0].rate)

    }).catch(err => {
        console.log(err.request)
        })
    },[]);
  


  return (
    <div className='Offers'>
      <h1>Offers</h1>
      <div className='Offers__container'>
        <ul className='Offers__items'>
          {offer.map((data, key) => <OffersItem key={key} data={data} rate={rate} />)}
        </ul>
      </div>
      <div style={{ textAlign: "center" }}>
        
      
        
      </div>
    </div>
  );
}

export default Offers;