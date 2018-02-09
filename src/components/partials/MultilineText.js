import React from 'react';

const MultilineText = (props) => {
  return (
    <div>
        {props.text.split('\\n').map((i, key) => {
          if (i.indexOf('\\t') > -1) {
            let newText = i.split('\\t')[1];
            return <p key={key} style={{marginLeft: '30px'}}>{newText}</p>;
          } else if ((i.indexOf('\\b') > -1)) {
            let newText = i.split('\\b')[1];
            return <p key={key} style={{fontWeight: 'bold'}}>{newText}</p>;
          } else {
            return <p key={key}>{i}</p>;
          }
        })}
    </div>
  );
}

export default MultilineText;