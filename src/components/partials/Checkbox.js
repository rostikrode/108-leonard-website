import React from 'react';
import '../../styles/Checkbox.css';

const Checkbox = (props) => {
  return (
    <div className="checkbox">
      <input type={props.radio? 'radio' : 'checkbox'} name={props.radio_id ? props.radio_id : props.index} id={`checkbox-${props.index}`} value={props.value} onChange={props.handleCheck} required={props.required} checked={props.checked} tabIndex={props.tabIndex} />
      <label htmlFor={`checkbox-${props.index}`}></label>
    </div>
  );
}

export default Checkbox;