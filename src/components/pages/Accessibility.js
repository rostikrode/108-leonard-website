import React, { Component } from "react";
import "../../styles/Accessibility.css";

export default class Accessibility extends Component {
  componentWillMount() {
    if (window.location.origin === "https://108leonard.com") {
      window.gtag("config", "UA-113369414-1", {
        page_title: this.props.metaTitle,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }

  componentDidMount() {
    /** meta data for page */
    document.title = this.props.metaTitle;
    if (document.getElementsByTagName("meta").description) {
      document.getElementsByTagName(
        "meta"
      ).description.content = this.props.metaDescription;
      document.querySelector(
        "meta[property='og:description']"
      ).content = this.props.metaDescription;
      document.querySelector(
        "meta[property='og:title']"
      ).content = this.props.metaTitle;
    }
    if (document.querySelector("link[rel='canonical']")) {
      document.querySelector("link[rel='canonical']").href =
        window.location.href;
      document.querySelector("meta[property='og:url']").content =
        window.location.href;
    }
    var viewport = document.querySelector("meta[name=viewport]");
    if (viewport) {
      viewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1, user-scalable=1"
      );
    }
  }

  render() {
    return (
      <div className="accessibility-wrapper">
          <div className="content">
            <h3 style={{ fontWeight: "bold", textTransform: 'uppercase' }}>Website Accessibility Statement</h3>
            <p>108 Leonard is committed to providing a website that is accessible to the widest possible audience in accordance with ADA standards and WCAG guidelines. We are actively working to increase accessibility and usability of our website to everyone.  108 Leonard is committed to providing a positive experience to all of our customers and employees, and we strive to promote accessibility and inclusion. Whether you are using assistive technologies like a screen reader, a magnifier, voice recognition software, or captions for videos, our goal is to make your visit to 108 Leonard’s website a successful and enjoyable experience.</p>
          </div>
          <div className="content">
            <h3 style={{ fontWeight: "bold", textTransform: 'uppercase' }}>Accessibility Assistance</h3>
            <p>If you are using a screen reader or other auxiliary aid or are having difficulty using or accessing any element of this website, please feel free to call us at <a href="tel:2127751080">(212) 775-1080</a> or email us at <a href="mailto:info@108leonard.com">info@108leonard.com</a>. We will work with you to provide the information or service you seek through a communication method that is accessible for you consistent with applicable law (for example, through telephone support).</p>
          </div>
      </div>
    );
  }
}
