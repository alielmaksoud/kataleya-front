import React, { useEffect, useState } from 'react';
import './CardsOffers.css';
import CardItemOffers from './CardItemOffers';
import { Link } from 'react-router-dom';
import axios from 'axios';


function CardsOffers() {
  const [perfume, setPerfume] = useState([])
  const [rate, setRate] = useState(0)
  const [offer, setOffer] = useState([])
  

  const offerItems = [];


  useEffect( () => {

/*     var config = {
      method: 'get',
      url: 'http://localhost:8000/api/item',
};
        axios(config, {
          params: {
            _limit: 5
           }
        }) */
        axios.get('http://localhost:8000/api/item',{
    params: {
      _limit: 5
     }
  })
        .then(res => {
                setPerfume(res.data.data[0]);
                res.data.data[0].map((item) =>{
                 if (item.is_offer){
                  offerItems.push(item)
                 }
                  
                  });

                  setOffer(offerItems.slice(0, 5))
                setRate(res.data.data[1][0].rate)

        }).catch(err => {
          console.log(err.request)
        })
  },[]);

  console.log(offer,'offerrrssss')


  return (
    <div className='cards__Offers'>
      <h1>Offers</h1>
      <div className='cards__Offers__container'>
        <ul className='cards__Offers__items'>
          {offer.map((data, key) => <CardItemOffers key={key} data={data} rate={rate} />)}
        </ul>
      </div>
      <div style={{ textAlign: "center" }}>
      
        <Link to='/offers'>
         
        <button className="buttonn">View More</button>
          
        </Link>
        
      </div>
    </div>
  );
}

export default CardsOffers;