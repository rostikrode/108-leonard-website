import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
// import {VelocityComponent, velocityHelpers} from 'velocity-react';
import logo from '../../assets/logo.svg';
// import brochure from '../../assets/brochure.svg';
import logoText from '../../assets/108_leonard_text.svg';
import insta from '../../assets/insta.svg';
import facebook from '../../assets/facebook.svg';
import '../../styles/Header.css';

let currentPage = '';
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: '',
      home: ''
    };
    this.sectionOnScroll = this.sectionOnScroll.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.sectionOnScroll);
    window.addEventListener('load', this.handleLoad);
    this.onAvailabilityPage();
    this.onPressPage();

    // if (window.location.pathname === '/') {
    //   if (!Cookies.get('alreadyPlayed')) {
    //     this.setState({
    //       alreadyPlayed: false,
    //     }, () => {
    //       this.header.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
    //       setTimeout(() => {
    //         this.header.classList.add('slide-down');
    //         this.appHeader.classList.add('slide-over');
    //         this.setState({
    //           alreadyPlayed: true,
    //         });
    //         Cookies.set('alreadyPlayed', true, {expires: 14});
    //       }, 7500);
    //     });
    //   }
    // }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.sectionOnScroll);
  }

  componentDidUpdate() {
    this.onAvailabilityPage();
    this.onPressPage();
    // if new page, remove active classes from subnavs (counts for the next page button too)
    if (this.props.page !== currentPage) {
      let allsubnavs = this.nav.querySelectorAll('.nav-subnav-item');

      this.props.passAllSubnavs(allsubnavs);

      for (let i = 0; i < allsubnavs.length; i++) {
        allsubnavs[i].classList.remove('active');
      }
    }
    currentPage = this.props.page;

    if (this.state.alreadyPlayed) {
      this.header.classList.remove('slide-down');
      this.appHeader.classList.remove('slide-over');
    }
  }

  onAvailabilityPage() {
    let url = window.location.pathname;
    setTimeout(() => {
      if ((url.split('/')[1] === 'availability') || (url === '/availability/') || (url === '/share/')) {
        this.nav.querySelector(`.nav-list .nav-anchor-wrapper .nav-anchor[href="/availability/"]`).classList.add('active');
      } else {
        this.nav.querySelector(`.nav-list .nav-anchor-wrapper .nav-anchor[href="/availability/"]`).classList.remove('active');
      }
    }, 100);
  }
  onPressPage() {
    // let url = window.location.pathname;
    // setTimeout(() => {
    //   if ((url.split('/')[1] === 'press')) {
    //     this.footer.querySelector(`.nav-anchor[href="/press/"]`).classList.add('active');
    //   } else {
    //     this.footer.querySelector(`.nav-anchor[href="/press/"]`).classList.remove('active');
    //   }
    // }, 100);
  }

  sectionOnScroll() {
    setTimeout(() => {
      if (this.nav.querySelector('.nav-subnav-item.active')) {
        let current = this.nav.querySelector('.nav-subnav-item.active').getAttribute('data-id');
        /** on new subtitle... */
        if (current !== this.props.section) {
          this.props.newSection(current);
        }
      } else {
        if (this.props.section !== '') {
          this.props.newSection('');
        }
      }
    }, 100);
  }

  scrollToTop(scrollDuration) {
    const scrollHeight = window.scrollY,
          scrollStep = Math.PI / ( scrollDuration / 15 ),
          cosParameter = scrollHeight / 2;
    let scrollCount = 0,
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
    let url = e.currentTarget.getAttribute('href');
    let currUrl = window.location.pathname;
    if (url === currUrl) {
      this.props.onNavClick(true);
    }

    this.props.newPage(e.target.text);
    if (this.state.open === 'open') {
      this.setState({
        open: '',
      });
    } else {
      this.setState({
        open: 'open',
      });
    }

    // remove any leftover active sub pages
    let allsubs = this.nav.querySelectorAll('.nav-subnav-item');
    for (let i = 0; i < allsubs.length; i++) {
      allsubs[i].classList.remove('active');
    }

    /** scroll to top on mobile */
    this.scrollToTop(1000);
  }

  onSubClick(e) {
    if(this.props.parentslider) {
      // slider go to slide that corresponds to active subnav
      let index = e.target.getAttribute('data-id');
      let slide = this.props.parentslider.querySelector(`.slick-slide[data-section="${index}"]`);
      if (slide) {
        /** desktop version, that has a carousel */
        let slideIndex = parseInt(slide.getAttribute('data-index'), 10);
        if (this.props.slider !== null) {
          this.props.slider.slickGoTo(slideIndex);
        }
      }

      let allsubs = this.nav.querySelectorAll('.nav-subnav-item');
      for (let i = 0; i < allsubs.length; i++) {
        allsubs[i].classList.remove('active');
      }
      e.target.classList.add('active');

      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    if (this.state.open === 'open') {
      this.setState({
        open: '',
      });
    } else {
      this.setState({
        open: 'open',
      });
    }
  }
  render() {
    return (

      <header className='header' ref={(c) => this.header = c }>

          <button className={`ham-nav-button ${this.props.page ? '' : ''}`} onClick={()=>{
this.openMobileMenu();
}} ref={(c) => this.hamNavButton = c }>
            <div className={`ham-nav ${this.state.open}`}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>


          <div className='mobile-header' ref={(c) => this.mobileHeader = c }>
            <div className="navigation-titles">
                <h4 className="title"><img src={logoText} alt="108 Leonard text logo" /></h4>
                  <h3 ref={ (el) => this.subTitle = el} className="come-in sub-title sans-light-bold">
                    {this.props.page ? this.props.page : ''} {this.props.section ? `| ${this.props.section}` : ''}
                  </h3>
            </div>
          </div>


          <div className={`app-header ${this.state.open}`} ref={(c) => this.appHeader = c }>
            <NavLink onClick={(e)=>{
this.onNavItemClick(e)
;
}} data-type="" activeClassName="active" id="home-0" strict exact to="/" href="/"><img src={logo} className="app-logo" alt="logo" /></NavLink>
            <nav ref={(el) => this.nav = el}>
              <ul className="nav-list" ref={ (listElement) => this.listElement = listElement}>

              {this.props.pages.map((p, key) => {
                  return (
                    <li key={key} className="nav-anchor-wrapper">
                      <NavLink data-type={p.subnavs.length > 0 ? 'carousel' : '' } activeClassName="active" id={`nav-anchor-${key}`} className="nav-anchor sans" onClick={(e)=>{
this.onNavItemClick(e);
}} strict exact to={p.slug}>{p.title}</NavLink>

                      {p.subnavs.length > 0 ?
                        <ul className="nav-subnav">
                          {p.subnavs.map((sub, k) => {
                            return (
                              <li role="button" key={k}
                                data-id={sub}
                                className="nav-subnav-item sans-light"
                                style={{transitionDelay: 100*k+'ms'}}
                                onClick={(e)=>{
this.onSubClick(e);
}}>
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
                  <NavLink data-type="carousel" activeClassName="active" id="team-0" className="nav-anchor sans-medium" onClick={(e)=>{this.onNavItemClick(e);}} strict exact to="/team/">Team</NavLink>
                  <NavLink data-type="" activeClassName="active" id="press-0" className="nav-anchor sans-medium" onClick={(e)=>{this.onNavItemClick(e);}} strict exact to="/press/">Press</NavLink>
                  <NavLink data-type="" activeClassName="active" id="legal-0" className="nav-anchor sans-medium" onClick={(e)=>{this.onNavItemClick(e);}} strict exact to="/legal/">Legal</NavLink>
                </div>
                <div className="social-icons">
                  <a rel="noopener noreferrer" href="https://www.instagram.com/108_leonard/" target="_blank" >
                    <img className="insta" src={insta} alt="Instagram @108_leonard" />
                  </a>
                  <a rel="noopener noreferrer" href="https://www.facebook.com/108leonardst/" target="_blank" >
                    <img className="facebook" src={facebook} alt="Facebook at 108leonardst" />
                  </a>
                </div>
                {/*<a className="link sans-medium brochure" href="/placeholder.pdf" target="_blank">
                  <img src={brochure} alt="brochure icon" />
                  <span>VIEW BROCHURE</span>
                </a>*/}
            </div>
          </div>

      </header>

    );
  }
}
