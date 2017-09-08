import React, {Component} from 'react';
import PressItem from '../partials/PressItem';
import ScrollArrow from '../partials/ScrollArrow';
import '../../styles/Press.css';

export default class Press extends Component {
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

    this.hideShowDownArrow();
  }

  hideShowDownArrow() {
    // remove down arrow if no scrolling exists
    setTimeout(() => {
      if(this.listElementRef) {
        if(this.listElementRef.scrollHeight > this.listElementRef.clientHeight) {
          this.dwnArrow.classList.remove('hide');
        } else {
          this.dwnArrow.classList.add('hide');
        }
      }
    }, 100);
  }

  render() {
    return (
      <div className="press-wrapper">
        <ul className="press-list" ref={e => {this.presslist = e;}}>
          {this.props.articles.map((art, key) => {
            return (
              <li className="press-item-wrapper" key={key}>
                <PressItem {...art} {...this.props} />
              </li>  
            );
          })}        
        </ul>
        <ScrollArrow listElementRef={this.presslist} />
      </div>
    );
  }
}