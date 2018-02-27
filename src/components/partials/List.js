import React, {Component} from 'react';
import ListItem from './ListItem';
import '../../styles/List.css';

export default class List extends Component {
  onViewFloorplanClick(fresidence, fstate, fexists) {
    this.props.onViewFloorplanClick(fresidence, fstate, fexists);
  }
  sendCheckboxes(checkArray) {
    this.props.sendCheckboxes(checkArray);
  }
  render() {
    return (
      <div className="list" ref={this.props.listElement}>
        {this.props.residences.map((residence, key) => {
          return (
            <ListItem key={key} index={key} {...residence} sendCheckboxes={this.sendCheckboxes.bind(this)} onViewFloorplanClick={this.onViewFloorplanClick.bind(this)} />
          );
        })}
      </div>
    );
  }
}