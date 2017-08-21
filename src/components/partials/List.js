import React, {Component} from 'react';
import ListItem from './ListItem';
import '../../styles/List.css';

export default class List extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div className="list">
        <ListItem index="0" />
        <ListItem index="1" />
        <ListItem index="2" />
      </div>
    );
  }
}