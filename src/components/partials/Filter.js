import React, {Component} from 'react';
import Button from './Button';
import down_arrow_small from '../../assets/down_arrow_small.svg';
import '../../styles/Filter.css';

export default class Filter extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div className="filter">
        <div className="floating-filter"><Button name="View" /></div>
        <div className="header-filter list-row">
            <div className="filter-row list-cell">
              <span className="sans filter-label">Residence</span>
              <img src={down_arrow_small} alt="downward arrow icon"/>
            </div>
            <div className="margin filter-row list-cell">
              <span className="sans filter-label">Beds</span>
              <img src={down_arrow_small} alt="downward arrow icon"/>
            </div>
            <div className="margin filter-row list-cell">
              <span className="sans filter-label">Baths</span>
              <img src={down_arrow_small} alt="downward arrow icon"/>
            </div>
            <div className="margin filter-row list-cell">
              <span className="sans filter-label">Interior <br/>sq ft/m</span>
              <img src={down_arrow_small} alt="downward arrow icon"/>
            </div>
            <div className="margin filter-row list-cell">
              <span className="sans filter-label">Price</span>
              <img src={down_arrow_small} alt="downward arrow icon"/>
            </div>
            <div className="margin filter-row list-cell hide-for-mobile flex">
              <span className="sans filter-label">est monthly <br/>c.c.</span>
              <img src={down_arrow_small} alt="downward arrow icon"/>
            </div>
          
            <div className="filter-row list-cell hide-for-mobile flex">
              <span className="sans filter-label">est monthly r.e. <br/>taxes</span>
              <img src={down_arrow_small} alt="downward arrow icon"/>
            </div>
            <div className="filter-row list-cell floorplan-space-keeper"></div>
        </div>
      </div>
    );
  }
}