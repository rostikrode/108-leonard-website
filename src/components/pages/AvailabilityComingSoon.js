import React, {Component} from 'react';
import ComingSoon from '../partials/ComingSoon';

export default class AvailabilityComingSoon extends Component {
  componentDidMount() {
    document.title = "Availability Page";
    document.getElementsByTagName('meta').description.content = "Availability page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;

  }

  render() {
    return (
      <ComingSoon page="Availability" />
    );
  }
}