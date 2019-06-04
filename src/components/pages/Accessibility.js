import React, { Component } from "react";
import MultilineText from "../partials/MultilineText";
import ScrollArrow from "../partials/ScrollArrow";
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
        {this.props.body.map((section, idx) => (
          <div key={`accessibility-section-${idx}`} className="content sans">
            <h3 style={{ fontWeight: "bold" }}>{section.title}</h3>
            <p>{section.content}</p>
          </div>
        ))}
      </div>
    );
  }
}
