import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import Img from 'react-image';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/Carousel.css';
import next_arrow from '../../assets/next_arrow.svg';
import prev_arrow from '../../assets/prev_arrow.svg';

var debounce = require('throttle-debounce/debounce');

const Loader = () => {
  return (
    <div className="loading-wrapper"><i className="loading"></i></div>
  );
}

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
    this.onSubNavClick = this.onSubNavClick.bind(this)
    this.onWindowScroll = this.onWindowScroll.bind(this)
    this.onOrientationChange = this.onOrientationChange.bind(this)
  }
  componentDidMount() { 
    setTimeout(() => {
      window.scrollTo(0,0);
    }, 100);

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

    /** dynamically setting the next arrow location based on the length of the dots */
    this.updateArrowPosition();
      
    this.onSubNavClick();
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
              nextArrow.style.left = `calc(80px + ${length}px)`;
              nextButton.style.left = `calc(80px + ${length}px)`;
            } else {
              nextArrow.style.left = `calc(30px + ${length}px)`;
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
    if (this.introSlide.getBoundingClientRect().bottom >= 102) {
      this.activateSubnav('');
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
    var subnavs = document.getElementsByClassName('nav-subnav-item');
    for(let i = 0; i < subnavs.length; i++) {
      var subnavId = subnavs[i].getAttribute('data-id'); 
      if(section === subnavId) {
        subnavs[i].classList.add('active');
      } else {
        subnavs[i].classList.remove('active');
      }
    }
  }

  /** function to stop linter from complaning about making functions in loops -.- */
  subNavClickEvent(slide, slider) {
    return(e) => {
      var index = e.target.getAttribute('data-id');
      var slide = parentSliderEl.querySelector(`.slick-slide[data-section="${index}"]`);
      if (slide) {
        /** desktop version, that has a carousel */
        var slideIndex = parseInt(slide.getAttribute('data-index'), 10);
        if(this.slider !== null) 
          this.slider.slickGoTo(slideIndex);
      }
    };
  }
  /** forcing  goToSlide on nav click event from here */
  onSubNavClick() {
    var navs = document.getElementsByClassName('nav-subnav-item')
    for(let i = 0; i < navs.length; i++) {
      var slider = this.slider;
      navs[i].addEventListener('click', this.subNavClickEvent(slider));
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
          nextPageButton.classList.add('fadein');
        } else if (slide === 0) {
          sliderButtonNextEl.classList.remove('fade');
          sliderButtonPrevEl.classList.add('fade');

          /** dont't show the next slideshow page button on last slide */
          nextPageButton.classList.remove('fadein');
        } else {
          sliderButtonNextEl.classList.remove('fade');
          sliderButtonPrevEl.classList.remove('fade');
          /** don't show the next slideshow page button on last slide */
          nextPageButton.classList.remove('fadein');
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
          <div ref={c => this.introSlide = c } key={0} className="slick-intro-slide slick-section" data-section={this.props.section}>
            <div className="inner">
              <div className="caption-wrapper">
                <h1 className="sans-bold">{this.props.intro.title}</h1>
                <p className="serif">{this.props.intro.para}</p>
              </div>
              <div className="image-wrapper">
                <img className="intro-image" src={this.props.introImage} alt={this.props.introImageCaption}/>
              </div>
              <p className="caption serif-bold">{this.props.introImageCaption}</p>
            </div>
          </div>  

          {Object.entries(this.props.slides).map((slide, key) => {
            return (
              <div key={key + 1} data-section={slide[1].section} className="slick-section">
                <div className="inner">
                  {slide[1].newsection ? 
                      <h3 data-section={slide[1].section} className="newsection mobile-section sans-light-bold">{this.props.page} |  {slide[1].section}</h3>
                    : ''}
                    
                    <Img src={slide[1].src} loader={<Loader />} alt={slide[1].caption} />
                    
                  <p className="caption serif-bold" >{slide[1].caption}</p>
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
        
        <NextPage {...this.props} nextButton={this.onNextButton.bind(this)} />
      </div>
    );
  }
}

