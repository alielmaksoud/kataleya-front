import React, { useEffect, useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Cards() {
  const [perfume, setPerfume] = useState([])
  const [rate, setRate] = useState(0)
  const [menn, setMenn] = useState([])
  const [womenn, setWomenn] = useState([])
  const [unisexx, setUnisexx] = useState([])
  

  const men = [];
  const women = [];
  const unisex = [];


  useEffect( () => {

    var config = {
      method: 'get',
      url: 'http://localhost:8000/api/homeitem'
};
        axios(config)
 /*       second way: axios.get('http://localhost:8000/api/homeitem',) */
        .then(res => {
                setPerfume(res.data.data[0]);
                res.data.data[0].map((item) =>{
                  if (item.category_name=='men'){
                     men.push(item)
                  } else if (item.category_name=='women'){
                    women.push(item)
                 } else  if (item.category_name=='unisex'){
                  unisex.push(item)
               }
                  
                  });
                  setMenn(men)
                  setWomenn(women)
                  setUnisexx(unisex)
                setRate(res.data.data[1][0].rate)

        }).catch(err => {
          console.log(err.request)
        })
  },[]);
  console.log(menn,'men')
  console.log(womenn,'women')
  console.log(unisexx,'unisex')


  return (
    <div className='cards'>
      <h1>Perfumes</h1>
      <div className='cards__container'>
        <ul className='cards__items'>
          {perfume.map((data, key) => <CardItem key={key} data={data} rate={rate} />)}
          
        </ul>

      </div>
      <div style={{ textAlign: "center" }}>
      
        <Link to='/productlist'>
         
          <button className="buttonn">View More</button>
          
        </Link>
        
      </div>
    </div>
  );
}

export default Cards;