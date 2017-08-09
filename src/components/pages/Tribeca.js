import React, {Component} from 'react';
// import '../../styles/Tribeca.css';

export default class Tribeca extends Component {
  componentDidMount() {
    document.title = "Tribeca Page";
    document.getElementsByTagName('meta').description.content = "Tribeca page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;

  }

  render() {
    return (
      <p className="App-intro">
        Tribeca page here.
      </p>
    );
  }
}