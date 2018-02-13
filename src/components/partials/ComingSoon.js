import React from 'react';

const ComingSoon = (props) => {
  if (window.location.pathname.indexOf('availability') > -1) {
    /** meta data for page */
    document.title = props.metaTitle;
    if(document.getElementsByTagName('meta').description) {
      document.getElementsByTagName('meta').description.content = props.metaDescription;
      document.querySelector("meta[property='og:description']").content = props.metaDescription;
      document.querySelector("meta[property='og:title']").content = props.metaTitle;
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

  return (
    <div className="coming-soon">
      <h1 style={{fontSize: '1em'}} dangerouslySetInnerHTML={{__html: props.availMessage}}/>
    </div>
  );
}

export default ComingSoon;