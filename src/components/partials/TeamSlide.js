import React from 'react';
import Img from 'react-image';
import Loader from './Loader';

const TextSlide = (props) => {
  return (
    <div className="inner">

      <div className="image-group">
        {props.slide.images.map((image, key) => {
          return (
            <div key={key} className={`image-item ${image.half ? 'half' : 'full'}`}>
              <div
                className="image"
                title={image.caption}
                style={{
                  backgroundImage: `url(${image.url}`
                }} 
              />
              <Img className="image-tag" src={image.url} loader={<Loader />} alt={image.caption} />
              <p className="caption serif-bold">{image.caption}</p>
            </div>
            
          );
        })}
      </div>

      <div className="caption-wrapper">
        <h1 className="title sans-bold">{props.slide.title}</h1>
        <h6 className="subtitle serif">{props.slide.subtitle}</h6>
        <p className="serif">{props.slide.para}</p>
      </div>

    </div>
  );
}

export default TextSlide;