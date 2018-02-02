import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {VelocityComponent} from 'velocity-react';
import logo from '../../assets/logo.svg';
import brochure from '../../assets/brochure.svg';
import logoText from '../../assets/108_leonard_text.svg';
import '../../styles/Header.css';

var currentPage = '';
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: '',
      home: ''
    }
    this.sectionOnScroll = this.sectionOnScroll.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.sectionOnScroll);
    this.onAvailabilityPage();
    this.onPressPage();
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.sectionOnScroll);
  }

  componentDidUpdate() {
    this.onAvailabilityPage();
    this.onPressPage();
    // if new page, remove active classes from subnavs (counts for the next page button too)
    if(this.props.page !== currentPage) {
      var allsubnavs = this.nav.querySelectorAll('.nav-subnav-item');
      
      this.props.passAllSubnavs(allsubnavs);

      for(var i = 0; i < allsubnavs.length; i++) {
        allsubnavs[i].classList.remove('active');
      }
    }
    currentPage = this.props.page;
  }

  onAvailabilityPage() {
    var url = window.location.pathname;
    setTimeout(() => {
      if ((url.split('/')[1] === 'availability') || (url === '/availability/') || (url === '/share/')) {
        this.nav.querySelector(`.nav-list .nav-anchor-wrapper .nav-anchor[href="/availability/"]`).classList.add('active');
      } else {
        this.nav.querySelector(`.nav-list .nav-anchor-wrapper .nav-anchor[href="/availability/"]`).classList.remove('active');
      }
    }, 100);
  }
  onPressPage() {
    var url = window.location.pathname;
    setTimeout(() => {
      if ((url.split('/')[1] === 'press')) {
        this.footer.querySelector(`.nav-anchor[href="/press/"]`).classList.add('active');
      } else {
        this.footer.querySelector(`.nav-anchor[href="/press/"]`).classList.remove('active');
      }
    }, 100);
  }

  sectionOnScroll(e) {
    setTimeout(() => {
      if(this.nav.querySelector('.nav-subnav-item.active')) {
        var current = this.nav.querySelector('.nav-subnav-item.active').getAttribute('data-id');
        /** on new subtitle... */
        if(current !== this.props.section) {
          this.props.newSection(current);
        }
      } else {
        if(this.props.section !== '') {
          this.props.newSection('');
        }
      }
    }, 100);
  }

  scrollToTop(scrollDuration) {
    const scrollHeight = window.scrollY,
          scrollStep = Math.PI / ( scrollDuration / 15 ),
          cosParameter = scrollHeight / 2;
    var   scrollCount = 0,
          scrollMargin;
    var scrollInterval = setInterval( function() {
        if ( window.scrollY !== 0 ) {
          scrollCount = scrollCount + 1;  
          scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
          window.scrollTo( 0, ( scrollHeight - scrollMargin ) );
        } else {
          clearInterval(scrollInterval); 
        } 
      }, 15 );
  }

  onNavItemClick(e) {
    // send a click signal thru App, and to Carousel
    var url = e.currentTarget.getAttribute('href');
    var currUrl = window.location.pathname;    
    if(url === currUrl) {
      this.props.onNavClick(true);
    }

    this.props.newPage(e.target.text);
    if(this.state.open === 'open') {
      this.setState({
        open: ''
      });

    } else {
      this.setState({
        open: 'open'
      });
    }

    // remove any leftover active sub pages
    var allsubs = this.nav.querySelectorAll('.nav-subnav-item');;
    for(var i = 0; i < allsubs.length; i++) {
      allsubs[i].classList.remove('active');
    }

    /** scroll to top on mobile */
    this.scrollToTop(1000);
  }
  
  onSubClick(e) { 
    // slider go to slide that corresponds to active subnav
    var index = e.target.getAttribute('data-id');
    var slide = this.props.parentslider.querySelector(`.slick-slide[data-section="${index}"]`);
    if (slide) {
      /** desktop version, that has a carousel */
      var slideIndex = parseInt(slide.getAttribute('data-index'), 10);
      if(this.props.slider !== null) 
        this.props.slider.slickGoTo(slideIndex);
    }

    let allsubs = this.nav.querySelectorAll('.nav-subnav-item');;
    for(let i = 0; i < allsubs.length; i++) {
      allsubs[i].classList.remove('active');
    }
    e.target.classList.add('active');

    this.openMobileMenu();
  }
  
  openMobileMenu() {
    if(this.state.open === 'open') {
      this.setState({
        open: ''
      });
    } else {
      this.setState({
        open: 'open'
      });
    }
  }
  render() {
    var fadeInHeader = {
      runOnMount: true,
      animation: 'fadeIn',
      duration: 1000,
      delay: 2000+1000+1000+1000+2500
    }
    return (
      <header className="header">
        <VelocityComponent {...fadeInHeader}>
          <button className={`ham-nav-button ${this.props.page ? '' : 'off'}`} onClick={()=>{this.openMobileMenu()}}>
            <div className={`ham-nav ${this.state.open}`}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </VelocityComponent>
        <VelocityComponent {...fadeInHeader}>
          <div className={`mobile-header ${this.props.page ? '' : 'off'}`}>
            <div className="navigation-titles">            
                <h4 className="title"><img src={logoText} alt="108 Leonard text logo"  /></h4>
                  <h3 ref={ (el) => this.subTitle = el} className="come-in sub-title sans-light-bold">
                    {this.props.page ? this.props.page : ''} {this.props.section ? `| ${this.props.section}` : ''}
                  </h3>
            </div>
          </div>
        </VelocityComponent>
        <div className={`app-header ${this.state.open}`}>
          <NavLink onClick={(e)=>{this.onNavItemClick(e)}} data-type="" activeClassName="active" id="home-0" strict exact to="/" href="/"><img src={logo} className="app-logo" alt="logo" /></NavLink>
          <nav ref={(el) => this.nav = el}>
            <ul className="nav-list" ref={ (listElement) => this.listElement = listElement}>

            {this.props.pages.map((p, key) => {
                return (
                  <li key={key} className="nav-anchor-wrapper">
                    <NavLink data-type={p.subnavs.length > 0 ? "carousel" : "" } activeClassName="active" id={`nav-anchor-${key}`} className="nav-anchor sans" onClick={(e)=>{this.onNavItemClick(e)}} strict exact to={p.slug}>{p.title}</NavLink>
                    
                    {p.subnavs.length > 0 ?
                      <ul className="nav-subnav">
                        {p.subnavs.map((sub, k) => {
                          return (
                            <li role="button" key={k} 
                              data-id={sub}
                              className="nav-subnav-item sans-light"
                              style={{transitionDelay: 100*k+'ms'}}
                              onClick={(e)=>{this.onSubClick(e)}}>
                              {sub}
                            </li>  
                          );
                        })}
                      </ul>
                    :''}
                  </li>  
                );
              })}
            </ul>
          </nav>
          <div className="footer" ref={(el) => this.footer = el}>
              <div className="footer-pages">
                <NavLink data-type="carousel" activeClassName="active" id="team-0" className="nav-anchor sans-medium" onClick={(e)=>{this.onNavItemClick(e)}} strict exact to="/team/">Team</NavLink>
                <NavLink data-type="" activeClassName="active" id="press-0" className="nav-anchor sans-medium" onClick={(e)=>{this.onNavItemClick(e)}} strict exact to="/press/">Press</NavLink>
                <NavLink data-type="" activeClassName="active" id="legal-0" className="nav-anchor sans-medium" onClick={(e)=>{this.onNavItemClick(e)}} strict exact to="/legal/">Legal</NavLink>
              </div>           
              <a className="link sans-medium brochure" href="/placeholder.pdf" target="_blank">
                <img src={brochure} alt="brochure icon" />
                <span>VIEW BROCHURE</span>
              </a>   
          </div>
        </div>
      </header>
    );
  };
}