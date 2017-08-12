import React, { Component } from 'react';
import Carousel from '../partials/Carousel';

export default class CarouselPage extends Component {
  componentDidMount() {
    document.title = this.props.metaTitle;
    document.getElementsByTagName('meta').description.content = this.props.metaDescription;
    document.querySelector("link[rel='canonical']").href = window.location.href;
  }
  render() {
    return (
      <section className="carousel-page">
        <Carousel className="App-carousel" settings={this.props.settings} introImage={this.props.introImage} introCaption={this.props.introCaption} intro={this.props.intro} content={this.props.slides} activeSection={this.props.activeSub} nextPage={[this.props.nextPageTitle, this.props.nextPageSlug]} />
      </section>
    );
  }
}