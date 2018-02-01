import React from 'react';
import Img from 'react-image';
import Loader from './Loader';

const ImageSlide = (props) => {
  return (
    <div className="inner">
      {props.slide.newsection ? 
          <h3 data-section={props.slide.section} className="newsection mobile-section sans-light-bold">{props.page} |  {props.slide.section}</h3>
        : ''}
        
        <div className="image-wrapper">
          <Img src={props.slide.src} loader={<Loader />} alt={props.slide.caption} />
        </div>
        <p className="caption serif-bold" >{props.slide.caption}</p>
    </div>
  );
}

export default ImageSlide;