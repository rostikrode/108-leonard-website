import React, {Component} from 'react';
import Button from './Button';
import Checkbox from '../partials/Checkbox';
import down_arrow_small from '../../assets/down_arrow_small.svg';
import '../../styles/Filter.css';

export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.onFilterColumn = this.onFilterColumn.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.onViewClick = this.onViewClick.bind(this);
  }

  onFilterColumn(e) {
    var thisArrow = e.currentTarget.children[1];
    var thisFilter = e.currentTarget.dataset.filter;
    // flip all previous arrows back down (only one arrow can be active at a time)
    var rows = this.filterlist.querySelectorAll('.filter-row');
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

  handleCheck(e) {
    this.props.onFilterItem(e.currentTarget.value, e.currentTarget.checked);
  }

  onViewClick() {
    var filter = this.props.filtersArray;
    var tempArray = this.props.allResidences;
    var newArray = [];
    var beds = [];
    var price = [];

    for(var f = 0; f < filter.length; f++) {
      var quantity = filter[f].split('_')[0];
      var type = filter[f].split('_')[1];
      switch(type) {
        case 'bedrooms':
          var quantityInt = parseInt(quantity, 10);
          beds.push(quantityInt);
          break;
        case 'penthouses':
          // no idea
          beds.push('penthouses');
          break;
        case 'price':
          var splitQ = quantity.split('-');      
          var rstart = parseInt(splitQ[0], 10) * 1000000;
          var rend = splitQ.length > 1 ? parseInt(splitQ[1], 10) * 1000000: false;
          price.push([rstart, rend]);
          break;
        default:
          console.log('ERROR - filter is not found');
          break;
      }
    }

    var filterBeds = (el) => {
      if (index === 'penthouses') {
        if ((el.residence.indexOf('EAST') > -1) || (el.residence.indexOf('NORTH') > -1)) {
          return el;
        } else {
          return el.number > 13;
        }
      } else {
        return el.bedrooms === index;
      }
    }
    var filterPriceBeds = (el) => {
      var start = index[0];
      var end = index[1];
      if (end) {
        return (el.price >= start) && (el.price <= end);
      } else {
        return el.price >= start;
      }
    }
    /** selected only BEDS */
    if ((beds.length > 0) && (price.length <= 0)) {
      for(var bed in beds) {
        var index = beds[bed];
        newArray = newArray.concat(tempArray.filter(filterBeds));
      }
    } 
    /** selected BEDS and PRICE */
    if ((beds.length > 0) && (price.length > 0)) {
      var bedArray = [];
      var priceBedArray = [];
      for(bed in beds) {
        index = beds[bed];
        bedArray = bedArray.concat(tempArray.filter(filterBeds));
      }
      for(var p in price) {
        index = price[p];
        priceBedArray = priceBedArray.concat(bedArray.filter(filterPriceBeds));
      }
      newArray = priceBedArray;
    }
    /** selected only PRICE */
    if ((price.length > 0) && (beds.length <= 0)) {
      for(var p2 in price) {
        index = price[p2];
        newArray = newArray.concat(tempArray.filter(filterPriceBeds));
      }
    }
    
    var newSort = newArray;
    /** NO DUPES!!! */
    newSort = newSort.filter((el, position) => {
      return newSort.indexOf(el) === position;
    });
    
    if(newSort.length > 0) {
      this.props.sendResidences(newSort);
    } else {
      this.props.sendResidences(this.props.allResidences);
    }
    this.props.onViewClick(false);
  }

  closeFilter() {
    this.props.onViewClick(false);
  }

  render() {
    return (
      <div className="filter">
        <div className={this.props.filterOverlay ? `floating-filter show` : `floating-filter hide`}>
          <div className="floating-filter-checkbox-wrapper">
            <div className="floating-filter-group">
              <div className="floating-filter-item">  
                <Checkbox value="1_bedrooms" handleCheck={this.handleCheck} index="filter-checkbox-0" />
                <span className="serif">1 Bedroom</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="2_bedrooms" handleCheck={this.handleCheck} index="filter-checkbox-1" />
                <span className="serif">2 bedroom</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="3_bedrooms" handleCheck={this.handleCheck} index="filter-checkbox-2" />
                <span className="serif">3 bedroom</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="4_bedrooms" handleCheck={this.handleCheck} index="filter-checkbox-3" />
                <span className="serif">4 bedroom</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="0_penthouses" handleCheck={this.handleCheck} index="filter-checkbox-4" />
                <span className="serif">Penthouses</span>
              </div>
            </div>
            <div className="floating-filter-group">
              <div className="floating-filter-item">
                <Checkbox value="1-2_price" handleCheck={this.handleCheck} index="filter-checkbox-5" />
                <span className="serif">$1-2M</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="2-3_price" handleCheck={this.handleCheck} index="filter-checkbox-6" />
                <span className="serif">$2-3M</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="3-4_price" handleCheck={this.handleCheck} index="filter-checkbox-7" />
                <span className="serif">$3-4M</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="4-5_price" handleCheck={this.handleCheck} index="filter-checkbox-8" />
                <span className="serif">$4-5M</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="5_price" handleCheck={this.handleCheck} index="filter-checkbox-9" />
                <span className="serif">$5M+</span>
              </div>
            </div>
          </div>
          <Button name="View" onClick={this.onViewClick} />
        </div>

        {this.props.filterOverlay ? <div className="close-filter-overlay" onClick={this.closeFilter.bind(this)}/>: ''}
        
        <div className="header-filter list-row" ref={e => this.filterlist = e}>
            <button data-filter="residence" className="filter-row list-cell" onClick={this.onFilterColumn}>
              <span className="sans filter-label">Residence</span>
              <img src={down_arrow_small} alt="downward arrow icon" />
            </button>
            <button data-filter="bedrooms" className="filter-row list-cell" onClick={this.onFilterColumn}>
              <span className="sans filter-label">Beds</span>
              <img src={down_arrow_small} alt="downward arrow icon" />
            </button>
            <button data-filter="baths" className="filter-row list-cell" onClick={this.onFilterColumn}>
              <span className="sans filter-label">Baths</span>
              <img src={down_arrow_small} alt="downward arrow icon" />
            </button>
            <button data-filter="interior" className="filter-row list-cell" onClick={this.onFilterColumn}>
              <span className="sans filter-label">Interior <br/>sq ft/m</span>
              <img src={down_arrow_small} alt="downward arrow icon" />
            </button>
            <button data-filter="exterior" className="filter-row list-cell" onClick={this.onFilterColumn}>
              <span className="sans filter-label">Exterior <br/>sq ft/m</span>
              <img src={down_arrow_small} alt="downward arrow icon" />
            </button>
            <button data-filter="price" className="filter-row list-cell" onClick={this.onFilterColumn}>
              <span className="sans filter-label">Price</span>
              <img src={down_arrow_small} alt="downward arrow icon" />
            </button>
            <button data-filter="monthlycc" className="filter-row list-cell hide-for-mobile flex" onClick={this.onFilterColumn}>
              <span className="sans filter-label">est monthly <br/>c.c.</span>
              <img src={down_arrow_small} alt="downward arrow icon" />
            </button>
          
            <button data-filter="monthlytaxes" className="filter-row list-cell hide-for-mobile flex" onClick={this.onFilterColumn}>
              <span className="sans filter-label">est monthly r.e. taxes</span>
              <img src={down_arrow_small} alt="downward arrow icon" />
            </button>
            <div className="filter-row list-cell floorplan-space-keeper"></div>
        </div>
      </div>
    );
  }
}