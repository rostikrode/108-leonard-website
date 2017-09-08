import React, {Component} from 'react';
import down_arrow_large from '../../assets/down_arrow_large.svg';

export default class ScrollArrow extends Component {
  componentDidMount() {
    this.hideShowDownArrow();  
  }
  
  hideShowDownArrow() {
    // remove down arrow if no scrolling exists
    setTimeout(() => {
      if(this.props.listElementRef) {
        if(this.props.listElementRef.scrollHeight > this.props.listElementRef.clientHeight) {
          this.dwnArrow.classList.remove('hide');
        } else {
          this.dwnArrow.classList.add('hide');
        }
      }
    }, 100);
  }

  render() {
    return (
      <img ref={el=>this.dwnArrow = el} src={down_arrow_large} className="arrow-down-scroll" alt="downward arrow icon"/>
    );
  }
}