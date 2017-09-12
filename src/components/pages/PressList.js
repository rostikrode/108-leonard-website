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
    return (
      <div className={`press-wrapper ${this.state.overflowClass}`}>
        <ul className={`press-list ${this.state.overflowClass}`} ref={e => {this.presslist = e;}}>
          {this.props.articles.map((art, key) => {
            return (
              <li className="press-item-wrapper" key={key}>
                <PressItem {...art} {...this.props} />
              </li>  
            );
          })}        
        </ul>
        <ScrollArrow listElementRef={this.presslist} isOverflowing={this.isOverflowing.bind(this)} />
      </div>
    );
  }
}