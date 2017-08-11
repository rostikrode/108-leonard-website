import React, {Component} from 'react';
import Carousel from '../partials/Carousel';

export default class Residences extends Component {
  componentDidMount() {
    document.title = "Residences Page";
    document.getElementsByTagName('meta').description.content = "Residences page of website";
    document.querySelector("link[rel='canonical']").href = window.location.href;
  }
  render() {
    var intro = {
      page: 'Residences',
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
        section: 'Interiors',
        newsection: true,
        caption: 'Caption 1'
      }, {
        src: '/images/building/ph2.jpg',
        section: 'Interios',
        newsection: false,
        caption: 'Caption 2'
      }, {
        src: '/images/building/ph2.jpg',
        section: 'Kitchens',
        newsection: true,
        caption: 'Caption 2'
      }, {
        src: '/images/building/ph3.jpg',
        section: 'Kitchens',
        newsection: false,
        caption: 'Caption 3'
      }, {
        src: '/images/building/ph3.jpg',
        section: 'Bathrooms',
        newsection: true,
        caption: 'Caption 3'
      }, {
        src: '/images/building/ph4.jpg',
        section: 'Landmarked Residences',
        newsection: true,
        caption: 'Caption 4'
      }
    ]

    var settings = {
      dots: true,
      className: 'residences-slider',
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
      <section className="residences-page">
        <Carousel className="App-carousel" settings={settings} intro={intro} content={slides} activeSection={this.props.activeSub} nextPage={['Crown Collection', '/crown-collection']} />
      </section>
    );
  }
}