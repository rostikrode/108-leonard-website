import React, {Component} from 'react';
import Button from '../partials/Button';
import Checkbox from '../partials/Checkbox';
import '../../styles/ListItem.css';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(e) {
    console.log(e.target.value);
  }

  render() {
    return (
      <div className="list-row">
        <div className="list-cell check-cell">
          <Checkbox value={this.state.value} handleCheck={this.handleCheck} index={this.props.index} />
          <h4 className="res serif-bold">38D</h4>
        </div>
        <div className="mobile-padding list-cell label-with-info">
          <p className="label sans">BEDROOMS</p>
          <p className="info serif">4</p>
        </div>
        <div className="mobile-padding list-cell label-with-info">
          <p className="label sans">BATHROOMS</p>
          <p className="info serif">4</p>
        </div>
        <Button idClass="list-cell floorplan-button mobile" inverted name="View Floorplan" />
        <div className="list-cell label-with-info">
          <p className="label sans">INTERIOR SQ FT/M</p>
          <p className="info serif">2,250</p>
        </div>
        <div className="list-cell label-with-info">
          <p className="label sans">PRICE</p>
          <p className="info serif">$6,500,000</p>
        </div>
        <div className="list-cell label-with-info hide-for-mobile">
          <p className="label sans">EST MONTHLY C.C.</p>
          <p className="info serif">$2,960</p>
        </div>
        <div className="list-cell label-with-info hide-for-mobile">
          <p className="label sans">EST MONTHLY R.E. TAXES</p>
          <p className="info serif">$2,741</p>
        </div>
        <Button idClass="list-cell floorplan-button desktop" inverted name="View Floorplan" />
      </div>
    );
  }
}