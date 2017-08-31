import React, {Component} from 'react';
import ComingSoon from '../partials/ComingSoon';

export default class AvailabilityComingSoon extends Component {
  componentDidMount() {
    document.title = "Availability Page";
    document.getElementsByTagName('meta').description.content = "Availability page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;
    var viewport = document.querySelector("meta[name=viewport]");
    if(viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
    }

  }

  render() {
    return (
      <ComingSoon page="Availability" />
    );
  }
}