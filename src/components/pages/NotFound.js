import React from 'react';
import '../../styles/NotFound.css';

const NotFound = () => {
  window.gtag('config', 'UA-113369414-1', {
    'page_title': 'Page Not Found',
    'page_location': window.location.href,
    'page_path': window.location.pathname
  });

  return (
    <div className="mid-block">
      <h1>
        404 page not found :(
      </h1>
    </div>
  );
}

export default NotFound;