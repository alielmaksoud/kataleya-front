import React, { Component } from 'react';
import './HomePage.scss';
import Cards from '../Card/Cards';
import CardsFeatures from '../CardFeatures/CardsFeatures';
import CardsOffers from '../CardOffers/CardsOffers';
import Sale from '../../assets/home_page/Sale.jpg';
import slideOne from '../../assets/home_page/kataleya1.jpg';
import slideTwo from '../../assets/home_page/kataleya2.jpg';
import slideThree from '../../assets/home_page/kataleya3.jpg';
import slideFour from '../../assets/home_page/kataleya4.jpg';
import slideFive from '../../assets/home_page/kataleya5.jpg';

const slides = [];
slides.push(slideOne, slideTwo, slideThree, slideFour, slideFive);

class HomePage extends Component {
    

  render() {
    return (
      <>
        
        <div className="home-container">
  
          <div className="header-image">
             <img src={Sale} alt="Logo" />
          </div>



          
          <div className="slider">
            {slides.map(slide => (
              <div key={slide} style={{ backgroundImage: `url('${slide}')` }} className="slide">
                <h3 className="title">New Perfumes</h3>
                <h3 className="subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate!</h3>
              </div>
            ))}
          </div>
      
          <Cards />
       
          <CardsFeatures />
         
          <CardsOffers />
         

        </div>
         
      </>
    )
  }
};



export default HomePage;