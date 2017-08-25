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

  handleCheck(e) {
    this.props.onFilterItem(e.currentTarget.value, e.currentTarget.checked);
  }

  onViewClick() {
    var miniArray = [];
    var filter = this.props.filtersArray;

    var filterBeds = (el) =>  {
      var quantityInt = parseInt(quantity, 10);

      if (el.bedrooms === quantityInt) {
        return true;
      } else {
        return false;
      }
    }
    var filterPrice = (el) => {
      var splitQ = quantity.split('-');      
      var rstart = parseInt(splitQ[0], 10) * 1000000;
      var rend = splitQ.length > 1 ? parseInt(splitQ[1], 10) * 1000000: '';
      
      if (rend !== '') {
        if ((el.price <= rend) && (el.price >= rstart)) {
          return true;
        } else {
          return false;
        }
      } else {
        if (el.price >= rstart) {
          return true;  
        } else {
          return false;
        }
      }
    }
    
    for(var f in filter) {
      var quantity = filter[f].split('_')[0];
      var type = filter[f].split('_')[1];
      
      switch(type) {
        case 'bed':
          miniArray.push(this.props.residences.filter(filterBeds));
          break;
        case 'crowncollection':
          miniArray.push(this.props.residences);
          break;
        case 'price':
          miniArray.push(this.props.residences.filter(filterPrice));
          break;
        default:
          console.log('ERROR - filter is not found');
          miniArray.push(this.props.residences);
          break;
      }
    }

    var newSort = [];
    for(var m in miniArray) {
      newSort = newSort.concat(miniArray[m]);
    }
    
    // checking for and removing duplicates from array
    newSort = newSort.filter((el, position) => {
      return newSort.indexOf(el) === position;
    });
    console.log(newSort);

    if(newSort.length > 0) {
      this.props.sendResidences(newSort);
    } else {
      this.props.sendResidences(this.props.residences);
    }
    
  }

  render() {
    return (
      <div className="filter">
        <div className={this.props.filterOverlay ? `floating-filter show` : `floating-filter hide`}>
          <div className="floating-filter-checkbox-wrapper">
            <div className="floating-filter-group">
              <div className="floating-filter-item">  
                <Checkbox value="1_bed" handleCheck={this.handleCheck} index="filter-checkbox-0" />
                <span className="serif">1 Bedroom</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="2_bed" handleCheck={this.handleCheck} index="filter-checkbox-1" />
                <span className="serif">2 bedroom</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="3_bed" handleCheck={this.handleCheck} index="filter-checkbox-2" />
                <span className="serif">3 bedroom</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="4_bed" handleCheck={this.handleCheck} index="filter-checkbox-3" />
                <span className="serif">4 bedroom</span>
              </div>
              <div className="floating-filter-item">
                <Checkbox value="0_crowncollection" handleCheck={this.handleCheck} index="filter-checkbox-4" />
                <span className="serif">crown collection</span>
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