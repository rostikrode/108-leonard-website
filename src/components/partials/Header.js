import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import brochure from '../../assets/brochure.svg';
import logoText from '../../assets/108_leonard_text.svg';
import '../../styles/Header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: '',
      currSec: ''
    }
    this.sectionOnScroll = this.sectionOnScroll.bind(this);
  }
  componentDidMount() {
    var url = window.location.pathname;
    this.props.pages.forEach((index, key) => {
      if(url === index.slug) {
        this.setState({
          currPage: index.title
        });
      }
    });

    window.addEventListener('scroll', this.sectionOnScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.sectionOnScroll);
  }

  sectionOnScroll(e) {
    setTimeout(() => {
      if(document.querySelector('.nav-subnav-item.active')) {
        var current = document.querySelector('.nav-subnav-item.active').getAttribute('data-id');
        /** on new subtitle... */
        if(current !== this.props.section) {
          /** on new subtitle... */
          document.querySelector('.sub-title').classList.remove('come-in');
          document.querySelector('.sub-title').classList.add('go-away');
          this.props.newSection(current);
          setTimeout(() => {
            document.querySelector('.sub-title').classList.remove('go-away');
            document.querySelector('.sub-title').classList.add('come-in');
          }, 300);

        }
      } else {
        if(this.props.section !== '') {
          document.querySelector('.sub-title').classList.remove('come-in');
          document.querySelector('.sub-title').classList.add('go-away');
          this.props.newSection('');
          setTimeout(() => {
            document.querySelector('.sub-title').classList.remove('go-away');
            document.querySelector('.sub-title').classList.add('come-in');
          }, 300);
        }
      }
    }, 100);
  }

  onNavItemClick(e) {
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
    var allsubs = document.getElementsByClassName('nav-subnav-item');
    for(var i = 0; i < allsubs.length; i++) {
      allsubs[i].classList.remove('active');
    }
  }
  
  onSubClick(e) {
    this.setState({
      currSec: ` | ${e.target.getAttribute('data-id')}`
    });

    let allsubs = document.getElementsByClassName('nav-subnav-item');
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
    return (
      <header className="header">
        <button className="ham-nav-button" onClick={()=>{this.openMobileMenu()}}>
          <div className={`ham-nav ${this.state.open}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <div className="mobile-header">
          <div className="navigation-titles">            
              <h4 className="title"><img src={logoText} alt="108 Leonard text logo"  /></h4>
                <h3 ref={ (el) => this.subTitle = el} className="come-in sub-title sans-light-bold">{this.props.page} {this.props.section ? `| ${this.props.section}` : ''}</h3>
          </div>
        </div>
        <div className={`app-header ${this.state.open}`}>
          <img src={logo} className="app-logo" alt="logo" />
          <nav>
            <ul className="nav-list" ref={ (listElement) => this.listElement = listElement}>

            {Object.entries(this.props.pages).map((p, key) => {
                return (
                  <li key={key} className="nav-anchor-wrapper">
                    <NavLink data-type={p[1].subnavs.length > 0 ? "carousel" : "" } activeClassName="active" id={`nav-anchor-${key}`} className="nav-anchor sans" onClick={(e)=>{this.onNavItemClick(e)}} strict exact to={p[1].slug}>{p[1].title}</NavLink>
                    
                    {p[1].subnavs.length > 0 ?
                      <ul className="nav-subnav">
                        {Object.entries(p[1].subnavs).map((sub, k) => {
                          return (
                            <li role="button" key={k} 
                              data-id={sub[1]}
                              className="nav-subnav-item sans-light"
                              style={{transitionDelay: 100*k+'ms'}}
                              onClick={(e)=>{this.onSubClick(e)}}>
                              {sub[1]}
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
          <div className="footer">
              <div className="footer-pages">
                <NavLink data-type="" activeClassName="active" id="team-0" className="nav-anchor sans-medium" onClick={(e)=>{this.onNavItemClick(e)}} strict exact to="/team">Team</NavLink>
                <NavLink data-type="" activeClassName="active" id="press-0" className="nav-anchor sans-medium" onClick={(e)=>{this.onNavItemClick(e)}} strict exact to="/press">Press</NavLink>
                <NavLink data-type="" activeClassName="active" id="legal-0" className="nav-anchor sans-medium" onClick={(e)=>{this.onNavItemClick(e)}} strict exact to="/legal">Legal</NavLink>
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