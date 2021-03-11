import React from 'react';
import './SocialMedia.scss';

import fb from '../../../assets/social_media/fb.png';
import instagram from '../../../assets/social_media/instagram.png';


const SocialMedia = () => (
  <div className="social-media">
    <div className="icons-wrapper">
      {<a href="https://www.facebook.com/kataleyaparfum" target="_blank" rel="noopener noreferrer"><img src={fb} alt="facebook" /></a>}
      {<a href="https://www.instagram.com/kataleya_perfumery/?igshid=16zoove6hu799" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="instagram" /></a>}
      
    </div>
  </div>
);

export default SocialMedia;