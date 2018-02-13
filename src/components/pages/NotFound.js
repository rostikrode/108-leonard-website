import React from 'react';
import '../../styles/NotFound.css';

const NotFound = () => {
  window.gtag('config', 'UA-113369414-1', {
    'page_title': 'Page Not Found',
    'page_location': window.location.href,
    'page_path': window.location.pathname
  });

  /** meta data for page */
  document.title = '404 Page Not Found';
  if(document.getElementsByTagName('meta').description) {
    document.getElementsByTagName('meta').description.content = 'Your page was not found';
    document.querySelector("meta[property='og:description']").content = 'Your page was not found';
    document.querySelector("meta[property='og:title']").content = '404 Page Not Found';
  }
  if (document.querySelector("link[rel='canonical']")) {
    document.querySelector("link[rel='canonical']").href = 'https://108leonard.com/404'
    document.querySelector("meta[property='og:url']").content = 'https://108leonard.com/404'
  }
  var viewport = document.querySelector("meta[name=viewport]");
  if(viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
  }

  return (
    <div className="mid-block">
      <h1>
        404 page not found :(
      </h1>
    </div>
  );
}

export default NotFound;