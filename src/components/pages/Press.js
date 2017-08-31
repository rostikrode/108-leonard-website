import React, {Component} from 'react';
import ComingSoon from '../partials/ComingSoon';
// import '../../styles/Availability.css';

export default class Press extends Component {
  componentDidMount() {
    document.title = "Press Page";
    document.getElementsByTagName('meta').description.content = "Press page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;
    var viewport = document.querySelector("meta[name=viewport]");
    if(viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
    }
  }

  render() {
    return (
      <ComingSoon page="Press" />
    );
  }
}