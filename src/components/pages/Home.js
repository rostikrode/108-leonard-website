import React, {Component} from 'react';
import Img from 'react-image';
import {VelocityComponent, velocityHelpers} from 'velocity-react';
import Cookies from 'js-cookie';
import 'velocity-animate/velocity.ui';
import Loader from '../partials/Loader';
import '../../styles/Home.css';


export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyPlayed: false
    }
  }

  componentWillMount() {
    window.gtag('config', 'UA-113369414-1', {
      'page_title': this.props.metaTitle,
      'page_location': window.location.href,
      'page_path': window.location.pathname
    });  

    if (Cookies.get('alreadyPlayed')) {
      this.setState({
        alreadyPlayed: true
      });
    } else {
      this.setState({
        alreadyPlayed: false
      }, () => {
        Cookies.set('alreadyPlayed', true);
      });
    }
  }
  
  componentDidMount() {
    /** meta data for page */
    document.title = this.props.metaTitle;
    if(document.getElementsByTagName('meta').description) {
      document.getElementsByTagName('meta').description.content = this.props.metaDescription
    }
    if (document.querySelector("link[rel='canonical']")) {
      document.querySelector("link[rel='canonical']").href = window.location.href
    }
    var viewport = document.querySelector("meta[name=viewport]");
    if(viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
    }  
  }

  render() {
    return (
      <div className="home">
        {this.state.alreadyPlayed ?
          ''
        : 
          <IntroAnimation {...this.props.animation} />
        }
        <div className="home-wrapper">
          <Img src={this.props.image} loader={<Loader />} alt={this.props.caption} />
        </div>
      </div>
    );
  }
}


var fadeOutFullText = {
  runOnMount: true,
  animation: 'fadeOut',
  duration: 2000,
  delay: 2000
}

var fadeOutLine1 = {
  runOnMount: true,
  animation: 'fadeOut',
  duration: 1000,
  delay: 2000+1000
}

var fadeOutLine2 = {
  runOnMount: true,
  animation: 'fadeOut',
  duration: 1000,
  delay: 2000+1000+1000
}

var fadeOutLogoText = {
  runOnMount: true,
  animation: 'fadeOut',
  duration: 1000,
  delay: 2000+1000+1000+1000
}
var fadeOutLine3 = {
  runOnMount: true,
  animation: 'fadeOut',
  duration: 2000,
  delay: 2000+1000+1000+1000
}
var fadeOutImage1 = {
  runOnMount: true,
  animation: 'fadeOut',
  duration: 2500,
  delay: 2000+1000+1000+1000
}

var sequence, fadeOutOverlay;
if (window.matchMedia("(min-width: 1366px)").matches) {
  sequence = velocityHelpers.registerEffect({
    defaultDuration: 3000,
    calls: [
      [{translateX: '20em'}],
      ['fadeOut'],
    ]
  });
  fadeOutOverlay = {
    runOnMount: true,
    animation: sequence,
    duration: 2000,
    delay: 2000+1000+1000+1000+2500
  }
} else if (window.matchMedia("(min-width: 1024px)").matches) {
  sequence = velocityHelpers.registerEffect({
    defaultDuration: 3000,
    calls: [
      ['fadeOut'],
    ]
  });
} else {
  sequence = velocityHelpers.registerEffect({
    defaultDuration: 2000,
    calls: [
      [{translateY: '7%'}],
      ['fadeOut']
    ]
  });
  fadeOutOverlay = {
    runOnMount: true,
    animation: sequence,
    duration: 2000,
    delay: 2000+1000+1000+1000+2500+800
  }
}


const IntroAnimation = (props) => {
  return (
    <VelocityComponent {...fadeOutOverlay}>
      <div className="animation-wrapper">
        <div className="slide text-slide">
          <VelocityComponent {...fadeOutFullText}>
            <img src={props.text1} alt="108 Leonard full text" />
          </VelocityComponent>
          <VelocityComponent {...fadeOutFullText}>
            <div className="bg"/>
          </VelocityComponent>
        </div>
        <VelocityComponent>
          <div className="slide text-slide">
            <VelocityComponent {...fadeOutLogoText}>
              <img src={props.text2} alt="108 Leonard text logo" />
            </VelocityComponent>
          </div>
        </VelocityComponent>
        <VelocityComponent {...fadeOutLine1}>
          <div className="slide" style={{backgroundImage: `url(${props.linework1}`, zIndex: 1}} />
        </VelocityComponent>
          <VelocityComponent {...fadeOutLine2}>
          <div className="slide" style={{backgroundImage: `url(${props.linework2}`, zIndex: 10}} />
        </VelocityComponent>
        <VelocityComponent {...fadeOutLine3}>
          <div className="slide" style={{backgroundImage: `url(${props.linework3}`, zIndex: 100}} />
        </VelocityComponent>
        <VelocityComponent  {...fadeOutImage1}>
          <div className="slide" style={{backgroundImage: `url(${props.image1}`, zIndex: 1000}} />
        </VelocityComponent>
        <VelocityComponent>
          <div className="slide" style={{backgroundImage: `url(${props.image2}`, zIndex: 10000}} />
        </VelocityComponent>
      </div>
    </VelocityComponent>
  );
}