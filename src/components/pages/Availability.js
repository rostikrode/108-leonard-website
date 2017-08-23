import React, {Component} from 'react';
import Filter from '../partials/Filter';
import List from '../partials/List';
import Button from '../partials/Button';
import '../../styles/Availability.css';
import down_arrow_large from '../../assets/down_arrow_large.svg';

export default class Availability extends Component {
  componentDidMount() {
    document.title = "Availability Page";
    document.getElementsByTagName('meta').description.content = "Availability page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;
  }

  render() {
    return (
      <div className="availability-page">
        <div className="filter-button-wrapper">
          <Button name="Filter" />
          <Button name="Share" disabled />
        </div>
        <div className="list-wrapper">
          <Filter />
          <List />
        </div>
        <img src={down_arrow_large} className="arrow-down-scroll" alt="downward arrow icon"/>
      </div>
    );
  }
}