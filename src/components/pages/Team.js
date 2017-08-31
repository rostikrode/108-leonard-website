import React, {Component} from 'react';
import ComingSoon from '../partials/ComingSoon';
// import '../../styles/Availability.css';

export default class Team extends Component {
  componentDidMount() {
    document.title = "Team Page";
    document.getElementsByTagName('meta').description.content = "Team page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;
    var viewport = document.querySelector("meta[name=viewport]");
    if(viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
    }
  }

  render() {
    return (
      <ComingSoon page="Team" />
    );
  }
}