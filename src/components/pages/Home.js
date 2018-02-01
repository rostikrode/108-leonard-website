import React from 'react';
import Img from 'react-image';
import Loader from './../partials/Loader';
import '../../styles/Home.css';

const Home = (props) => {
  /** meta data for page */
  document.title = props.metaTitle;
  if(document.getElementsByTagName('meta').description) {
    document.getElementsByTagName('meta').description.content = props.metaDescription
  }
  if (document.querySelector("link[rel='canonical']")) {
    document.querySelector("link[rel='canonical']").href = window.location.href
  }
  var viewport = document.querySelector("meta[name=viewport]");
  if(viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
  }

  return (
    <div className="home-wrapper">
      <Img src={props.image} loader={<Loader />} alt={props.caption} />
    </div>
  );
}

export default Home;