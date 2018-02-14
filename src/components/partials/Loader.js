import React from 'react';

const Loader = (props) => {
  return (
    <div className={`loading-wrapper ${props.img ? 'img' : ''}`}><i className="loading"></i></div>
  );
}

export default Loader;