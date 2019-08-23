import React, { Component } from "react";

class Magazine extends Component {
  render() {
    return (
      <div style={{ height: "100%" }}>
        <iframe
          allowFullScreen
          allow="fullscreen"
          style={{ border: "none", width: "100%", height: "100%" }}
          src="//e.issuu.com/embed.html?d=original_tribeca_hi-res&u=originaltribeca"
        />
      </div>
    );
  }
}

export default Magazine;
