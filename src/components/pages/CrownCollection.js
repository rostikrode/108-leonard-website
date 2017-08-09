import React, {Component} from 'react';
// import '../../styles/CrownCollection.css';

export default class CrownCollection extends Component {
  componentDidMount() {
    document.title = "CrownCollection Page";
    document.getElementsByTagName('meta').description.content = "CrownCollection page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;

  }

  render() {
    return (
      <p className="App-intro">
        CrownCollection page here.
      </p>
    );
  }
}