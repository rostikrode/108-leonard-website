import React, {Component} from 'react';
import List from '../partials/List';
import Button from '../partials/Button';
import '../../styles/Availability.css';

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
        <List />
      </div>
    );
  }
}