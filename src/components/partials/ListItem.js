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
    this.sqmFormat = this.sqmFormat.bind(this);
  }

  handleCheck(e) {
    console.log(e.target.value);
  }

  delimitNumbers(str) {
    return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
      return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
    });
  }

  sqmFormat(num) {
    return (this.delimitNumbers(parseInt(num * 0.09290304, 10)));
  }

  render() {
    return (
      <div className="list-row" id={this.props.index}>
        <div className="list-cell check-cell">
          <Checkbox value={this.state.value} handleCheck={this.handleCheck} index={this.props.index} />
          <h4 className="res serif-bold">{this.props.residence}</h4>
        </div>
        <div className="mobile-padding list-cell label-with-info">
          <p className="label sans">BEDROOMS</p>
          <p className="info serif">{this.props.bedrooms}</p>
        </div>
        <div className="mobile-padding list-cell label-with-info">
          <p className="label sans">BATHROOMS</p>
          <p className="info serif">{this.props.baths}</p>
        </div>
        <Button idClass="list-cell floorplan-button mobile" inverted name="View Floorplan" />
        <div className="list-cell label-with-info">
          <p className="label sans">INTERIOR SQ FT/M</p>
          <p className="info serif">{this.delimitNumbers(this.props.interior)}/{this.sqmFormat(this.props.interior)}</p>
        </div>
        <div className="list-cell label-with-info">
          <p className="label sans">PRICE</p>
          <p className="info serif">${this.delimitNumbers(this.props.price)}</p>
        </div>
        <div className="list-cell label-with-info hide-for-mobile">
          <p className="label sans">EST MONTHLY C.C.</p>
          <p className="info serif">${this.delimitNumbers(this.props.monthlycc)}</p>
        </div>
        <div className="list-cell label-with-info hide-for-mobile">
          <p className="label sans">EST MONTHLY R.E. TAXES</p>
          <p className="info serif">${this.delimitNumbers(this.props.monthlytaxes)}</p>
        </div>
        <Button idClass="list-cell floorplan-button desktop" inverted name="View Floorplan" />
      </div>
    );
  }
}