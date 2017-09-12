import React from 'react';
import '../../styles/Floorplan.css';
import close from '../../assets/close.svg';


const Floorplan = (props) => {
  return (
    <div className={props.fstate ? 'floorplan-overlay show' : 'floorplan-overlay hide'} onClick={(e) => {
      if(e.target.classList.contains('floorplan-overlay')) {
        props.onCloseBtnClick(false)
      }}}>
      <div className="floorplan-content">
        <button className="close-btn" onClick={() => {props.onCloseBtnClick(false)}}><img src={close} alt="close btn" className="close-btn-img" /></button>
        <div className="floorplan-wrapper">
          {/*{props.fresidence}*/}
        </div>
      </div>
    </div>
  );
}

export default Floorplan;