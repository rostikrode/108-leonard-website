import React from 'react';

const MultilineText = (props) => {
  return (
    <div>
        {props.text.split('\\n').map((i, key) => {
            return <p key={key}>{i}</p>;
        })}
    </div>
  );
}

export default MultilineText;