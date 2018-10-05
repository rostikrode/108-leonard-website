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
      floorplanResidenceArray: [],
      planExists: true
    }
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onShareClick = this.onShareClick.bind(this);
  }
  
  componentWillMount() {
    if (window.location.origin === 'https://108leonard.com') {
      window.gtag('config', 'UA-113369414-1', {
        'page_title': '108 Leonard | Available apartments for sale in Tribeca NYC.',
        'page_location': window.location.href,
        'page_path': window.location.pathname
      });
    }
  }

  componentDidMount() {
    this.loadResidences();
    
    setTimeout(() => {
      window.scrollTo(0,0);
    }, 100);

    /** meta data for page */
    document.title = '108 Leonard | Available apartments for sale in Tribeca NYC.';
    if(document.getElementsByTagName('meta').description) {
      document.getElementsByTagName('meta').description.content = 'Please contact the sales gallery for current availability.';
      document.querySelector("meta[property='og:description']").content = 'Please contact the sales gallery for current availability.';
      document.querySelector("meta[property='og:title']").content = '108 Leonard | Available apartments for sale in Tribeca NYC.';
    }
    if (document.querySelector("link[rel='canonical']")) {
      document.querySelector("link[rel='canonical']").href = window.location.href
      document.querySelector("meta[property='og:url']").content = window.location.href
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
    // fetch('https://residences.api.dbxd.com/getunits?projectname=108leonard') /** URL of all res's for testing */
    fetch('https://residences.api.dbxd.com/getunits/available?projectname=108leonard')
    .then(response => response.json())
    .then(json => {
      var parsed = [];
      for (var i in json) {
        if (json[i]) {
          // get the specific floorplan file for PDF or SVG based on both letter AND number
          let number = parseInt(json[i]['unit_num'].split(' (')[0].match(/(\d+|[^\d]+)/g)[0], 10);
          let letter = json[i]['unit_num'].indexOf('PH') > -1 ? json[i]['unit_num'].split(' (')[0] : json[i]['unit_num'].split(' (')[0].match(/(\d+|[^\d]+)/g)[1];
          let residencePDFFileName = letter;
          let residenceSVGFileName = letter;
          switch(letter) {
            case 'A':
              if ((number >= 4) && (number <= 12)) {
                residenceSVGFileName = 'A_4-12';
                residencePDFFileName = 'A_4-12';
              } else {
                residenceSVGFileName = 'A';
                residencePDFFileName = 'A';
              }
              break;
            case 'B':
              if ((number >= 3) && (number <= 6)) {
                residenceSVGFileName = 'B_3-6';
                residencePDFFileName = 'B_3-6';
              } else if ((number >= 7) && (number <= 10)) {
                residenceSVGFileName = 'B_7-10';
                residencePDFFileName = 'B_7-10';
              } else if (number === 12) {
                residenceSVGFileName = 'B_12';
                residencePDFFileName = 'B_12';
              } else if (number === 15) {
                residenceSVGFileName = 'B_15';
                residencePDFFileName = 'B_15';
              } else {
                residenceSVGFileName = 'B';
                residencePDFFileName = 'B';
              }
              break;
            case 'C':
              if ((number >= 3) && (number <= 6)) {
                residenceSVGFileName = 'C_3-6';
                residencePDFFileName = 'C_3-6';
              } else if ((number >= 7) && (number <= 12)) {
                residenceSVGFileName = 'C_7-12';
                residencePDFFileName = 'C_7-12';
              } else if (number === 15) {
                residenceSVGFileName = 'C_15';
                residencePDFFileName = 'C_15';
              } else {
                residenceSVGFileName = 'C';
                residencePDFFileName = 'C';
              }
              break;
            case 'E':
              if ((number >= 4) && (number <= 12)) {
                residenceSVGFileName = 'E_4-12';
                residencePDFFileName = 'E_4-12';
              } else {
                residenceSVGFileName = 'E';
                residencePDFFileName = 'E';
              }
              break;
            case 'F':
              if ((number >= 3) && (number <= 12)) {
                residenceSVGFileName = 'F_3-12';
                residencePDFFileName = 'F_3-12';
              } else {
                residenceSVGFileName = 'F';
                residencePDFFileName = 'F';
              }
              break;
            case 'G':
              if ((number >= 7) && (number <= 12)) {
                residenceSVGFileName = 'G_7-12';
                residencePDFFileName = 'G_7-12';
              } else {
                residenceSVGFileName = 'G';
                residencePDFFileName = 'G';
              }
              break;
            case 'H':
              if ((number >= 4) && (number <= 6)) {
                residenceSVGFileName = 'H_4-6';
                residencePDFFileName = 'H_4-6';
              } else if ((number >= 7) && (number <= 12)) {
                residenceSVGFileName = 'H_7-12';
                residencePDFFileName = 'H_7-12';
              } else {
                residenceSVGFileName = 'H';
                residencePDFFileName = 'H';
              }
              break;
            case 'I':
              if ((number >= 4) && (number <= 11)) {
                residenceSVGFileName = 'I_4-11';
                residencePDFFileName = 'I_4-11';
              }
              break;
            case 'J':
              if ((number >= 4) && (number <= 11)) {
                residenceSVGFileName = 'J_4-11';
                residencePDFFileName = 'J_4-11';
              } else if (number === 3) {
                residenceSVGFileName = 'J_3';
                residencePDFFileName = 'J_3';
              }
              break;
            case 'K':
              if ((number >= 3) && (number <= 11)) {
                residenceSVGFileName = 'K_3-11';
                residencePDFFileName = 'K_3-11';
              }
              break;
            case 'L':
              if ((number >= 4) && (number <= 6)) {
                residenceSVGFileName = 'L_4-6';
                residencePDFFileName = 'L_4-6'; 
              } else if ((number >= 7) && (number <= 12)) {
                residenceSVGFileName = 'L_7-12';
                residencePDFFileName = 'L_7-12';
              } else {
                residenceSVGFileName = 'L';
                residencePDFFileName = 'L';
              }
              break;
            case 'M':
              if ((number >= 5) && (number <= 12)) {
                residenceSVGFileName = 'M_5-12';
                residencePDFFileName = 'M_5-12';
              } else {
                residenceSVGFileName = 'M';
                residencePDFFileName = 'M';
              }
              break;
            case 'N':
              if ((number >= 6) && (number <= 12)) {
                residenceSVGFileName = 'N_6-12';
                residencePDFFileName = 'N_6-12';
              } else {
                residenceSVGFileName = 'N';
                residencePDFFileName = 'N';
              }
              break;
            case 'P':
              if ((number >= 7) && (number <= 12)) {
                residenceSVGFileName = 'P_7-12';
                residencePDFFileName = 'P_7-12';
              } else if (number === 4) {
                residenceSVGFileName = 'P_4';
                residencePDFFileName = 'P_4';
              } else if (number === 5) {
                residenceSVGFileName = 'P_5';
                residencePDFFileName = 'P_5';
              } else if (number === 6) {
                residenceSVGFileName = 'P_6';
                residencePDFFileName = 'P_6';
              } else {
                residenceSVGFileName = 'P';
                residencePDFFileName = 'P';
              }
              break;
            case 'R':
              if ((number >= 7) && (number <= 12)) {
                residenceSVGFileName = 'R_7-12';
                residencePDFFileName = 'R_7-12';
              } else if (number === 4) {
                residenceSVGFileName = 'R_4';
                residencePDFFileName = 'R_4';
              } else if (number === 6) {
                residenceSVGFileName = 'R_6';
                residencePDFFileName = 'R_6';
              }
              break;
            default: 
              residenceSVGFileName = letter;
              residencePDFFileName = letter;
              break;
          }

          var res = '';
          if (json[i]['unit_num'].indexOf('(') > -1) {
            if (json[i]['unit_num'].indexOf('PH') > -1) {
              res = json[i]['unit_num'].split(' (')[0].split(' (')[0].split('PH')[1];
            } else {
              res = json[i]['unit_num'].split(' (')[0];
            }
          } else {
            res = json[i]['unit_num'];
          }
            
          parsed[i] = {
            'id': json[i]['idx'],
            'residence': res,
            'number': json[i]['unit_num'].indexOf('PH') > -1 ? 0 : parseInt(json[i]['unit_num'].split(' (')[0].match(/(\d+|[^\d]+)/g)[0], 10),
            'letter': json[i]['unit_num'].indexOf('PH') > -1 ? json[i]['unit_num'].split(' (')[0] : json[i]['unit_num'].split(' (')[0].match(/(\d+|[^\d]+)/g)[1],
            'residenceSVGFileName': residenceSVGFileName,
            'residencePDFFileName': residencePDFFileName,
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

      let bedSorted = parsed.sort(
        function(a, b){
            return a['bedrooms']-b['bedrooms'];
        }
      );
      let priceSorted = bedSorted.sort(
        function(a, b){
            return a['price']-b['price'];
        }
      );
      this.setState({
        residences: tempRes > 0 ? tempRes : priceSorted,
        allResidences: priceSorted
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
      var newFilteredArray = [];
      var filterRes;
      if (residences === 'penthouses') {
        filterRes = (el) => {
          if ((el['number'] > 13) || (el.residence.indexOf('EAST') > -1)|| (el.residence.indexOf('NORTH') > -1)) {
            return true;
          } else {
            return false;
          }
        };

        newFilteredArray = newFilteredArray.concat(this.state.residences.filter(filterRes));

      } else if (residences === 'one-bedroom') {
        filterRes = (el) => {
          if (el['bedrooms'] === 1) {
            return true;
          } else {
            return false;
          }
        };

        newFilteredArray = newFilteredArray.concat(this.state.residences.filter(filterRes));
      } else {
        var resArray = residences.split('&');
        filterRes = (el) => {
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
      }

      
      this.setState({
        residences: newFilteredArray
      });
    }, 1500);
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
    // sort DESC
    if (arrow === 'up') { 
      newSort = this.state.residences.sort(
        function(a, b){
          if (filter === 'residence') {
            return that.naturalSorter(a[filter], b[filter]);
          } else {
            return parseInt(b[filter], 10)-parseInt(a[filter], 10);
          }
        }
      );
    } else {
      //sort ASC
      newSort = this.state.residences.sort(
        function(a, b){
          if (filter === 'residence') {
            return that.naturalSorter(b[filter], a[filter]);
          } else {
            return parseInt(a[filter], 10) - parseInt(b[filter], 10); 
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

  onViewFloorplanClick(fresidence, fstate, fexists) {
    this.setState({
      activeResidence: fresidence,
      floorplanState: fstate,
      planExists: fexists
    });

    for(var r = 0; r < this.state.residences.length; r++) {
      if (this.state.residences[r].id === fresidence) {
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
          <Floorplan 
            {...this.state.floorplanResidenceArray} 
            intft={this.delimitNumbers(this.state.floorplanResidenceArray.interior)} 
            intsqm={this.sqmFormat(this.state.floorplanResidenceArray.interior)} 
            hasext={this.state.floorplanResidenceArray.exterior > 1 ? true : false}
            extft={this.delimitNumbers(this.state.floorplanResidenceArray.exterior)} 
            extsqm={this.sqmFormat(this.state.floorplanResidenceArray.exterior)} 
            fstate={true} 
            onCloseBtnClick={this.onCloseBtnClick.bind(this)} 
            planExists={this.state.planExists} 
          />
      </VelocityComponent>
      </div>
    );
  }
}