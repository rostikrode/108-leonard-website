import React from 'react';
import {NavLink} from 'react-router-dom';
import Img from 'react-image';
import closeThin from '../../assets/close_thin.svg';

import '../../styles/Popup.css';

const Popup = (props) => {
  return (
    <div className="popup">
    
      <div className="popup-container">
        <button className="close-popup" onClick={props.closePopup}><img src={closeThin} alt="close popup icon"/></button>
        <div className="popup-media">
          <Img src="/images/14_popup/DBOX_108LEONARD_Detail_Interior_Day2.jpg" alt="" />
        </div>
        <div className="popup-content">
          <h3 className="popup-title publication sans-light-bold upper">New One Bedroom Availability</h3>
          <p className="popup-copy serif">Prized Tribeca residences<br/>featuring soaring ceiling heights up to 15',<br/>some with classic enfilade arrangements.</p>
          <NavLink onClick={props.closePopup} strict exact to="/availability" className="button sans-light-bold inverted" id="popup-call-to-action">
            See Availability
          </NavLink>
        </div>
      </div>
      
      <div className="popup-background" onClick={props.closePopup}></div>
    </div>
  );
};

export default Popup;