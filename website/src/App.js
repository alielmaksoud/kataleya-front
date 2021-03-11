import React, { Component, Fragment, useState } from 'react';
import { Switch, Route, Redirect, withRouter,  Link } from 'react-router-dom';


// COMPONENTS
import Layout from './layout/Layout';
import Contact from './containers/Contact/Contact';
import Product from './containers/ProductList/Product';
import Offers from './containers/OfferList/Offers';
import About from './containers/About/About';
import Featured from './containers/FeaturedList/Featured';
import HomePage from './containers/HomePage/HomePage';

////// user
import Profile from './containers/Profile/Profile';
import Signin from './containers/Signin/Signin';
import Signup from './containers/Signin/Signup';
import Protections from './containers/Signin/Protections';


// admin
import Protection from './Dashboard/loginPages/Protection';
import Dashboard from './Dashboard/Dashboard';
import Login from './Dashboard/loginPages/login.js';




function App() {

  
    return (
      <Fragment>
        <Switch>
            <Protection path="/admin" >
                <Dashboard /* pic={pic} */ />
            </Protection>
                <Route  path='/kataleya-admin'>
                  <Login /* picsetting={picsetting} */ />
                </Route>
          <Layout>
            <Route path="/about" component={About} />
            <Route path="/productlist" component={Product} />
            <Route path="/offers" component={Offers} />
            <Route path="/featured" component={Featured} />
            <Route path="/contact" component={Contact} />
            <Route path="/signup" component={Signup} />

            <Protections path="/profile" >
                <Profile />
            </Protections>
              <Route  path='/signin'>
                  <Signin />
              </Route>

            <Route path="/" exact component={HomePage} />
          </Layout>
        </Switch>
         
        
      </Fragment>
    );
  }


export default App;
