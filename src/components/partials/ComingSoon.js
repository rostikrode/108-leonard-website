import React from 'react';

const ComingSoon = (props) => {
  return (
    <div className="coming-soon">
      <h1 style={{fontSize: '1em'}} dangerouslySetInnerHTML={{__html: props.availMessage}}/>
    </div>
  );
}

export default ComingSoon;