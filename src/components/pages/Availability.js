import React, {Component} from 'react';
import Filter from '../partials/Filter';
import List from '../partials/List';
import Button from '../partials/Button';
import FloorplanOverlay from '../partials/FloorplanOverlay';
import '../../styles/Availability.css';
import down_arrow_large from '../../assets/down_arrow_large.svg';

export default class Availability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      residences: this.props.residences,
      filterOverlay: false,
      filtersArray: [],
      activeResidence: '',
      floorplanState: ''
    }
    this.onFilterClick = this.onFilterClick.bind(this);
  }
  
  componentDidMount() {
    setTimeout(() => {
      window.scrollTo(0,0);
    }, 100);
    /** meta data for page */
    document.title = this.props.metaTitle;
    if(document.getElementsByTagName('meta').description) {
      document.getElementsByTagName('meta').description.content = this.props.metaDescription
    }
    if (document.querySelector("link[rel='canonical']")) {
      document.querySelector("link[rel='canonical']").href = window.location.href
    }

    this.hideShowDownArrow();

    // dealing with child residence slugs
    if(this.props.match.params.residence) {
      this.showCertainResidences(this.props.match.params.residence);
    }
  }

  showCertainResidences(residences) {
    var resArray = residences.split('&');
    var newFilteredArray = [];

    var filterRes = (el) => {
      if (el.residence === resArray[res]) {
        return true;
      } else {
        return false;
      }
    };
    for(var res in resArray) {
      newFilteredArray = newFilteredArray.concat(this.state.residences.filter(filterRes));
    }
    this.setState({
      residences: newFilteredArray
    });
  }

  naturalSorter(as, bs){
    var a, b, a1, b1, i= 0, n, L,
    rx=/(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
    if(as=== bs) return 0;
    a= as.toLowerCase().match(rx);
    b= bs.toLowerCase().match(rx);
    L= a.length;
    while(i<L){
        if(!b[i]) return 1;
        a1= a[i];
        b1= b[i++];
        if(a1!== b1){
            n= a1-b1;
            if(!isNaN(n)) return n;
            return a1>b1? 1:-1;
        }
    }
    return b[i]? -1:0;
  }

  onFilterColumn(filter, arrow) {
    var newSort;
    var that = this;
    // sort ASC
    if (arrow === 'up') { 
      newSort = this.state.residences.sort(
        function(a, b){
          if (filter === 'residence') {
            return that.naturalSorter(a[filter], b[filter]);
          } else {
            return parseInt(a[filter], 10) - parseInt(b[filter], 10);
          }
        }
      );
    } else {
      //sort DESC
      newSort = this.state.residences.sort(
        function(a, b){
          if (filter === 'residence') {
            return that.naturalSorter(b[filter], a[filter]);
          } else {
            return parseInt(b[filter], 10)-parseInt(a[filter], 10);
          }
        }
      );
    }

    this.setState({
      residences: newSort
    });
  }

  onFilterClick(e) {
    e.currentTarget.classList.toggle('blue');

    if (this.state.filterOverlay) {
      this.setState({
        filterOverlay: false
      });
    } else {
      this.setState({
        filterOverlay: true
      });
    }
  }
  onViewClick(open) {
    // closing the filter overlay when clicking on view btn as well
    this.btnElement.classList.toggle('blue');
    this.setState({
      filterOverlay: open
    });

    this.hideShowDownArrow();
    // removing the children residences from the URL if they are there
    // 3 is normal for /availability/, however /availability/13-A&14-A/ etc... has 4
    if(window.location.pathname.split('/').length > 3) {
      this.props.history.replace('/availability/'); 
    }
  }

  hideShowDownArrow() {
    // remove down arrow if no scrolling exists
    setTimeout(() => {
      if(this.listElementRef) {
        if(this.listElementRef.scrollHeight > this.listElementRef.clientHeight) {
          this.dwnArrow.classList.remove('hide');
        } else {
          this.dwnArrow.classList.add('hide');
        }
      }
    }, 100);
  }

  onFilterItem(filter, checked) {
    if(checked) {
      this.setState({
        filtersArray: this.state.filtersArray.concat(filter)
      });
    } else {
      this.setState({
        filtersArray: this.state.filtersArray.filter(function(i) { return i !== filter })
      });
    }
  }

  sendResidences(resArray) {
    this.setState({
      residences: resArray
    });
  }

  onViewFloorplanClick(fresidence, fstate) {
    this.setState({
      activeResidence: fresidence,
      floorplanState: fstate
    });

    var fp_img = 'https://via.placeholder.com/2048x1401/FFFFFF/A1C6CF/?text=PH+' + fresidence
    , pdf = 'https://via.placeholder.com/2048x1401/FFFFFF/A1C6CF/?text=PH+' + fresidence + '+PDF'
    , title = 'Residence ' + fresidence
    , zoom = true
    , zoom_info = 'Click floorplan (or use your fingers) to zoom in and out.'
    , mouse = false
    , mouse_info = ''
    , click = true
    , click_info = 'When zoomed in, click and drag mouse to pan the floorplan.'
    , selector = '.floorplan-wrapper';
    // (fp_img, pdf, title, zoom, zoom_info, mouse, mouse_info, click, click_info, selector)
    window.floorplan_plugin(fp_img, pdf, title, zoom, zoom_info, mouse, mouse_info, click, click_info, selector);
  }
  onCloseBtnClick(fstate) {
    this.setState({
      floorplanState: fstate
    });
  }

  render() {
    return (
      <div className="availability-page">
        <FloorplanOverlay fresidence={this.state.activeResidence} fstate={this.state.floorplanState} onCloseBtnClick={this.onCloseBtnClick.bind(this)} />
        <div className="filter-button-wrapper">
          <Button btnEl={el=>this.btnElement = el} name="Filter" onClick={this.onFilterClick} idClass="filter-button" />
          <Button name="Share" disabled />
        </div>
        <div className="list-wrapper">
          <Filter onViewClick={this.onViewClick.bind(this)} filterOverlay={this.state.filterOverlay} residences={this.props.residences} sendResidences={this.sendResidences.bind(this)} filtersArray={this.state.filtersArray} onFilterItem={this.onFilterItem.bind(this)} onFilterColumn={this.onFilterColumn.bind(this)} />
          <List listElement={el=>this.listElementRef = el} residences={this.state.residences} onViewFloorplanClick={this.onViewFloorplanClick.bind(this)} />
        </div>
        <img ref={el=>this.dwnArrow = el} src={down_arrow_large} className="arrow-down-scroll" alt="downward arrow icon"/>
      </div>
    );
  }
}