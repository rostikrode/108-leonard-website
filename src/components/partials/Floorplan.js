import React, {Component} from 'react';
import Img from 'react-image';
import {VelocityComponent} from 'velocity-react';
import ComingSoon from './ComingSoon';
import Draggable from 'react-draggable';
import cookie from './cookies.js';

import '../../styles/Floorplan.css';

import close_thin from '../../assets/close_thin.svg';
import close_thin_blue from '../../assets/close_thin_blue.svg';

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
      y: 0,
      openedInstructions: false,
      resFile: ''
    }

    this.onCloseInfo = this.onCloseInfo.bind(this);
    this.onOpenInfo = this.onOpenInfo.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.onZoomFloorplan = this.onZoomFloorplan.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDownloadClick = this.onDownloadClick.bind(this);
  }

  componentDidMount() {
    if (!cookie.cookies.readCookie('instructionsShown')) {
      if(this.tutorial) {
        this.tutorial.classList.remove('hide')
        this.tutorial.classList.add('show');
        this.setState({
          openedInstructions: true
        });
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

  onDownloadClick(e) {
    e.preventDefault();

    console.log(e.currentTarget.href);

    if (window.location.origin === 'https://108leonard.com') {
      window.gtag('event', 'download_floorplan', {
        'event_category': 'Availability',
        'event_label': e.currentTarget.href
      });
    }

    window.open(e.currentTarget.href, '_blank');
  }

  onCloseInfo(e) {
    e.persist();

    this.setState({
      openedInstructions: false
    });

    if (this.tutorial.classList.contains('show')) {
      this.tutorial.classList.remove('show')
      this.tutorial.classList.add('hide');
    }
  }
  onOpenInfo(e) {
    console.log(this.props.extft, typeof this.props.extft);
    this.setState({
      openedInstructions: true
    });
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

  delimitNumbers(str) {
    return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
      return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
    });
  }
  closeBtnClick() {
    this.props.onCloseBtnClick(false);

    // zoom out on overlay close
    zoomAnimation = {
      animation: {
        scale: 1,
        top: 0,
        left: 0
      }
    }

    if (this.span !== null) {
      this.span.style.transform = 'translate(0, 0)'; 
      this.floorplanimage.runAnimation(zoomAnimation);
      this.setState({
        zoomed: false
      });
    }
  }

  render() {
    return (
      <div className={this.props.fstate ? 'floorplan-overlay show' : 'floorplan-overlay hide'} onClick={(e) => {
        
        if(e.target.classList.contains('floorplan-overlay')) {
          this.props.onCloseBtnClick(false)
        }}}>
        <button className="close-btn" onClick={this.closeBtnClick.bind(this)}><img src={close_thin_blue} alt="close btn" className="close-btn-img" width="25" height="25" /></button>

        {this.props.planExists ?
        <div>
          <a className="button download-btn desktop sans-light-bold" target="_blank" href={`/images/5_availability/pdfs/residence_${this.props.residencePDFFileName}.pdf`} onClick={this.onDownloadClick}>DOWNLOAD</a>
          <div className="mobile-title floorplan-title sans-medium">RESIDENCE {this.props.residence}</div>


          <div className="floorplan-content" ref={(e) => this.el = e}>
            <div className="floorplan-sidebar">
              <div className="floorplan-info mobile-stacked">
                <div className="desktop-title floorplan-title sans-medium">RESIDENCE {this.props.residence}</div>
                
                <div className="floorplan-bedrooms serif">
                  <span className="mobile-info-label label sans">BEDROOMS</span>
                  <span className="mobile-info info serif">{this.props.bedrooms}</span>
                  <span className="desktop-info">{this.props.bedrooms === 1 ? `${this.props.bedrooms} BEDROOM` : `${this.props.bedrooms} BEDROOMS`}</span>  
                </div>

                <div className="floorplan-bathrooms serif">
                  <span className="mobile-info-label label sans">BATHROOMS</span>
                  <span className="mobile-info info serif">{this.props.baths}</span>
                  <span className="desktop-info">{this.props.baths === 1 ? `${this.props.baths} BATHROOM` : `${this.props.baths}  BATHROOMS`}</span>
                </div>
                
                <div className="floorplan-interior serif">
                  <span className="mobile-info-label label sans">INTERIOR SQ FT/M</span>
                  <span className="mobile-info info serif">{this.props.intft}/{this.props.intsqm} *</span>
                  <span className="desktop-info">{this.props.intft} SQ FT | {this.props.intsqm} SQ M *</span>
                </div>

                {this.props.hasext ?
                  <div className="floorplan-interior serif">
                    <span className="mobile-info-label label sans">EXTERIOR SQ FT/M</span>
                    <span className="mobile-info info serif">{this.props.extft}/{this.props.extsqm} *</span>
                    <span className="desktop-info">{this.props.extft} SQ FT | {this.props.extsqm} SQ M *</span>
                  </div>
                :
                  ''
                }
                
                <div className="floorplan-interior serif">
                  <span className="mobile-info-label label sans">PRICE</span>
                  <span className="mobile-info info serif">${this.delimitNumbers(this.props.price)}</span>
                  <span className="desktop-info">${this.delimitNumbers(this.props.price)}</span>
                </div>

              </div>

              <div className="desktop-keys floorplan-keys">
                <img src={`/images/5_availability/keys/residence_${this.props.letter}_key.svg`} alt={`Floor Layout for Residence ${this.props.residence}`} />   
              </div>
              <div className="floorplan-info floorplan-footer">
                <p className="serif">* Square footage is approximate</p>
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
                            <div className="dbxd-floorplan desktop-fp" onMouseDown={this.onMouseDown} onMouseUp={this.onZoomFloorplan} style={{ backgroundImage: `url(/images/5_availability/floorplans/residence_${this.props.residenceSVGFileName}.svg)` }} />
                          </VelocityComponent>
                          <Img src={`/images/5_availability/floorplans/residence_${this.props.residenceSVGFileName}.svg`} className="dbxd-floorplan mobile-fp" alt={this.props.residence} loader={<Loader />} />
                        </span>
                      </Draggable>
                      <div className="dbxd-tutorial-wrapper hide" ref={e => {this.tutorial = e}}>
                        <div className="dbxd-tutorial-list">
                          <button title="close info window button" className="dbxd-close" onClick={this.onCloseInfo}>
                            <Img src={close_thin} loader={<Loader />} alt="close floorplan" />
                          </button>
                          <div className="sans dbxd-feat pan_clickdrag">Click to zoom. Click and drag to pan.<br/>Pinch to zoom on mobile and tablet.</div>
                        </div>
                      </div>
                    </div>
                  <button title="Show Intructions" className={`serif detail-info-button dbxd-instructions-icon ${this.state.openedInstructions ? 'hide' : 'show'} `} onClick={this.onOpenInfo}>
                    {/*<Img id="info" src={question} loader={<Loader />} alt="info about floorplan plugin button" />*/}
                    i
                  </button>
                </div>
            </div>
            <div className="mobile-keys floorplan-keys">
              <img className="desktop-key" src={`/images/5_availability/keys/residence_${this.props.letter}_key.svg`} alt={`Stacked Floor Layout for Residence ${this.props.residence}`} />   
              <img className="mobile-key" src={`/images/5_availability/keys/residence_${this.props.letter}_key_horizontal.svg`} alt={`Horizontal Floor Layout for Residence ${this.props.residence}`} />   
            </div>
          </div>
          </div>
        :
          <ComingSoon 
            availMessage='Please contact the sales gallery at <a class="grey-link" href="tel:2127751080">212 775 1080</a> for more information.'
            metaTitle='108 Leonard | Available apartments for sale in Tribeca NYC.'
            metaDescription='Please contact the sales gallery for current availability.'
          />
        }
      </div>
    );
  }
}

export default Floorplan;