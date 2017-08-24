import React, {Component} from 'react';
import Button from './Button';
import Checkbox from '../partials/Checkbox';
import down_arrow_small from '../../assets/down_arrow_small.svg';
import '../../styles/Filter.css';

export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.onFilterColumn = this.onFilterColumn.bind(this);
  }

  onFilterColumn(e) {
    var thisArrow = e.currentTarget.children[1];
    var thisFilter = e.currentTarget.dataset.filter;
    // flip all previous arrows back down (only one arrow can be active at a time)
    var rows = document.getElementsByClassName('filter-row');
    for(var i = 0; i < rows.length; i++) {
      if(rows[i].children && rows[i].children.length > 0) {
        var filter = rows[i].dataset.filter;
        if (filter !== thisFilter) {
          if(rows[i].children[1].className === 'up') {
            rows[i].children[1].className = '';
          }
        }
      }
    }
    // toggle arrow flip
    thisArrow.classList.toggle('up');

    this.props.onFilterColumn(e.currentTarget.dataset.filter, thisArrow.className);
  }

  render() {
    return (
      <div className="filter">
        <div className={this.props.filterOverlay ? `floating-filter show` : `floating-filter hide`}>
          <div className="floating-filter-checkbox-wrapper">
            <div className="floating-filter-group">
              <div className="floating-filter-item">  
                <Checkbox value="1-bed" handleCheck={this.handleCheck} index="filter-checkbox-0" />
                <span className="serif">1 Bedroom</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="2-bed" handleCheck={this.handleCheck} index="filter-checkbox-1" />
                <span className="serif">2 bedroom</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="3-bed" handleCheck={this.handleCheck} index="filter-checkbox-2" />
                <span className="serif">3 bedroom</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="4-bed" handleCheck={this.handleCheck} index="filter-checkbox-3" />
                <span className="serif">4 bedroom</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="crown-collection" handleCheck={this.handleCheck} index="filter-checkbox-4" />
                <span className="serif">crown collection</span>
              </div>
            </div>
            <div className="floating-filter-group">
              <div className="floating-filter-item">
                <Checkbox value="$1-2M" handleCheck={this.handleCheck} index="filter-checkbox-5" />
                <span className="serif">$1-2M</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="$2-3M" handleCheck={this.handleCheck} index="filter-checkbox-6" />
                <span className="serif">$2-3M</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="$3-4M" handleCheck={this.handleCheck} index="filter-checkbox-7" />
                <span className="serif">$3-4M</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="$4-5M" handleCheck={this.handleCheck} index="filter-checkbox-8" />
                <span className="serif">$4-5M</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="$5M" handleCheck={this.handleCheck} index="filter-checkbox-9" />
                <span className="serif">$5M</span>
              </div>
            </div>
          </div>
          <Button name="View" />
        </div>
        
        <div className="header-filter list-row">
            <button data-filter="residence" className="filter-row list-cell" onClick={this.onFilterColumn}>
              <span className="sans filter-label">Residence</span>
              <img src={down_arrow_small} alt="downward arrow icon" />
            </button>
            <button data-filter="bedrooms" className="margin filter-row list-cell" onClick={this.onFilterColumn}>
              <span className="sans filter-label">Beds</span>
              <img src={down_arrow_small} alt="downward arrow icon" />
            </button>
            <button data-filter="baths" className="margin filter-row list-cell" onClick={this.onFilterColumn}>
              <span className="sans filter-label">Baths</span>
              <img src={down_arrow_small} alt="downward arrow icon" />
            </button>
            <button data-filter="interior" className="margin filter-row list-cell" onClick={this.onFilterColumn}>
              <span className="sans filter-label">Interior <br/>sq ft/m</span>
              <img src={down_arrow_small} alt="downward arrow icon" />
            </button>
            <button data-filter="price" className="margin filter-row list-cell" onClick={this.onFilterColumn}>
              <span className="sans filter-label">Price</span>
              <img src={down_arrow_small} alt="downward arrow icon" />
            </button>
            <button data-filter="monthlycc" className="margin filter-row list-cell hide-for-mobile flex" onClick={this.onFilterColumn}>
              <span className="sans filter-label">est monthly <br/>c.c.</span>
              <img src={down_arrow_small} alt="downward arrow icon" />
            </button>
          
            <button data-filter="monthlytaxes" className="filter-row list-cell hide-for-mobile flex" onClick={this.onFilterColumn}>
              <span className="sans filter-label">est monthly r.e. <br/>taxes</span>
              <img src={down_arrow_small} alt="downward arrow icon" />
            </button>
            <div className="filter-row list-cell floorplan-space-keeper"></div>
        </div>
      </div>
    );
  }
}