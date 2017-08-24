import React, {Component} from 'react';
import Button from './Button';
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
        <div className="floating-filter"><Button name="View" /></div>
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