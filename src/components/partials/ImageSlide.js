import React, {Component} from 'react';
import Img from 'react-image';
import Loader from './Loader';
import close from '../../assets/close_thin.svg';

export default class ImageSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slidUp: false
    }
    this.onInfoButtonClick = this.onInfoButtonClick.bind(this);
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
  }

  onInfoButtonClick(e) {
    e.currentTarget.blur();
    this.setState({
      slidUp: true
    });
  }

  onCloseButtonClick() {
    this.setState({
      slidUp: false
    });
  }
  
  render() {
    return (
      <div className="inner">
        {this.props.slide.newsection ? 
            <h3 data-section={this.props.slide.section} className="newsection mobile-section sans-light-bold">{this.props.page} |  {this.props.slide.section}</h3>
          : ''}
          
          <div className="image-wrapper">
            <Img src={this.props.slide.src} loader={<Loader />} alt={this.props.slide.caption} onLoad={()=> {this.props.onIntroImgLoad();}} />

            {this.props.slide.detail ? 
              <button className={`serif detail-info-button ${this.state.slidUp ? 'hide' : 'show'}`} onClick={this.onInfoButtonClick} ref={e => {this.infobutton = e}}>i</button>
              :''
            }
            {this.props.slide.detail ? 
              <div className={`detail-info-wrapper ${this.state.slidUp ? 'slideUp' : 'slideDown'}`}>
                <div className="serif">{this.props.slide.detail}</div>
                <button className="serif close-detail-info-button" onClick={this.onCloseButtonClick}>
                  <img className="close-img" src={close} alt="close detail caption" />
                </button>
              </div>
            :
            ''
            }
          </div>
          <p className="caption serif-bold" >{this.props.slide.caption}</p>
      </div>
    );
  }
}