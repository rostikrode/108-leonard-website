import React from 'react';
import '../../styles/Checkbox.css';

const Checkbox = (props) => {
  return (
    <div className="checkbox">
      <input type={props.radio? 'radio' : 'checkbox'} name={props.radio_id} id={`checkbox-${props.index}`} value={props.value} onChange={props.handleCheck} />
      <label htmlFor={`checkbox-${props.index}`}></label>
    </div>
  );
}

export default Checkbox;