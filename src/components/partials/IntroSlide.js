import React, {Component} from 'react';

var introslide, activatesubnav;
export default class IntroSlide extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onWindowScroll);
    introslide = this.introSlide;
    activatesubnav = this.props.activateSubnav;

    window.onload = () => {
      this.resizeCaption();
    };

    window.addEventListener('resize', this.resizeCaption);

    this.state = {dimensions: {}};
    this.onImgLoad = this.onImgLoad.bind(this);
  }

  componentWillUpdate() {
    this.resizeCaption();
  }

  componentDidUpdate() {
    this.resizeCaption();
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
    setTimeout(() => {
      var captionWrapper = introslide.querySelector('.inner .caption-wrapper');
      var imageWidth = introslide.querySelector('.inner .image-wrapper img').getBoundingClientRect().width/2;
      var trueImageWidth = imageWidth - 64;
      var trueWindowWidth;

      console.log(this.imgWidth);

      if (window.matchMedia("(min-width: 1024px)").matches) {
        trueWindowWidth = window.innerWidth/2;

        if (trueImageWidth > trueWindowWidth) {
          captionWrapper.style.width = `${trueWindowWidth}px`;
        } else {
          captionWrapper.style.width = `${trueImageWidth}px`;
        }
      } 
      if (window.matchMedia("(min-width: 1366px)").matches) {
        trueWindowWidth = window.innerWidth/2 - 200;

        if (trueImageWidth > trueWindowWidth) {
          captionWrapper.style.width = `${trueWindowWidth}px`;
        } else {
          captionWrapper.style.width = `${trueImageWidth}px`;
        }
      }
    }, 10);
  }
  onImgLoad({target:img}) {
    if (window.matchMedia("(min-width: 1024px)").matches && this !== null)
      this.setState({dimensions:{height:img.offsetHeight, width:img.offsetWidth}});
  }

  render() {
    return (
      <div ref={c => this.introSlide = c }>
        <div className="inner">
          <div className="caption-wrapper" style={{width: this.state !== null ? `${this.state.dimensions.width}px` : 'auto'}}>
            <h1 className="sans-bold">{this.props.intro.title}</h1>
            <p className="serif">{this.props.intro.para}</p>
          </div>
          <div className="image-wrapper">
            <img className="intro-image" src={this.props.introImage} alt={this.props.introImageCaption} onLoad={this.onImgLoad}/>
          </div>
          <p className="caption serif-bold">{this.props.introImageCaption}</p>
        </div>
      </div>     
    );
  }
}

// const ImageTag = (props) => {

//   return (
//     <img className="intro-image" src={this.props.introImage} alt={this.props.introImageCaption}/>
//   );
// }