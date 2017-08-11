import React, {Component} from 'react';
import Slider from 'react-slick';
import Scroll from 'react-scroll';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/Carousel.css';
import next_arrow from '../../assets/next_arrow.svg';
import prev_arrow from '../../assets/prev_arrow.svg';

var Element = Scroll.Element;
var scroll = Scroll.animateScroll;
// var newsections;
export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.activateSubnav = this.activateSubnav.bind(this)
    this.onSubNavClick = this.onSubNavClick.bind(this)
    this.onMouseWheelScroll = this.onMouseWheelScroll.bind(this)
    this.onWindowScroll = this.onWindowScroll.bind(this)
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
      
    this.onSubNavClick();
    window.addEventListener('scroll', this.onWindowScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  next() {
    this.slider.slickNext()
  }
  previous() {
    this.slider.slickPrev()
  }

  onWindowScroll() {
    var sectionHeaders = document.getElementsByClassName('newsection'); 
    for(var i = 0; i < sectionHeaders.length; i++) {
      var s = sectionHeaders[i];
      var sTop = s.getBoundingClientRect().top;
      
      /** going down */
      if(sTop <= 80) {
        var sTitle = s.getAttribute('data-section');
        this.activateSubnav(sTitle);
      }
    }
    if (document.querySelector('.slick-intro-slide').getBoundingClientRect().bottom >= 80) {
      this.activateSubnav('');
    }
  }

  onMouseWheelScroll(e) {
    if (document.querySelector('.slider-parent .slick-initialized')) {
      e.preventDefault();
      e.persist();
      (e.deltaY < 0 ) ? this.previous() : this.next();
    }
  }

  activateSubnav(section) {
    /** sub section in nav - make active when passing over section. */
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
  onSubNavClick() {
    /** forcing  goToSlide nav click event from here */
    var navs = document.getElementsByClassName('nav-subnav-item')
    for(let i = 0; i < navs.length; i++) {
      navs[i].addEventListener('click', (e) => {
        var index = e.target.getAttribute('data-id');
        var slide = document.querySelector(`.slick-slide[data-section="${index}"]`);
        if (slide) {
          /** desktop version, that has a carousel */
          var slideIndex = parseInt(slide.getAttribute('data-index'), 10);
          this.slider.slickGoTo(slideIndex);
        } else {
          /** mobile version that doesn't have a slider */
          var section = document.querySelector(`.newsection[data-section="${index}"]`); 
          if (section)
            scroll.scrollTo(section.offsetTop + 40);
          
        }
      });
    }
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
        var section = document.querySelector('.slick-slide.slick-active').getAttribute('data-section');
        this.activateSubnav(section);
      }
    }

    return (
      <div className="slider-parent" onWheel={this.onMouseWheelScroll}>
        <Slider ref={c => this.slider = c } {...this.props.settings} {...moreSettings}>
          <div key="intro" className="slick-intro-slide slick-section" data-section={this.props.intro.section}>
            <div className="inner">
              <div className="caption-wrapper">
                <h1>{this.props.intro.intro.title}</h1>
                <p>{this.props.intro.intro.para}</p>
              </div>
              <div className="image-wrapper">
                <img src={this.props.intro.introImage} alt={this.props.intro.introImageCaption}/>
              </div>
            </div>
          </div>  

          {Object.entries(this.props.content).map((slide, key) => {
            return (
              <Element key={key} data-section={slide[1].section} className="slick-section">
                <div className="inner">
                  {slide[1].newsection ? 
                      <h3 data-section={slide[1].section} className="newsection mobile-section">{this.props.intro.page} |  {slide[1].section}</h3>
                    : ''}
                  <img src={slide[1].src} alt={slide[1].caption}/>
                  <p className="caption" >{slide[1].caption}</p>
                </div>
              </Element>  
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

