import React, {Component} from 'react';
import Button from '../partials/Button';
import Checkbox from '../partials/Checkbox';
import Floorplan from '../partials/Floorplan';
import '../../styles/ListItem.css';

var checkArray = [];
export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      floorplanState: true
    };

    this.handleCheck = this.handleCheck.bind(this);
    this.sqmFormat = this.sqmFormat.bind(this);
    this.onViewFloorplanClick = this.onViewFloorplanClick.bind(this);
    this.onCloseBtnClick = this.onCloseBtnClick.bind(this);
  }
  componentDidMount() {
    checkArray = [];


    /**
     * 
     * TODO: how to show multiple floorplan plugins at once
     */
      var fp_img = 'https://via.placeholder.com/2048x1401/FFFFFF/A1C6CF/?text=PH+' + this.props.residence
      , pdf = 'https://via.placeholder.com/2048x1401/FFFFFF/A1C6CF/?text=PH+' + this.props.residence + '+PDF'
      , title = ''
      , zoom = true
      , zoom_info = 'Click floorplan (or use your fingers) to zoom in and out.'
      , mouse = false
      , mouse_info = ''
      , click = true
      , click_info = 'When zoomed in, click and drag mouse to pan the floorplan.'
      , selector = '.floorplan-overlay .floorplan-content .floorplan-wrapper';
      window.floorplan_plugin(fp_img, pdf, title, zoom, zoom_info, mouse, mouse_info, click, click_info, selector);
  }

  handleCheck(e) {
    if(e.currentTarget.checked) {
      checkArray.push(e.currentTarget.value) 
    } else {
      checkArray.pop(e.currentTarget.value) 
    }
    this.props.sendCheckboxes(checkArray);
  }

  delimitNumbers(str) {
    return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
      return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
    });
  }

  sqmFormat(num) {
    return (this.delimitNumbers(parseInt(num * 0.09290304, 10)));
  }

  onViewFloorplanClick(e) {
    this.setState({
      floorplanState: true
    });
    this.props.onViewFloorplanClick(e.currentTarget.dataset.id, true);
  }

  onCloseBtnClick() {
    this.setState({
      floorplanState: false
    });
  }

  render() {
    return (
      <div className="list-row" id={this.props.index} ref={(e) => this.listrow = e }>
        <div className="list-row-wrapper">
          <div className="list-cell check-cell">
            <Checkbox value={this.props.residence} handleCheck={this.handleCheck} index={this.props.index} />
            <h4 className="res serif-bold">{this.props.residence}</h4>
          </div>
          <div className="list-cell-group">
            <div className="mobile-padding list-cell label-with-info">
              <p className="label sans">BEDROOMS</p>
              <p className="info serif">{this.props.bedrooms}</p>
            </div>
            <div className="mobile-padding list-cell label-with-info">
              <p className="label sans">BATHROOMS</p>
              <p className="info serif">{this.props.baths}</p>
            </div>
          </div>
          <div className="list-cell-group">
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
          </div>
          <Button idClass="list-cell floorplan-button desktop" inverted name="View Floorplan" dataId={this.props.residence} onClick={this.onViewFloorplanClick} />
        </div>
        <Floorplan fresidence={this.props.residence} fstate={true} onCloseBtnClick={this.onCloseBtnClick.bind(this)} />
      </div>
    );
  }
}