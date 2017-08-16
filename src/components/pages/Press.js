import React, {Component} from 'react';
import ComingSoon from '../partials/ComingSoon';
// import '../../styles/Availability.css';

export default class Press extends Component {
  componentDidMount() {
    document.title = "Press Page";
    document.getElementsByTagName('meta').description.content = "Press page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;
  }

  render() {
    return (
      <ComingSoon page="Press" />
    );
  }
}