import React, {Component} from 'react';
import ComingSoon from '../partials/ComingSoon';
// import '../../styles/Availability.css';

export default class Team extends Component {
  componentDidMount() {
    document.title = "Team Page";
    document.getElementsByTagName('meta').description.content = "Team page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;
  }

  render() {
    return (
      <ComingSoon page="Team" />
    );
  }
}