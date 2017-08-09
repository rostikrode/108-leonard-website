import React, {Component} from 'react';
// import '../../styles/Amenities.css';

export default class Amenities extends Component {
  componentDidMount() {
    document.title = "Amenities Page";
    document.getElementsByTagName('meta').description.content = "Amenities page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;

  }

  render() {
    return (
      <p className="App-intro">
        Amenities page here.
      </p>
    );
  }
}