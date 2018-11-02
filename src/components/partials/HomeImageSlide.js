import React, { Component } from 'react';
import Img from 'react-image';
import Loader from './Loader';

export default class HomeImageSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slidUp: false
    };
  }

  render() {
    return (
      <div className="inner">
        {this.props.slide.newsection ? (
          <h3
            data-section={this.props.slide.section}
            className="newsection mobile-section sans-light-bold"
          >
            {this.props.page} | {this.props.slide.section}
          </h3>
        ) : (
          ''
        )}

        <div className="image-wrapper">
          <Img
            src={
              window.innerWidth > 767
                ? this.props.slide.src
                : this.props.slide.mobileSrc
            }
            loader={<Loader />}
            alt={this.props.slide.caption}
            onLoad={() => {
              this.props.onIntroImgLoad();
            }}
          />
        </div>
        <p className="home-caption serif-bold">{this.props.slide.caption}</p>
      </div>
    );
  }
}
