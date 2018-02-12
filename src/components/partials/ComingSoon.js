import React from 'react';

const ComingSoon = (props) => {
  return (
    <div className="coming-soon">
      <h1 style={{fontSize: '1em'}}>
        {props.availMessage}
      </h1>
    </div>
  );
}

export default ComingSoon;