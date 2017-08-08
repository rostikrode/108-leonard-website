import React, {Component} from 'react';
import '../../styles/Home.css';

export default class Home extends Component {
  componentDidMount() {
    document.title = "Home Page";
    document.getElementsByTagName('meta').description.content = "Site's home page."
    document.querySelector("link[rel='canonical']").href = window.location.href;
  }

  render() {
    return (
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    );
  }
}