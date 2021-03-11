import React, { useEffect, useState } from 'react';
import './CardsFeatures.css';
import CardItemFeatures from './CardItemFeature';
import { Link } from 'react-router-dom';
import axios from 'axios';


function CardsFeatures() {
  const [perfume, setPerfume] = useState([])
  const [rate, setRate] = useState(0)
  const [feature, setFeature] = useState([])
  

  const featureItems = [];


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
                  featureItems.push(item)
                 }
                  
                  });
                    
                  setFeature(featureItems.slice(0, 5))
                setRate(res.data.data[1][0].rate)

        }).catch(err => {
          console.log(err.request)
        })
  },[]);

  console.log(feature,'features')


  return (
    <div className='cards__Features'>
      <h1>Featured</h1>
      <div className='cards__Features__container'>
        <ul className='cards__Features__items'>
          {feature.map((data, key) => <CardItemFeatures key={key} data={data} rate={rate} />)}
        </ul>
      </div>
      <div style={{ textAlign: "center" }}>
      
        <Link to='/featured'>
         
        <button className="buttonn">View More</button>
          
        </Link>
        
      </div>
    </div>
  );
}

export default CardsFeatures;