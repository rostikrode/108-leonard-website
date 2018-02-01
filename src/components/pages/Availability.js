import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import Filter from '../partials/Filter';
import List from '../partials/List';
import Button from '../partials/Button';
import '../../styles/Availability.css';
import ScrollArrow from '../partials/ScrollArrow';
import Floorplan from '../partials/Floorplan';
import {VelocityComponent} from 'velocity-react';

var tempRes = [];
var fromChild = false;
export default class Availability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      residences: tempRes > 0 ? tempRes : [],
      allResidences: [],
      filterOverlay: false,
      filtersArray: [],
      activeResidence: '',
      floorplanState: '',
      checkboxArray: [],
      disabledShare: true,
      floorplanResidenceArray: []
    }
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onShareClick = this.onShareClick.bind(this);
  }
  
  componentWillMount() {
    window.gtag('config', 'UA-113369414-1', {
      'page_title': this.props.metaTitle,
      'page_location': window.location.href,
      'page_path': window.location.pathname
    });
  }

  componentDidMount() {
    this.loadResidences();
    
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
    var viewport = document.querySelector("meta[name=viewport]");
    if(viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
    }

    // dealing with child residence slugs
    if(this.props.match && this.props.match.params.residence) {
      this.showCertainResidences(this.props.match.params.residence);
    }
  }

  loadResidences() {
    fetch('https://residences.api.dbxd.com/getunits/available?projectname=108leonard')
    .then(response => response.json())
    .then(json => {
      var parsed = [];
      for (var i in json) {
        if (json[i]) {
          parsed[i] = {
            'id': json[i]['idx'],
            'residence': json[i]['unit_num'].indexOf('(') > -1 ? json[i]['unit_num'].split(' (')[0] : json[i]['unit_num'],
            'letter': json[i]['unit_num'].indexOf('PH') > -1 ? json[i]['unit_num'].split(' (')[0] : json[i]['unit_num'].split(' (')[0].match(/(\d+|[^\d]+)/g)[1],
            'bedrooms': parseInt(json[i]['unit_type'].split('/')[0].split('BR')[0], 10),
            'baths': parseFloat(json[i]['unit_type'].split('/')[1].split('BA')[0]),
            'price': Math.round(json[i]['price']),
            'interior': json[i]['sqft'],
            'exterior': json[i]['outdoor_sqft'],
            "monthlycc": json[i]['common_charges'],
            'monthlytaxes': json[i]['taxes']
          };
        }
      }
      this.setState({
        residences: tempRes > 0 ? tempRes : parsed,
        allResidences: parsed
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(fromChild) {
      tempRes = nextState.residences;
    } else {
      tempRes = [];
    }
    return true;

  }

  showCertainResidences(residences) {
    setTimeout(() => {
      var resArray = residences.split('&');
      var newFilteredArray = [];

      var filterRes = (el) => {
        if (el['residence'] === resArray[res]) {
          return true;
        } else {
          return false;
        }
      };
      for(var res in resArray) {
        if (resArray[res]) {
          newFilteredArray = newFilteredArray.concat(this.state.residences.filter(filterRes));
        }
      }
      this.setState({
        residences: newFilteredArray
      });
    }, 1000);
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

    this.scrollArrow.hideShowDownArrow();

    // removing the children residences from the URL if they are there
    // 3 is normal for /availability/, however /availability/13-A&14-A/ etc... has 4
    if(window.location.pathname.split('/').length > 3) {
      // this.props.history.push('/availability/'); 
      window.history.pushState('', '', '/availability/');
      fromChild = true;
    } else {
      fromChild = false;
    }
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
    console.log(fresidence, fstate);
    this.setState({
      activeResidence: fresidence,
      floorplanState: fstate
    });

    for(var r = 0; r < this.state.residences.length; r++) {
      if (this.state.residences[r].residence === fresidence) {
        this.setState({
          floorplanResidenceArray: this.state.residences[r]
        });
      }
    }
  }
  onCloseBtnClick(fstate) {
    this.setState({
      floorplanState: fstate
    });
  }
  sendCheckboxes(checkArray) {
    this.setState({
      checkboxArray: checkArray
    });
    if(checkArray.length > 0) {
      this.setState({
        disabledShare: false
      });
    } else {
      this.setState({
        disabledShare: true
      });
    }
  }
  onShareClick() {
    this.props.history.push({
      pathname: '/share/',
      state: {checkboxArray: this.state.checkboxArray}
    });
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
      <div className="availability-page">
        <div className="filter-button-wrapper">
          <Button btnEl={el=>this.btnElement = el} name="Filter" onClick={this.onFilterClick} idClass="filter-button" />
          <Button name="Share" disabled={this.state.disabledShare} onClick={this.onShareClick} />
        </div>
        <div className="list-wrapper">
          <Filter onViewClick={this.onViewClick.bind(this)} filterOverlay={this.state.filterOverlay} residences={this.state.residences} allResidences={this.state.allResidences}  sendResidences={this.sendResidences.bind(this)} filtersArray={this.state.filtersArray} onFilterItem={this.onFilterItem.bind(this)} onFilterColumn={this.onFilterColumn.bind(this)} />
          <List listElement={el=>this.listElementRef = el} residences={this.state.residences} onViewFloorplanClick={this.onViewFloorplanClick.bind(this)} sendCheckboxes={this.sendCheckboxes.bind(this)} />
        </div>
        <ScrollArrow ref={i => {this.scrollArrow = i;}} listElementRef={this.listElementRef}  />

        {/* TOOD: try to move floorplan to here */}
        <VelocityComponent ref={e => {this.floorplanwrapper = e}} 
          duration={500} 
          easing={this.state.floorplanState ? 'ease-out': 'ease-in'}
          animation={this.state.floorplanState ? 'fadeIn': 'fadeOut'}>
          <Floorplan {...this.state.floorplanResidenceArray} intft={this.delimitNumbers(this.state.floorplanResidenceArray.interior)} intsqm={this.sqmFormat(this.state.floorplanResidenceArray.interior)} fstate={true} onCloseBtnClick={this.onCloseBtnClick.bind(this)} />
      </VelocityComponent>
      </div>
    );
  }
}