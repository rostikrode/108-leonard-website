import React, { Component } from 'react';
// import { VelocityComponent } from 'velocity-react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import '../../styles/Header.css';

// var animationProps;

export default class Header extends Component {
  // componentDidMount() {
  //   this.getInitLeft();

  //   window.addEventListener('resize', ()=>{ this.getInitLeft()});
  // }

  // getInitLeft() {
  //   var hleft = Math.round(this.listElement.querySelector('.nav-anchor-wrapper a.active').parentNode.getBoundingClientRect().left);
  
  //   this.lineElement.style.left = `${hleft}px`;
  // }

  onNavItemClick(e) {
    // var left = Math.round(e.currentTarget.getBoundingClientRect().left);

    // animationProps = {
    //   duration: 500,
    //   easing: 'ease-in-out',
    //   animation: {
    //     left: `${left}px`
    //   }
    // };
    // this.velocity.runAnimation(animationProps);
  }

  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
        <nav>
          <ul className="nav-list" ref={ (listElement) => this.listElement = listElement}>
            <li className="nav-anchor-wrapper" onClick={(e)=>{this.onNavItemClick(e)}}>
              <NavLink className="nav-anchor" activeClassName="active" strict exact to="/">Home</NavLink>
            </li>
            <li className="nav-anchor-wrapper" onClick={(e)=>{this.onNavItemClick(e)}}>
              <NavLink className="nav-anchor" activeClassName="active" strict exact to="/building">Building</NavLink>
            </li>
            <li className="nav-anchor-wrapper" onClick={(e)=>{this.onNavItemClick(e)}}>
              <NavLink className="nav-anchor" activeClassName="active" strict exact to="/residences">Residences</NavLink>
            </li>
          </ul>
            {/*<VelocityComponent {...animationProps} ref={(velocity)=> this.velocity = velocity}>
              <span className="underline" ref={(lineElement)=>this.lineElement = lineElement}></span>
            </VelocityComponent> */}
        </nav>
      </header>
    );
  }
}
