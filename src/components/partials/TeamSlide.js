import React from 'react';
import Img from 'react-image';
import Loader from './Loader';

const TextSlide = (props) => {
  return (
    <div className="inner">
    {props.slide.images ? 
      <div className="image-group">
    
          {props.slide.images.map((image, key) => {
            return (
              <div key={key} className={`image-item ${image.half ? 'half' : 'full'}`}>
                <div
                  className="image"
                  title={image.caption}
                  style={{
                    backgroundImage: `url(${image.url})`
                  }} 
                />
                <Img className="image-tag" src={image.url} loader={<Loader />} alt={image.caption} />
                <p className="caption serif-bold">{image.caption}</p>
              </div>
              
            );
          })}
          </div>
        : 
          ''
        }

      <div className="caption-wrapper">
        <h1 className="title sans-bold">{props.slide.title}</h1>
        <h6 className="subtitle serif" dangerouslySetInnerHTML={{__html: props.slide.subtitle}}></h6>
        <p className="serif">{props.slide.para}</p>
      </div>
      {props.slide.title2 ?
        <div className="caption-wrapper second-team">
          <h1 className="title sans-bold">{props.slide.title2}</h1>
          <h6 className="subtitle serif">{props.slide.subtitle2}</h6>
          <p className="serif">{props.slide.para2}</p>
        </div>
        :
        ''
      }
    </div>
  );
}

export default TextSlide;