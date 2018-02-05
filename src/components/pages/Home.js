import React, {Component} from 'react';
import Img from 'react-image';
import 'velocity-animate/velocity.ui';
import Loader from '../partials/Loader';
import '../../styles/Home.css';


export default class Home extends Component {
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
        <div className="home-wrapper">
          <Img src={this.props.image} loader={<Loader />} alt={this.props.caption} />
        </div>
      </div>
    );
  }
}