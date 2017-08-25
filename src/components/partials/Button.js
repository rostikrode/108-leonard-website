import React from 'react';
import '../../styles/Button.css';

const Button = (props) => {
  return (
    <button ref={props.btnEl} onClick={props.onClick} className={"button sans-light-bold " + (props.disabled ? 'disabled ' : ' ') +  (props.inverted ? 'inverted ' : ' ') + (props.idClass ? props.idClass : '')}><span>{props.name}</span></button>
  );
}

export default Button;