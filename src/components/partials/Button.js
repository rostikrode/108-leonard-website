import React from 'react';
import { withRouter } from 'react-router-dom'
import '../../styles/Button.css';

const Button = (props) => {
  return (
    <button id={props.id} ref={props.btnEl} onClick={props.onClick} data-id={props.dataId} className={"button sans-light-bold " + (props.disabled ? 'disabled ' : ' ') +  (props.inverted ? 'inverted ' : ' ') + (props.idClass ? props.idClass : '')}>
      {props.href ? 
        <a href={props.href} className="sans-light-bold" target="_blank" rel="noopener noreferrer">{props.name}</a>
      :
        <span>{props.name}</span>
      }
    </button>
  );
}

export default withRouter(Button);