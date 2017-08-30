import React from 'react';
import { withRouter } from 'react-router-dom'
import '../../styles/Button.css';

const Button = (props) => {
  return (
    <button ref={props.btnEl} onClick={props.onClick} data-id={props.dataId} className={"button sans-light-bold " + (props.disabled ? 'disabled ' : ' ') +  (props.inverted ? 'inverted ' : ' ') + (props.idClass ? props.idClass : '')}><span>{props.name}</span></button>
  );
}

export default withRouter(Button);