import React, {Component} from 'react';
import Img from 'react-image';
import cookie from './cookies.js';

import '../../styles/Floorplan.css';

import close from '../../assets/close.svg';
import close_blue from '../../assets/close_blue.svg';
import floorplan_placeholder from '../../assets/floorplan/floorplan_placeholder.svg';
import download from '../../assets/floorplan/download.svg';
import expand from '../../assets/floorplan/expand.svg';
import minimize from '../../assets/floorplan/minimize.svg';
import print from '../../assets/floorplan/print.svg';
import question from '../../assets/floorplan/question.svg';


const Loader = () => {
  return (
    <div className="loading-wrapper"><i className="loading"></i></div>
  );
}

class Floorplan extends Component {
  constructor(props) {
    super(props);

    this.onCloseInfo = this.onCloseInfo.bind(this);
    this.onOpenInfo = this.onOpenInfo.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.onZoomFloorplan = this.onZoomFloorplan.bind(this);
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
    console.log(e.currentTarget);

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

  onZoomFloorplan(e) {
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    var distX = mouseX - (e.currentTarget.getBoundingClientRect().left+(e.currentTarget.getBoundingClientRect().width/2));
    var distY = mouseY - (e.currentTarget.getBoundingClientRect().top+(e.currentTarget.getBoundingClientRect().height/2));

    console.log(mouseX, mouseY, distX, distY);

    /**
     * TODO: the rest of the zoom function implemented in ReactJS - use Velocity?
     */
  }


  render() {
    return (
      <div className={this.props.fstate ? 'floorplan-overlay show' : 'floorplan-overlay hide'} onClick={(e) => {
        if(e.target.classList.contains('floorplan-overlay')) {
          this.props.onCloseBtnClick(false)
        }}}>
        <div className="floorplan-content" ref={(e) => this.el = e}>
          <button className="close-btn" onClick={() => {this.props.onCloseBtnClick(false)}}><img src={close} alt="close btn" className="close-btn-img" /></button>
          <div className="floorplan-wrapper" id={`residence-${this.props.fresidence}`}>
              <p className="dbxd-no-print">Printing these floorplans is not allowed.</p>
              <div className="dbxd-floorplan-layout" ref={e => {this.layout = e}}>
                <div className="dbxd-floorplan-wrapper">  
                  <Img src={floorplan_placeholder} className="dbxd-floorplan ui-draggable ui-draggable-handle ui-draggable-disabled" loader={<Loader />} alt={this.props.fresidence} onClick={this.onZoomFloorplan}  />
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
                <div className="dbxd-icon-wrapper">
                  <a title="Print floorplan" target="_blank" rel="noopener noreferrer" className="dbxd-print" href="/placeholder.pdf">
                    <Img src={print} loader={<Loader />} alt="print floorplan" />
                  </a>
                  <a title="Download floorplan" target="_blank" rel="noopener noreferrer" className="dbxd-download" href="/placeholder.pdf">
                    <Img src={download} loader={<Loader />} alt="download floorplan" />
                  </a>
                  <button title="Expand window" className="dbxd-expand" onClick={this.onExpand}>
                    <Img className="current expand" src={expand} loader={<Loader />} alt="expand floorplan" />
                    <Img className="minimize" src={minimize} loader={<Loader />} alt="minimize floorplan" />
                  </button>
                </div>
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