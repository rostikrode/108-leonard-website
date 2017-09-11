import React, {Component} from 'react';
import MultilineText from '../partials/MultilineText';
import ScrollArrow from '../partials/ScrollArrow';
import '../../styles/Legal.css';

export default class Legal extends Component {
  constructor(props) {
    super(props);
    
    this.onTabClick = this.onTabClick.bind(this);
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

  onTabClick(e) {
    console.log(e.currentTarget.dataset.id)

    var tabs = this.tabref.querySelectorAll('.tab');
    for (var t = 0; t < tabs.length; t++) {
      tabs[t].classList.remove('active');
    };
    var contents = this.contentref.querySelectorAll('.content');
    for (var c = 0; c < contents.length; c++) {
      contents[c].classList.remove('active');
    };

    e.currentTarget.classList.toggle('active');
    this.contentref.querySelector(`.content[data-id="${e.currentTarget.dataset.id}"]`).classList.toggle('active');

    this.scrollArrow.hideShowDownArrow();
  }

  render() {
    return (
      <div className="legal-wrapper">
        <div ref={e => {this.tabref = e}} className="tab-wrapper">
          {this.props.body.map((tab, key) => {
            return (
              <button key={key} onClick={this.onTabClick} className={key === 0 ? 'tab sans active' : 'tab sans'} data-id={`tab-${key}`}>{tab.tab}</button>     
            );
          })}
        </div>
        <div ref={e => {this.contentref = e}} className="content-wrapper">
          {this.props.body.map((content, key) => {
            return (
              <div key={key} className={key === 0 ? 'content sans active' : 'content sans'} data-id={`tab-${key}`}>
                <MultilineText text={content.content}/>
              </div>     
            );
          })}
        </div>
        <ScrollArrow ref={i => {this.scrollArrow = i;}} listElementRef={this.contentref} />
      </div>
    );
  }
}