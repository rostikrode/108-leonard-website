import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';

import IntroSlide from '../partials/IntroSlide.js';
import ImageSlide from '../partials/ImageSlide.js';
import TextSlide from '../partials/TextSlide.js';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/Carousel.css';

import next_arrow from '../../assets/next_arrow.svg';
import prev_arrow from '../../assets/prev_arrow.svg';

var debounce = require('throttle-debounce/debounce');

const NextPage = (props) => {
  return (
    <NavLink className="nav-anchor serif-bold next-button" strict exact to={props.nextPageSlug} onClick={() => {props.nextButton(props.nextPageTitle)}}>
      <span>Go to {props.nextPageTitle}</span>
      <img src={next_arrow} alt="arrow to take you to next carousel page"/>
    </NavLink>
  );
}

var parentSliderEl, sliderButtonNextEl, sliderButtonPrevEl, nextPageButton;
export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.activateSubnav = this.activateSubnav.bind(this)
    this.onWindowScroll = this.onWindowScroll.bind(this)
    this.onOrientationChange = this.onOrientationChange.bind(this)
  }
  componentDidMount() { 
    setTimeout(() => {
      window.scrollTo(0,0);
    }, 100);

    this.props.sendSlider(this.slider, this.sliderParent);

    parentSliderEl = this.sliderParent;
    nextPageButton = parentSliderEl.childNodes[3];
    sliderButtonNextEl = this.btnNext;
    sliderButtonPrevEl = this.btnPrev;

    /** meta data for page */
    document.title = this.props.metaTitle;
    if(document.getElementsByTagName('meta').description) {
      document.getElementsByTagName('meta').description.content = this.props.metaDescription
    }
    if (document.querySelector("link[rel='canonical']")) {
      document.querySelector("link[rel='canonical']").href = window.location.href
    }
    var viewport = document.querySelector("meta[name=viewport]");
    if(viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
    }

    /** dynamically setting the next arrow location based on the length of the dots */
    this.updateArrowPosition();
    window.addEventListener('scroll', this.onWindowScroll);
    window.addEventListener('orientationchange', this.onOrientationChange);
    window.addEventListener('resize', this.updateArrowPosition);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onWindowScroll);
    window.removeEventListener('orientationchange', this.onOrientationChange);
    window.removeEventListener('resize', this.updateArrowPosition);
  }

  componentDidUpdate() {
    // sending to first slide on nav click
    if(this.props.navClicked && this.slider) {
      setTimeout(()=>{
        if (window.matchMedia("(min-width: 1024px)").matches) {      
          this.slider.slickGoTo(0);
        }
      }, 800);
    }
  }

  updateArrowPosition () {
    if (window.matchMedia("(min-width: 1024px)").matches) {      
      setTimeout(() => {
        if (parentSliderEl) {
          var dots = parentSliderEl.children[0].querySelector('.slick-dots');
          if (dots !== null) {
            let length = dots.getBoundingClientRect().width;
            let nextArrow = sliderButtonNextEl;
            let nextButton = parentSliderEl.childNodes[3];
  
            if (window.matchMedia("(min-width: 1366px)").matches) {
              if (parentSliderEl.querySelector('.slick-slider').classList.contains('team-slider')) {
                let prevArrow = sliderButtonPrevEl;
                prevArrow.style.left = `calc(50% - (80px + ${length}px) + 12em)`;
                nextArrow.style.left = `calc(50% + 80px + ${length}px - 12em)`;
              } else {
                nextArrow.style.left = `calc(80px + ${length}px)`;
              }
              
              if (nextButton !== undefined)
                nextButton.style.left = `calc(80px + ${length}px)`;
            } else {
              if (parentSliderEl.querySelector('.slick-slider').classList.contains('team-slider')) {
                let prevArrow = sliderButtonPrevEl;
                prevArrow.style.left = `calc(50% - (80px + ${length}px) + 12em)`;
                nextArrow.style.left = `calc(50% + 70px + ${length}px - 12em)`;
              } else {
                nextArrow.style.left = `calc(30px + ${length}px)`;
              }
              
              if (nextButton !== undefined)
                nextButton.style.left = `calc(30px + ${length}px)`;
            }
          }
        }
      }, 100);
    }
  }
  /** custom button events needed for custom buttons */
  next() {
    if (this.slider)
      this.slider.slickNext()
  }
  previous() {
    if (this.slider)
      this.slider.slickPrev()
  }

  /** switch between carousel and scrolling list for portrait vs landscape */
  onOrientationChange() {
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }

  /** on mobile, on window scroll, when scrolling up to a new section, trigger than section to animate in, in the header (fake MacOS calendar style) */
  onWindowScroll() {
    var sectionHeaders = parentSliderEl.querySelectorAll('.newsection'); 
    for(var i = 0; i < sectionHeaders.length; i++) {
      var s = sectionHeaders[i];
      var sTop = s.getBoundingClientRect().top;
      
      /** going down */
      if(sTop <= 70) {
        var sTitle = s.getAttribute('data-section');
        this.activateSubnav(sTitle);
      }
    }
  }

  /** functionality to change slides on mousewheel  */
  debounceEventHandler(...args) {
    const debounced = debounce(...args)
    return function(e) {
      e.persist()
      return debounced(e)
    }
  }
  onMouseWheelScroll(e, that) {
    e.preventDefault();
    e.persist();
    if (window.matchMedia("(min-width: 1024px)").matches) {   
      if (parentSliderEl) {
        if (e.deltaY < 0 ) {
          that.previous() 
        } else if (e.deltaY > 0 ) {
          that.next();
        }
        
        if(e.deltaX < 0) {
          that.previous();
        } else if (e.deltaX > 0) {
          that.next();
        }
      }
    }
  }

  /** sub section in nav - make active when passing over section. */
  activateSubnav(section) { 
    var subnavs = this.props.subnavs;
    for(let i = 0; i < subnavs.length; i++) {
      var subnavId = subnavs[i].getAttribute('data-id'); 
      if(section === subnavId) {
        subnavs[i].classList.add('active');
      } else {
        subnavs[i].classList.remove('active');
      }
    }
  }

  onNextButton(nextTitle) {
    this.props.onNextButton(nextTitle);
  }

  render() {
    const moreSettings = {
      arrows: false,
      beforeChange: (currentSlide, nextSlide) => {
        /** to fade out captions */
        var allCaps = parentSliderEl.querySelectorAll(`.slick-slide .inner .caption`);
        for(let i = 0; i < allCaps.length; i++) {
          allCaps[i].classList.add('fade-out');
        }
      },
      afterChange: (slide) => {
        if(slide === this.props.slides.length) {
          sliderButtonPrevEl.classList.remove('fade');
          sliderButtonNextEl.classList.add('fade');

          /** show the next slideshow page button on last slide */
          if(nextPageButton)
            nextPageButton.classList.add('fadein');
        } else if (slide === 0) {
          sliderButtonNextEl.classList.remove('fade');
          sliderButtonPrevEl.classList.add('fade');

          /** dont't show the next slideshow page button on last slide */
          if(nextPageButton)
            nextPageButton.classList.remove('fadein');
        } else {
          sliderButtonNextEl.classList.remove('fade');
          sliderButtonPrevEl.classList.remove('fade');
          /** don't show the next slideshow page button on last slide */
          if(nextPageButton)
            nextPageButton.classList.remove('fadein');

          // if team carousel, the slide num and total slides is mismatched
          if (parentSliderEl.querySelector('.slick-slider').classList.contains('team-slider')) {
            if(slide === this.props.slides.length - 1) {
              sliderButtonPrevEl.classList.remove('fade');
              sliderButtonNextEl.classList.add('fade');
            }
          }
        }
        var section = parentSliderEl.querySelector('.slick-slide.slick-active').getAttribute('data-section');
        this.activateSubnav(section);

        /** to fade in captions */
        var currentCap = parentSliderEl.querySelector(`.slick-slide.slick-active .inner .caption`);
        if(currentCap) {
          currentCap.classList.remove('fade-out');
        }
      }
    }

    return (
      <div ref={c => this.sliderParent = c } className="slider-parent" onWheel={this.debounceEventHandler(65, (e) => this.onMouseWheelScroll(e, this))}>
      
        <Slider ref={c => this.slider = c } {...this.props.settings} {...moreSettings}>
          {this.props.intro ?
            <div key={0} className="slick-intro-slide slick-section" data-section={this.props.section}>
              <IntroSlide {...this.props} activateSubnav={this.activateSubnav}/>
            </div>
          : undefined}
          
          {!this.props.istext ? 
            this.props.slides.map((slide, key) => {
              return (
                <div key={key+1} data-section={slide.section} className="slick-section">
                  <ImageSlide slide={slide} page={this.props.page}/>
                </div>
              );
            })
          :
            this.props.slides.map((slide, key) => {
              return (
                <div key={key + 1} data-section={slide.section} className="slick-section slick-intro-slide">
                  <TextSlide slide={slide}/>
                </div>  
              );
            })
          }
        </Slider>

        <button ref={(el) => this.btnPrev = el } onClick={this.previous} className="custom-arrow prev-arrow fade">
          <img src={prev_arrow} alt="arrow to prev slide"/>
        </button>
        <button ref={(el) => this.btnNext = el } onClick={this.next} className="custom-arrow next-arrow">          
          <img src={next_arrow} alt="arrow to next slide"/>
        </button>
        
        {this.props.nextPageTitle ? 
          <NextPage {...this.props} nextButton={this.onNextButton.bind(this)} />
        : undefined}
      </div>
    );
  }
}

