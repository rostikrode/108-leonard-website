import React, {Component} from 'react';
import Button from './Button';
import '../../styles/Filter.css';

export default class Filter extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div className="filter">
        <div className="floating-filter"><Button name="View" /></div>
        <div className="header-filter"></div>
      </div>
    );
  }
}