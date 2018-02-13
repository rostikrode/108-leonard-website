import React, {Component} from 'react';

var introslide, activatesubnav;
export default class IntroSlide extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onWindowScroll);
    introslide = this.introSlide;
    activatesubnav = this.props.activateSubnav;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  onWindowScroll() {
    if (introslide.getBoundingClientRect().bottom >= 102) {
      activatesubnav('');
    }
  }

  render() {
    return (
      <div className="div" ref={c => this.introSlide = c }>
        <div className="inner">
          <div className="image-wrapper">
            <img className="desktop intro-image" src={this.props.introImage} alt={this.props.introImageCaption} onLoad={this.onImgLoad}/>
            <img className="mobile intro-image" src={this.props.introImageMobile} alt={this.props.introImageCaption} onLoad={this.onImgLoad}/>
            <div className="caption-wrapper">
              <h1 className="sans-bold">{this.props.intro.title}</h1>
              <p className="serif" dangerouslySetInnerHTML={{__html: this.props.intro.para}}></p>
            </div>
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