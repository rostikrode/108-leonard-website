import React, {Component} from 'react';
// import '../../styles/Availability.css';

export default class Availability extends Component {
  componentDidMount() {
    document.title = "Availability Page";
    document.getElementsByTagName('meta').description.content = "Availability page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;
  }

  render() {
    return (
      <p className="App-intro">
        Availability page here.
      </p>
    );
  }
}