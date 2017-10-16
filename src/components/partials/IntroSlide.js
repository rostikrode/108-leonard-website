import React, {Component} from 'react';

var introslide, activatesubnav;
export default class IntroSlide extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onWindowScroll);
    introslide = this.introSlide;
    activatesubnav = this.props.activateSubnav;

    this.resizeCaption();
    window.addEventListener('resize', this.resizeCaption);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onWindowScroll);
    window.removeEventListener('resize', this.resizeCaption);
  }

  onWindowScroll() {
    if (introslide.getBoundingClientRect().bottom >= 102) {
      activatesubnav('');
    }
  }
  resizeCaption() {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setTimeout(() => {
        var captionWrapper = introslide.querySelector('.inner .caption-wrapper');
        var imageWidth = introslide.querySelector('.inner .image-wrapper img').getBoundingClientRect().width / 2;
        captionWrapper.style.width = `calc(${imageWidth}px - 32px - 32px)`;
      }, 400);
    }
  }

  render() {
    return (
      <div ref={c => this.introSlide = c }>
        <div className="inner">
          <div className="caption-wrapper" ref={c => this.captionWrapper = c }>
            <h1 className="sans-bold">{this.props.intro.title}</h1>
            <p className="serif">{this.props.intro.para}</p>
          </div>
          <div className="image-wrapper">
            <img className="intro-image" src={this.props.introImage} alt={this.props.introImageCaption} ref={c => this.image = c }/>
          </div>
          <p className="caption serif-bold">{this.props.introImageCaption}</p>
        </div>
      </div>     
    );
  }
}