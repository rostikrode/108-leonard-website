import React, {Component} from 'react';
import Img from 'react-image';
import {VelocityComponent} from 'velocity-react';
import Draggable from 'react-draggable';
import cookie from './cookies.js';

import '../../styles/Floorplan.css';

import close_blue from '../../assets/close_blue.svg';
import question from '../../assets/floorplan/question.svg';

var zoomAnimation = {};
const Loader = () => {
  return (
    <div className="loading-wrapper">
      <i className="loading" />
    </div>
  );
}

class Floorplan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomed: false,
      dragdisabled: true,
      flag: 0,
      x: 0,
      y: 0
    }

    this.onCloseInfo = this.onCloseInfo.bind(this);
    this.onOpenInfo = this.onOpenInfo.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.onZoomFloorplan = this.onZoomFloorplan.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  componentDidMount() {
    if (!cookie.cookies.readCookie('instructionsShown')) {
      if(this.tutorial) {
        this.tutorial.classList.remove('hide')
        this.tutorial.classList.add('show');
      }
      cookie.cookies.eraseCookie('instructionsShown');
      cookie.cookies.createCookie('instructionsShown', true, 7);
    } else {
      if (this.tutorial) {
        this.tutorial.classList.remove('show');
        this.tutorial.classList.add('hide');
      }
    }
  }

  onCloseInfo(e) {
    if (this.tutorial.classList.contains('show')) {
      this.tutorial.classList.remove('show')
      this.tutorial.classList.add('hide');
    }
  }
  onOpenInfo(e) {
    if (this.tutorial.classList.contains('show')) {
      this.tutorial.classList.remove('show')
      this.tutorial.classList.add('hide');
    } else {
      this.tutorial.classList.remove('hide')
      this.tutorial.classList.add('show');
    }
  }

  onExpand(e) {
    this.layout.classList.toggle('dbxd-floorplan-layout-expand');
    if (e.currentTarget.querySelector('.expand').classList.contains('current')) {
      e.currentTarget.querySelector('.expand').classList.remove('current');
      e.currentTarget.querySelector('.minimize').classList.add('current');
    } else {
      e.currentTarget.querySelector('.minimize').classList.remove('current');
      e.currentTarget.querySelector('.expand').classList.add('current');
    }
  }

  onMouseDown() {
    this.setState({
      flag: 0
    })
  }
  onZoomFloorplan(e) {
    e.persist();
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    var distX = mouseX - (e.currentTarget.getBoundingClientRect().left+(e.currentTarget.getBoundingClientRect().width/2));
    var distY = mouseY - (e.currentTarget.getBoundingClientRect().top+(e.currentTarget.getBoundingClientRect().height/2));
    var $this = e.currentTarget;
    
    // if (window.matchMedia('(min-width: 1366px)').matches) {
      // only active zoom if desktop and if not currently dragging
      if(this.state.flag === 0) {
        $this.classList.toggle('dbxd-zoom');
        if(!this.state.zoomed) {
          // then zoom in...
          zoomAnimation = {
            animation: {
              scale: 2.5,
              top: -distY+'px',
              left: -distX+'px'
            }
          }
          this.floorplanimage.runAnimation(zoomAnimation);
          this.setState({
            zoomed: true,
            x: e.clientX,
            y: e.clientY
          }, () => {
            this.setState({
              dragdisabled: false
            });
          });
        } else {
          // zoom out
          zoomAnimation = {
            animation: {
              scale: 1,
              top: 0,
              left: 0
            }
          }
          this.span.style.transform = 'translate(0, 0)'; 
          this.floorplanimage.runAnimation(zoomAnimation);
          this.setState({
            zoomed: false
          });
        }
      }
    // }
  }

  // check if currently dragging floorplan so as to not accidentally zoom out mid-drag
  handleDrag() {
    this.setState({
      flag: 1
    });
  }

  render() {
    return (
      <div className={this.props.fstate ? 'floorplan-overlay show' : 'floorplan-overlay hide'} onClick={(e) => {
        
        if(e.target.classList.contains('floorplan-overlay')) {
          this.props.onCloseBtnClick(false)
        }}}>
        <button className="close-btn" onClick={() => {this.props.onCloseBtnClick(false)}}><img src={close_blue} alt="close btn" className="close-btn-img" width="25" height="25" /></button>
        <a className="button download-btn desktop sans-light-bold" target="_blank" href={`/images/5_availability/pdfs/residence_${this.props.residence}.pdf`}>DOWNLOAD</a>

        <div className="floorplan-content" ref={(e) => this.el = e}>
          <div className="floorplan-sidebar">
            <div className="floorplan-info">
              <div className="floorplan-title sans-medium">RESIDENCE {this.props.residence}</div>
              <div className="floorplan-bedrooms serif">{this.props.bedrooms === 1 ? `${this.props.bedrooms} BEDROOM` : `${this.props.bedrooms} BEDROOMS`}</div>
              <div className="floorplan-bathrooms serif">{this.props.baths === 1 ? `${this.props.baths} BATHROOM` : `${this.props.baths}  BATHROOMS`}</div>
              <div className="floorplan-interior serif">{this.props.intft} SQ FT | {this.props.intsqm} SQ M</div>
              <div className="floorplan-exposure serif">{this.props.exposure} <br/> EXPOSURES</div>
            </div>
            <div className="floorplan-keys">
              <img src={`/images/5_availability/keys/residence_${this.props.residence}_key.svg`} alt={`Floor Layout for Residence ${this.props.residence}`} />   
            </div>
          </div>

          <div className="floorplan-wrapper" id={`residence-${this.props.residence}`}>
              <p className="dbxd-no-print">Printing these floorplans is not allowed.</p>
              <div className="dbxd-floorplan-layout" ref={e => {this.layout = e}}>
                <div className="dbxd-floorplan-wrapper">  
                  <Draggable disabled={!this.state.zoomed} onDrag={this.handleDrag}>
                    <span ref={e => this.span = e}>
                      <VelocityComponent ref={e => {this.floorplanimage = e}}
                        duration={300}
                        easing="ease-in-out"
                        {...zoomAnimation}>
                          <div className="dbxd-floorplan desktop-fp" onMouseDown={this.onMouseDown} onMouseUp={this.onZoomFloorplan} style={{ backgroundImage: `url(/images/5_availability/floorplans/residence_${this.props.residence}.svg)` }} />
                        </VelocityComponent>
                        <Img src={`/images/5_availability/floorplans/residence_${this.props.residence}.svg`} className="dbxd-floorplan mobile-fp" alt={this.props.residence} loader={<Loader />} />
                      </span>
                    </Draggable>
                    <div className="dbxd-tutorial-wrapper hide" ref={e => {this.tutorial = e}}>
                      <div className="dbxd-tutorial-list">
                        <button title="close info window button" className="dbxd-close" onClick={this.onCloseInfo}>
                          <Img src={close_blue} loader={<Loader />} alt="close floorplan" />
                        </button>
                        <div className="sans dbxd-feat zoom">Click floorplan to zoom in and out.</div>
                        <div className="sans dbxd-feat pan_clickdrag">While zoomed in, click and drag mouse to pan the floorplan.<br/><br/><br/>On mobile and tablet devices, pinch your screen to zoom in.</div>
                      </div>
                    </div>
                  </div>
                <button title="Show Intructions" className="dbxd-instructions-icon" onClick={this.onOpenInfo}>
                  <Img id="info" src={question} loader={<Loader />} alt="info about floorplan plugin button" />
                </button>
                <p className="dbxd-copyright">
                  <a href="//www.dbxd.com" target="_blank" rel="noopener noreferrer" className="sans-medium">© DBXD</a>
                </p>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Floorplan;