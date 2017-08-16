import React, {Component} from 'react';
import ComingSoon from '../partials/ComingSoon';
// import '../../styles/Contact.css';

export default class Contact extends Component {
  componentDidMount() {
    document.title = "Contact Page";
    document.getElementsByTagName('meta').description.content = "Contact page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;

  }

  render() {
    return (
      <ComingSoon page="Contact" />
    );
  }
}