import React, {Component} from 'react';
import '../../styles/Residences.css';

export default class Residences extends Component {
  componentDidMount() {
    document.title = "Residences Page";
    document.getElementsByTagName('meta').description.content = "Residences page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;

  }

  render() {
    return (
      <p className="App-intro">
        Residences page here.
      </p>
    );
  }
}