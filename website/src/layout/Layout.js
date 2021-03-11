import React from 'react';
import './Layout.scss';

import Footer from '../components/UI/Footer/Footer';
import NavbarHome from '../containers/Header/NavbarHome/NavbarHome.js'

function Layout(props) {
     
  return (
  <>
    <NavbarHome />

    <main className="main-content">
      {props.children}
    </main>
    <Footer />
  </>
   );
  }


export default Layout;