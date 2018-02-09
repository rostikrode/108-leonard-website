import React, {Component} from 'react';
import {VelocityComponent, velocityHelpers} from 'velocity-react';
import Cookies from 'js-cookie';
import 'velocity-animate/velocity.ui';
import '../../styles/Home.css';


export default class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyPlayed: true
    }
  }

  componentWillMount() {
    if (window.location.pathname === '/') {
      if (Cookies.get('alreadyPlayed')) {
        this.setState({
          alreadyPlayed: true
        });
      } else {
        this.setState({
          alreadyPlayed: false
        }, () => {
          Cookies.set('alreadyPlayed', true, {expires: 14});
        });
      }
    }
  }

  render() {
    return (
      <div className="home animation">
        {this.state.alreadyPlayed ?
          ''
        : 
          <IntroAnimation {...this.props.animation} />
        }
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
    defaultDuration: 2000,
    calls: [
      ['fadeOut'],
    ]
  });
  fadeOutOverlay = {
    runOnMount: true,
    animation: sequence,
    duration: 2500,
    delay: 2000+1000+1000+1000+2500+300
  }
} else {
  let downPx = '0'; 
  let delay = 0;
  if (window.matchMedia("(min-width: 1024px)").matches) {
    downPx = '0';
    delay = 0;
  } else {
    downPx = '66px';
    delay = 300;
  }
  sequence = velocityHelpers.registerEffect({
    defaultDuration: 1000,
    calls: [
      [{translateY: downPx}],
      ['fadeOut']
    ]
  });
  fadeOutOverlay = {
    runOnMount: true,
    animation: sequence,
    duration: 2500,
    delay: 2000+1000+1000+1000+2500+delay
  }
}


const IntroAnimation = (props) => {
  return (
    <VelocityComponent {...fadeOutOverlay}>
      <div className="animation-wrapper">
        <div className="slide text-slide" style={{zIndex: 900}}>
            <div className="text-slide-wrapper" style={{zIndex: 900}}>
              <VelocityComponent {...fadeOutFullText}>
                <img src={props.text1} alt="108 Leonard full text" style={{zIndex: 11}} />
              </VelocityComponent>
            </div>
            <div className="text-slide-wrapper" style={{zIndex: 900}}>
              <VelocityComponent {...fadeOutLogoText}>
                <img src={props.text2} alt="108 Leonard text logo" style={{zIndex: 12}} />
              </VelocityComponent>
            </div>
          <VelocityComponent {...fadeOutFullText}>
            <div className="bg" style={{backgroundColor: '#FFFFFF', zIndex: 10}}/>
          </VelocityComponent>
        </div>
        <VelocityComponent {...fadeOutLine1}>
          <div className="slide" style={{backgroundImage: 'url('+props.linework1+')', zIndex: 800}} />
        </VelocityComponent>
          <VelocityComponent {...fadeOutLine2}>
          <div className="slide" style={{backgroundImage: 'url('+props.linework2+')', zIndex: 700}} />
        </VelocityComponent>
        <VelocityComponent {...fadeOutLine3}>
          <div className="slide" style={{backgroundImage: 'url('+props.linework3+')', zIndex: 600}} />
        </VelocityComponent>
        <VelocityComponent  {...fadeOutImage1}>
          <div className="slide" style={{backgroundImage: 'url('+props.image1+')', zIndex: 500}} />
        </VelocityComponent>
        <VelocityComponent>
          <div className="slide" style={{backgroundImage: 'url('+props.image2+')', zIndex: 400}} />
        </VelocityComponent>
      </div>
    </VelocityComponent>
  );
}