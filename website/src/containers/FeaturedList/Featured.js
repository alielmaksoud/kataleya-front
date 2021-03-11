import React, { useEffect, useState } from 'react';
import './Featured.css';
import FeaturedItem from './FeaturedItem';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Featured() {
  const [perfume, setPerfume] = useState([])
  const [rate, setRate] = useState(0)
  const [feature, setFeature] = useState([])
  

  const featureItems = [];

  useEffect( () => {

    var config = {
      method: 'get',
      url: 'http://localhost:8000/api/item'
};
        axios(config)
 /*       second way: axios.get('http://localhost:8000/api/homeitem',) */
 .then(res => {
  setPerfume(res.data.data[0]);
  res.data.data[0].map((item) =>{
   if (item.is_offer){
    featureItems.push(item)
   }
    
    });

    setFeature(featureItems)
  setRate(res.data.data[1][0].rate)

}).catch(err => {
console.log(err.request)
})
},[]);




  return (
    <div className='Featured'>
      <h1>Featured</h1>
      <div className='Featured__container'>
        <ul className='Featured__items'>
          {feature.map((data, key) => <FeaturedItem key={key} data={data} rate={rate} />)}
        </ul>
      </div>
      <div style={{ textAlign: "center" }}>
        
      
        
      </div>
    </div>
  );
}

export default Featured;