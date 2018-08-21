import React from 'react';
import Button from '../partials/Button';
import Img from 'react-image';
import Loader from './Loader';
// import Cookies from 'js-cookie';

import '../../styles/Popup.css';

const Popup = () => {
  return (
    <div className="popup">
    
      <div className="popup-container">
        <button className="close-popup"></button>
        <div className="popup-media">
          <Img src="/images/14_popup/DBOX_108LEONARD_Detail_Interior_Day2.jpg" loader={<Loader />} alt="" />
        </div>
        <div className="popup-content">
          <h3 className="popup-title">New One Bedroom Availability</h3>
          <p className="popup-copy">Prized Tribeca residences<br/>featuring soaring ceiling heights up to 15',<br/>some with classic enfilade arrangements.</p>
          <Button id="popup-call-to-action" idClass="desktop" inverted name="See Availability" dataId="popup-call-to-action" href="/availability" target="_self" />
        </div>
      </div>
      
      <div className="popup-background"></div>
    </div>
  );
};

export default Popup;