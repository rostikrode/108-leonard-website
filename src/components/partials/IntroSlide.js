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
      <div ref={c => this.introSlide = c }>
        <div className="inner">
          <div className="caption-wrapper">
            <h1 className="sans-bold">{this.props.intro.title}</h1>
            <p className="serif">{this.props.intro.para}</p>
          </div>
          <div className="image-wrapper">
            <img className="intro-image" src={this.props.introImage} alt={this.props.introImageCaption}/>
          </div>
          <p className="caption serif-bold">{this.props.introImageCaption}</p>
        </div>
      </div>     
    );
  }
}