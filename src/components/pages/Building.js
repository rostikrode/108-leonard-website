import React, { Component } from 'react';
import Carousel from '../partials/Carousel';

import '../../styles/Building.css';

export default class Building extends Component {
  componentDidMount() {
    document.title = "Building Page";
    document.getElementsByTagName('meta').description.content = "Building page of website";
    document.querySelector("link[rel='canonical']").href = window.location.href;
  }
  
  render() {
    var intro = {
      intro: {
        title: 'VERORESTIOR VOLORRUM',
        para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Doneclos lacus a elit interdum consectetur. Vivamus pulv ex quis laoreet mollis, quam nisl placerat elit, ut viverra sem enim in nisi. Praest laoreet sapien et erat egestas, at efficitur lacus varius. In venenat erat non arcu semper, at elementum magna molestie. Duis lectus ipsum, scelerisque a posuere ut.'
      },
      introImage: '/images/building/ph1.jpg'
    }
    var slides = [
      {
        src: '/images/building/ph1.jpg',
        caption: 'Property'
      }, {
        src: '/images/building/ph2.jpg',
        caption: 'Caption 2'
      },{
        src: '/images/building/ph3.jpg',
        caption: 'Entrance'
      },{
        src: '/images/building/ph4.jpg',
        caption: 'Caption 4'
      }
    ]

    var settings = {
      dots: true,
      className: 'building-slider',
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
      <section className="building-page">
        <Carousel className="App-carousel" settings={settings} intro={intro} content={slides} nextPage={['Residences', '/residences']} />
      </section>
    );
  }
}