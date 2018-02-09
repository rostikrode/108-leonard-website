import React, {Component} from 'react';
import Img from 'react-image';
import Cookies from 'js-cookie';
import 'velocity-animate/velocity.ui';
import Loader from '../partials/Loader';
import '../../styles/Home.css';


export default class Home extends Component {
  componentWillMount() {
    window.gtag('config', 'UA-113369414-1', {
      'page_title': this.props.metaTitle,
      'page_location': window.location.href,
      'page_path': window.location.pathname
    });
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

  render() {
    return (
      <div className="home">
        <div className="home-wrapper">
          <div className="image-wrapper" style={{backgroundImage: 'url('+this.props.image+')'}} >
            <Img src={this.props.image} loader={<Loader />} alt={this.props.caption} />
            <div className="caption-wrapper" ref={el => {this.caption = el}}>
              <div className="sans-bold h1">{this.props.title}</div>
              <div className="p">
                <h1 className="serif">{this.props.header1}</h1>
                <h2 className="serif">{this.props.header2}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}