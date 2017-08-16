import React, {Component} from 'react';
import ComingSoon from '../partials/ComingSoon';
// import '../../styles/Availability.css';

export default class Legal extends Component {
  componentDidMount() {
    document.title = "Legal Page";
    document.getElementsByTagName('meta').description.content = "Legal page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;
  }

  render() {
    return (
      <ComingSoon page="Legal" />
    );
  }
}