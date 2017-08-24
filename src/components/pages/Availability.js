import React, {Component} from 'react';
import Filter from '../partials/Filter';
import List from '../partials/List';
import Button from '../partials/Button';
import '../../styles/Availability.css';
import down_arrow_large from '../../assets/down_arrow_large.svg';

export default class Availability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      residences: this.props.residences
    }
  }
  
  componentDidMount() {
    /** meta data for page */
    document.title = this.props.metaTitle;
    if(document.getElementsByTagName('meta').description) {
      document.getElementsByTagName('meta').description.content = this.props.metaDescription
    }
    if (document.querySelector("link[rel='canonical']")) {
      document.querySelector("link[rel='canonical']").href = window.location.href
    }
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
      newSort = this.props.residences.sort(
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
      newSort = this.props.residences.sort(
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

  //   if ($filter.find('.down-triangle').hasClass('up-facing')) {
  //     // has up class, sort it down
  //     resData.sort(
  //         function(a, b){
  //             return a[filter]-b[filter];
  //         }
  //     );
  // } else if ($filter.find('.down-triangle').hasClass('down-facing')) {
  //     // has down class, sort it up
  //     resData.sort(
  //         function(a, b){
  //             return b[filter]-a[filter];
  //         }
  //     );
  // } else {
  //     // has no class, sort it down by default
  //     resData.sort(
  //         function(a, b){
  //             return a[filter]-b[filter];
  //         }
  //     );
    // }
  }

  render() {
    return (
      <div className="availability-page">
        <div className="filter-button-wrapper">
          <Button name="Filter" />
          <Button name="Share" disabled />
        </div>
        <div className="list-wrapper">
          <Filter onFilterColumn={this.onFilterColumn.bind(this)} />
          <List residences={this.state.residences} />
        </div>
        <img src={down_arrow_large} className="arrow-down-scroll" alt="downward arrow icon"/>
      </div>
    );
  }
}