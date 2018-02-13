import React from 'react';

const MultilineText = (props) => {
  return (
    <div>
        {props.text.split('\\n').map((i, key) => {
          if (i.indexOf('\\t') > -1) {
            let newText = i.split('\\t')[1];
            return <p key={key} style={{marginLeft: '30px'}} dangerouslySetInnerHTML={{__html: newText}}/>;
          } else if ((i.indexOf('\\b') > -1)) {
            let newText = i.split('\\b')[1];
            return <p key={key} style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: newText}}/>;
          } else {
            return <p key={key} dangerouslySetInnerHTML={{__html: i}}/>;
          }
        })}
    </div>
  );
}

export default MultilineText;