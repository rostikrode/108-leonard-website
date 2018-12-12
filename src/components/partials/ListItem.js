import React, { Component } from 'react';
import Button from '../partials/Button';
import Checkbox from '../partials/Checkbox';
import '../../styles/ListItem.css';

var checkArray = [];
export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      floorplanState: true,
      clickedFloorplan: false,
      planExists: true,
      residenceSVGFileName: '',
      residencePDFFileName: ''
    };

    this.handleCheck = this.handleCheck.bind(this);
    this.sqmFormat = this.sqmFormat.bind(this);
    this.onViewFloorplanClick = this.onViewFloorplanClick.bind(this);
    this.onCloseBtnClick = this.onCloseBtnClick.bind(this);
  }
  componentDidMount() {
    checkArray = [];

    // if(window.matchMedia('(max-width: 1023px)').matches) {
    //   this.setState({
    //     clickedFloorplan: true
    //   });
    // } else {
    this.setState({
      clickedFloorplan: false
    });
    // }
  }

  handleCheck(e) {
    if (e.currentTarget.checked) {
      checkArray.push(e.currentTarget.value);
    } else {
      checkArray.pop(e.currentTarget.value);
    }
    this.props.sendCheckboxes(checkArray);
  }

  delimitNumbers(str) {
    return (str + '').replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
      return (
        (b.charAt(0) > 0 && !(c || '.').lastIndexOf('.')
          ? b.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
          : b) + c
      );
    });
  }

  sqmFormat(num) {
    return this.delimitNumbers(parseInt(num * 0.09290304, 10));
  }

  onViewFloorplanClick(e) {
    let id = e.currentTarget.dataset.id;

    // check if floorplan exists
    let exists = true;
    // CHANGE URL FOR MASTER IF UPDATING FLOORPLANS "108leonard-full.dev.dbxd.com -> 108leonard.com"
    fetch(
      `https://s3.amazonaws.com/108leonard-full.dev.dbxd.com/images/5_availability/pdfs/residence_${
        this.props.residencePDFFileName
      }.pdf`
    )
      .then(res => {
        if (res.status >= 400) {
          exists = false;
        } else {
          exists = true;
        }

        this.setState({
          floorplanState: true,
          clickedFloorplan: false,
          planExists: exists
        });

        this.props.onViewFloorplanClick(id, true, this.state.planExists);
      })
      .catch(err => {
        exists = false;
        console.log(`error fetching local floorplan ${err}`);

        this.setState({
          floorplanState: true,
          clickedFloorplan: false,
          planExists: exists
        });

        this.props.onViewFloorplanClick(id, true, this.state.planExists);
      });

    if (window.location.origin === 'https://108leonard.com') {
      window.gtag('event', 'view_floorplan', {
        event_category: 'Availability',
        event_label: `Residence ${this.props.residence}`
      });
    }
  }

  onCloseBtnClick() {
    this.setState({
      floorplanState: false,
      clickedFloorplan: false
    });
  }

  render() {
    return (
      <div
        className="list-row"
        id={this.props.id}
        ref={e => (this.listrow = e)}
      >
        <div className="list-row-wrapper">
          <div className="list-cell check-cell">
            <Checkbox
              value={this.props.residence}
              handleCheck={this.handleCheck}
              index={this.props.index}
            />
            {this.props.number > 13 ? (
              <h4 className="res sans">
                <span className="desktop-hidden">PENTHOUSE </span>
                <span className="mobile-hidden">PH</span> {this.props.residence}
              </h4>
            ) : this.props.residence.indexOf('EAST') > -1 ||
              this.props.residence.indexOf('NORTH') > -1 ? (
              <h4 className="res sans">
                <span className="desktop-hidden">PENTHOUSE </span>
                <span className="mobile-hidden">PH</span> {this.props.residence}
              </h4>
            ) : (
              <h4 className="res sans">
                <span className="desktop-hidden">RESIDENCE </span>
                {this.props.residence}
              </h4>
            )}
          </div>
          <div className="mobile-padding list-cell label-with-info">
            <p className="label sans">BEDROOMS</p>
            <p className="info serif">{this.props.bedrooms}</p>
          </div>
          <div className="mobile-padding list-cell label-with-info">
            <p className="label sans">BATHROOMS</p>
            <p className="info serif">{this.props.baths}</p>
          </div>
          <div className="list-cell label-with-info">
            <p className="label sans">INTERIOR SQ FT/M</p>
            <p className="info serif">
              {this.delimitNumbers(this.props.interior)}/
              {this.sqmFormat(this.props.interior)}
            </p>
          </div>
          <div className="list-cell label-with-info">
            <p className="label sans">
              {this.props.exterior < 1 ? '' : 'EXTERIOR SQ FT/M'}
            </p>
            <p className="info serif">
              {this.props.exterior < 1
                ? ''
                : `${this.delimitNumbers(this.props.exterior)}/${this.sqmFormat(
                    this.props.exterior
                  )}`}
            </p>
          </div>
          <div className="list-cell label-with-info">
            <p className="label sans">PRICE</p>
            <p className="info serif">
              ${this.delimitNumbers(this.props.price)}
            </p>
          </div>
          <div className="list-cell label-with-info hide-for-mobile">
            <p className="label sans">EST MONTHLY C.C.</p>
            <p className="info serif">
              ${this.delimitNumbers(this.props.monthlycc)}
            </p>
          </div>
          <div className="list-cell label-with-info hide-for-mobile">
            <p className="label sans">EST MONTHLY R.E. TAXES</p>
            <p className="info serif">
              ${this.delimitNumbers(this.props.monthlytaxes)}
            </p>
          </div>
          <Button
            id={this.props.id}
            idClass="list-cell floorplan-button desktop"
            inverted
            name="View Floorplan"
            dataId={this.props.id}
            onClick={this.onViewFloorplanClick}
          />
        </div>
      </div>
    );
  }
}
