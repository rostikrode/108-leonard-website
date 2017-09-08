import React from 'react';

const TextSlide = (props) => {
  return (
    <div className="inner">
      <div className="caption-wrapper">
        <h1 className="sans-bold upper">{props.slide.title}</h1>
        <p className="serif">{props.slide.para}</p>
      </div>
    </div>
  );
}

export default TextSlide;