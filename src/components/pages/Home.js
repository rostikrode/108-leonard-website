import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Img from 'react-image';
import Cookies from 'js-cookie';
import 'velocity-animate/velocity.ui';
import Loader from '../partials/Loader';
import '../../styles/Home.css';
import next_arrow from '../../assets/next_arrow.svg';


export default class Home extends Component {
  componentWillMount() {
    window.gtag('config', 'UA-113369414-1', {
      'page_title': this.props.metaTitle,
      'page_location': window.location.href,
      'page_path': window.location.pathname
    });

    this.onGoTo = this.onGoTo.bind(this);
  }
  
  componentDidMount() {
    /** meta data for page */
    document.title = this.props.metaTitle;
    if(document.getElementsByTagName('meta').description) {
      document.getElementsByTagName('meta').description.content = this.props.metaDescription;
      document.querySelector("meta[property='og:description']").content = this.props.metaDescription;
      document.querySelector("meta[property='og:title']").content = this.props.metaTitle;
    }
    if (document.querySelector("link[rel='canonical']")) {
      document.querySelector("link[rel='canonical']").href = window.location.href
      document.querySelector("meta[property='og:url']").content = window.location.href
    }
    var viewport = document.querySelector("meta[name=viewport]");
    if(viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
    } 

    // fade in/out caption only if animation hasn't played 
    if ((window.location.pathname === '/') && this.caption) {
      if (!Cookies.get('alreadyPlayed')) {
        this.caption.style.transition = 'opacity 500ms ease-in-out 2s';
        this.caption.style.opacity = 0;

        setTimeout(() => {
          this.caption.style.opacity = 1;
        }, 8500);
      }
    }
  }

  onGoTo() {
    this.props.onNextButton('Building');
  }

  render() {
    return (
      <div className="home">
        <div className="home-wrapper">
          <div className="image-wrapper" style={{backgroundImage: 'url('+this.props.image+')'}} >
            <Img src={this.props.image} loader={<Loader />} alt={this.props.caption} title={this.props.imagetitle} />
          </div>
          <NavLink className="mobile-goto nav-anchor next-button" strict exact to='/building' onClick={this.onGoTo}>
            <span className="upper serif">Discover the building</span>
            <img src={next_arrow} alt="arrow to take you to the Building page"/>
          </NavLink>
        </div>
      </div>
    );
  }
}