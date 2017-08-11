import React, {Component} from 'react';
import Carousel from '../partials/Carousel';

export default class Amenities extends Component {
  componentDidMount() {
    document.title = "Amenities Page";
    document.getElementsByTagName('meta').description.content = "Amenities page of website";
    document.querySelector("link[rel='canonical']").href = window.location.href;
  }
  render() {
    var intro = {
      page: 'Amenities',
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
        section: 'Entertaining',
        newsection: true,
        caption: 'Caption 1'
      }, {
        src: '/images/building/ph2.jpg',
        section: 'Entertaining',
        newsection: false,
        caption: 'Caption 2'
      }, {
        src: '/images/building/ph2.jpg',
        section: 'Entertaining',
        newsection: false,
        caption: 'Caption 2'
      },{
        src: '/images/building/ph2.jpg',
        section: 'Entertaining',
        newsection: false,
        caption: 'Caption 2'
      }, {
        src: '/images/building/ph2.jpg',
        section: 'Entertaining',
        newsection: false,
        caption: 'Caption 2'
      }, {
        src: '/images/building/ph3.jpg',
        section: 'Wellness',
        newsection: true,
        caption: 'Caption 3'
      }, {
        src: '/images/building/ph3.jpg',
        section: 'Wellness',
        newsection: false,
        caption: 'Caption 3'
      }, {
        src: '/images/building/ph4.jpg',
        section: 'Outdoor',
        newsection: true,
        caption: 'Caption 4'
      }, {
        src: '/images/building/ph4.jpg',
        section: 'Outdoor',
        newsection: false,
        caption: 'Caption 4'
      },{
        src: '/images/building/ph4.jpg',
        section: 'Outdoor',
        newsection: false,
        caption: 'Caption 4'
      }
    ]

    var settings = {
      dots: true,
      className: 'amenities-slider',
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
      <section className="amenities-page">
        <Carousel className="App-carousel" settings={settings} intro={intro} content={slides} activeSection={this.props.activeSub} nextPage={['Tribeca', '/tribeca']} />
      </section>
    );
  }
}