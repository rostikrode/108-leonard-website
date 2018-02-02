import React from 'react';
import Img from 'react-image';
import {VelocityComponent, velocityHelpers} from 'velocity-react';
import 'velocity-animate/velocity.ui';
import Loader from '../partials/Loader';
import '../../styles/Home.css';


const Home = (props) => {
  window.gtag('config', 'UA-113369414-1', {
    'page_title': props.metaTitle,
    'page_location': window.location.href,
    'page_path': window.location.pathname
  });

  /** meta data for page */
  document.title = props.metaTitle;
  if(document.getElementsByTagName('meta').description) {
    document.getElementsByTagName('meta').description.content = props.metaDescription
  }
  if (document.querySelector("link[rel='canonical']")) {
    document.querySelector("link[rel='canonical']").href = window.location.href
  }
  var viewport = document.querySelector("meta[name=viewport]");
  if(viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
  }

  return (
    <div className="home">
      <IntroAnimation {...props.animation} />
      <div className="home-wrapper">
        <Img src={props.image} loader={<Loader />} alt={props.caption} />
      </div>
    </div>
  );
}

export default Home;

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

if (window.matchMedia("(min-width: 1024px)").matches) {
  var sequence = velocityHelpers.registerEffect({
    defaultDuration: 3000,
    calls: [
      ['fadeOut'],
    ]
  });
} else {
  var sequence = velocityHelpers.registerEffect({
    defaultDuration: 2000,
    calls: [
      [{translateY: '7%'}],
      ['fadeOut']
    ]
  });
}
var fadeOutOverlay = {
  runOnMount: true,
  animation: sequence,
  duration: 2000,
  delay: 2000+1000+1000+1000+2500+800
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
          <div className="slide" style={{backgroundImage: `url(${props.linework1}`, zIndex: 100}} />
        </VelocityComponent>
          <VelocityComponent {...fadeOutLine2}>
          <div className="slide" style={{backgroundImage: `url(${props.linework2}`, zIndex: 99}} />
        </VelocityComponent>
        <VelocityComponent {...fadeOutLine3}>
          <div className="slide" style={{backgroundImage: `url(${props.linework3}`, zIndex: 98}} />
        </VelocityComponent>
        <VelocityComponent  {...fadeOutImage1}>
          <div className="slide" style={{backgroundImage: `url(${props.image1}`, zIndex: 97}} />
        </VelocityComponent>
        <VelocityComponent>
          <div className="slide" style={{backgroundImage: `url(${props.image2}`, zIndex: 96}} />
        </VelocityComponent>
      </div>
    </VelocityComponent>
  );
}