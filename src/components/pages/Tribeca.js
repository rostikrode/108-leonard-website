import React, {Component} from 'react';
import Carousel from '../partials/Carousel';

export default class Tribeca extends Component {
  componentDidMount() {
    document.title = "Tribeca Page";
    document.getElementsByTagName('meta').description.content = "Tribeca page of website";
    document.querySelector("link[rel='canonical']").href = window.location.href;
  }
  render() {
    var intro = {
      page: 'Tribeca',
      intro: {
        title: 'VERORESTIOR VOLORRUM',
        para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Doneclos lacus a elit interdum consectetur. Vivamus pulv ex quis laoreet mollis, quam nisl placerat elit, ut viverra sem enim in nisi. Praest laoreet sapien et erat egestas, at efficitur lacus varius. In venenat erat non arcu semper, at elementum magna molestie. Duis lectus ipsum, scelerisque a posuere ut.'
      },
      introImage: '/images/building/ph1.jpg',
      introImageCaption: 'intro image',
      section: 'Intro',
    }
    var slides = [
      {
        src: '/images/building/ph1.jpg',
        section: 'Neighborhood',
        newsection: true,
        caption: 'Caption 1'
      }, {
        src: '/images/building/ph2.jpg',
        section: 'Map',
        newsection: true,
        caption: 'Caption 2'
      }
    ]

    var settings = {
      dots: true,
      className: 'tribeca-slider',
      swipeToSlide: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrow: true,
      responsive: [{ 
          breakpoint: 1024, 
          settings: 'unslick' 
      }]
    };

    return (
      <section className="tribeca-page">
        <Carousel className="App-carousel" settings={settings} intro={intro} content={slides} activeSection={this.props.activeSub} nextPage={['Contact', '/contact']} />
      </section>
    );
  }
}