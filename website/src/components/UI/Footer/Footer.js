import React from 'react';
import './Footer.scss';
import SocialMedia from '../SocialMedia/SocialMedia';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ScrollUpButton from "react-scroll-up-button";
import maps from '../../../assets/icons/maps.png';
import mobile from '../../../assets/icons/mobile.png';
import email from '../../../assets/icons/email.png';
import delivery from '../../../assets/icons/delivery.png';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Kataleya
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const footer = () => (
  <footer className="footer">
    
    <div className="support-section">
      <div className="support-wrapper">
        <div className="support">
          <h4><img className="icons-footer" src={delivery} alt="Delivery" /></h4>
          <p>Inside Beirut 7,000 LBP</p>
          <p>Outside Beirut 10,000 LBP</p>
        </div>
      <div className="about-us">
          <h4><img className="icons-footer" src={email} alt="Email" /></h4>
          <p><a href="mailto:kataleya.parfum@gmail.com">Send us direct Email</a></p>
        </div>
      <div className="Address">
          <h4><img className="icons-footer" src={maps} alt="Address" /></h4>
          <p>Lebaon, Beirut</p>
        </div>
        <div className="online-shop">
          <h4><img className="icons-footer" src={mobile} alt="Phone number" /></h4>
          <p>+961 3079730</p>
        </div>
        
      </div>
      <SocialMedia />
    </div>
    <ScrollUpButton />
    <p className="advertising"> { <Copyright />}</p>
  </footer>
);

export default footer;