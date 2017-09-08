import React from 'react';
import Img from 'react-image';


const Loader = () => {
  return (
    <div className="loading-wrapper"><i className="loading"></i></div>
  );
}

const ImageSlide = (props) => {
  return (
    <div className="inner">
      {props.slide.newsection ? 
          <h3 data-section={props.slide.section} className="newsection mobile-section sans-light-bold">{props.page} |  {props.slide.section}</h3>
        : ''}
        
        <Img src={props.slide.src} loader={<Loader />} alt={props.slide.caption} />
        
      <p className="caption serif-bold" >{props.slide.caption}</p>
    </div>
  );
}

export default ImageSlide;