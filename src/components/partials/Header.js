import React, { Component } from 'react';
import { VelocityComponent } from 'velocity-react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import '../../styles/Header.css';
 
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: '',
      activeSub: ''
    }
  }
  onNavItemClick(e) {
    this.setState({
        clickedNav: true
      });
    
    if(this.state.open === 'open') {
      this.setState({
        open: ''
      });

    } else {
      this.setState({
        open: 'open'
      });
    }

    /** removing subnav active class  */
    if(e.target.nextSibling.children.length > 0) {
      document.getElementsByClassName('nav-subnav-item')[0].classList.add('active');
      let allsubs = document.getElementsByClassName('nav-subnav-item');
      for(let i = 0; i < allsubs.length; i++) {
        allsubs[i].classList.remove('active');
      }
    }
  }
  
  onSubClick(e) {
    // let subnav = e.target.getAttribute('data-id');

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
        <div className="mobile-header">
          <div className={`ham-nav ${this.state.open}`} onClick={()=>{this.openMobileMenu()}}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <VelocityComponent animation={{ opacity: this.state.open === 'open' ? 0 : 1 }} duration={200}>
            <h4 className="title">108 LEONARD</h4>
          </VelocityComponent>
        </div>
        <div className={`app-header ${this.state.open}`}>
          <img src={logo} className="app-logo" alt="logo" />
          <h2>108 Leonard</h2>
          <nav>
            <ul className="nav-list" ref={ (listElement) => this.listElement = listElement}>

            {Object.entries(this.props.pages).map((p, key) => {
                return (
                  <li key={key} className="nav-anchor-wrapper">
                    <NavLink id={`nav-anchor-${key}`} className="nav-anchor" onClick={(e)=>{this.onNavItemClick(e)}} activeClassName="active" strict exact to={p[1].slug}>{p[1].title}</NavLink>
                    
                    {p[1].subnavs ?
                      <ul className="nav-subnav">
                        {Object.entries(p[1].subnavs).map((sub, k) => {
                          return (
                            <li role="button" key={k} 
                              data-id={sub[1]}
                              className={`nav-subnav-item`}
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
        </div>
      </header>
    );
  };
}