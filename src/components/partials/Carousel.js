import React, {Component} from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/Carousel.css';
import next_arrow from '../../assets/next_arrow.svg';
import prev_arrow from '../../assets/prev_arrow.svg';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }

  componentDidMount() {
    /** dynamically setting the next arrow location based on the length of the dots */

      setTimeout(() => {
        if (document.querySelector('.slick-slider .slick-dots') !== null) {
          let length = document.querySelector('.slick-slider .slick-dots').getBoundingClientRect().width;
          let nextArrow = document.querySelector('.custom-arrow.next-arrow');
          nextArrow.style.left = `calc(3em + ${length}px)`;
        }
      }, 100);
  }

  next() {
    this.slider.slickNext()
  }
  previous() {
    this.slider.slickPrev()
  }

  render() {
    const moreSettings = {
      arrows: false,
      afterChange: (slide) => {
        if(slide === this.props.content.length) {
          this.btnPrev.classList.remove('fade');
          this.btnNext.classList.add('fade');
        } else if (slide === 0) {
          this.btnNext.classList.remove('fade');
          this.btnPrev.classList.add('fade');
        } else {
          this.btnNext.classList.remove('fade');
          this.btnPrev.classList.remove('fade');
        }
      }
    }

    return (
      <div className="slider-parent">
        <Slider ref={c => this.slider = c } {...this.props.settings} {...moreSettings}>
          <div key="intro" className="slick-intro-slide">
            <div className="inner">
              <div className="caption-wrapper">
                <h1>{this.props.intro.intro.title}</h1>
                <p>{this.props.intro.intro.para}</p>
              </div>
              <div className="image-wrapper">
                <img src={this.props.intro.introImage} alt={this.props.intro.intro}/>
              </div>
            </div>
          </div>  

          {Object.entries(this.props.content).map((slide, key) => {
            return (
              <div key={key}>
                <div className="inner">
                  <img src={slide[1].src} alt={slide[1].caption}/>
                  <p className="caption" >{slide[1].caption}</p>
                </div>
              </div>  
            );
          })}
        </Slider>
        <button ref={(el) => this.btnPrev = el } onClick={this.previous} className="custom-arrow prev-arrow fade">
          <img src={prev_arrow} alt="arrow to take you to previous slide"/>
        </button>
        <button ref={(el) => this.btnNext = el } onClick={this.next} className="custom-arrow next-arrow">
          <img src={next_arrow} alt="arrow to take you to next slide"/>
        </button>
        {/* <button className={ `next-page-button ${this.props.buttonClass}` }><a href={this.props.nextPage[1]}>To {this.props.nextPage[0]}</a></button> */}
      </div>
    );
  }
}

