import React, {Component} from 'react';
import PressItem from '../partials/PressItem';
import ScrollArrow from '../partials/ScrollArrow';
import '../../styles/Press.css';

export default class Press extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overflowClass: ''
    }
  }
  componentWillMount() {
    if (window.location.origin === 'https://108leonard.com') {
      window.gtag('config', 'UA-113369414-1', {
        'page_title': this.props.metaTitle,
        'page_location': window.location.href,
        'page_path': window.location.pathname
      });
    }
  }

  componentDidMount() {
    const metaDescription = "108 Leonard has attracted global media interest. Below is a small selection of the press reviews and features that have been published."
    const metaTitle = "108 Leonard | Lower Manhattan For-Sale Residences In the Press";
    /** meta data for page */
    document.title = metaTitle;
    if(document.getElementsByTagName('meta').description) {
      document.getElementsByTagName('meta').description.content = metaDescription;
      document.querySelector("meta[property='og:description']").content = metaDescription;
      document.querySelector("meta[property='og:title']").content = metaTitle;
    }
    if (document.querySelector("link[rel='canonical']")) {
      document.querySelector("link[rel='canonical']").href = window.location.href
      document.querySelector("meta[property='og:url']").content = window.location.href
    }
    var viewport = document.querySelector("meta[name=viewport]");
    if(viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
    }
  }

  isOverflowing(overflowing) {
    if(overflowing) {
      this.setState({
        overflowClass: 'overflowing'
      });
    } else {
      this.setState({
        overflowClass: ''
      });
    }
  }
  render() {
    const renderPressArticles = () => {
      if (this.props.pressArticles) {
        let articleList =  this.props.pressArticles.map((article, key) => {
          return (
            <li className="press-item-wrapper" key={key}>
              <PressItem {...article} {...this.props} />
            </li>  
          );
        })
        return articleList; 
      }
    }

    return (
      <div className={`press-wrapper ${this.state.overflowClass}`}>
        <ul className={`press-list ${this.state.overflowClass}`} ref={e => {this.presslist = e;}}>
          {renderPressArticles()}     
        </ul>
        <ScrollArrow listElementRef={this.presslist} isOverflowing={this.isOverflowing.bind(this)} />
      </div>
    );
  }
}