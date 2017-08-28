import React, {Component} from 'react';
import ListItem from './ListItem';
import '../../styles/List.css';

export default class List extends Component {
  render() {
    return (
      <div className="list" ref={this.props.listElement}>
        {Object.entries(this.props.residences).map((residence, key) => {
          return (
            <ListItem key={key} index={key} {...residence[1]} />
          );
        })}
      </div>
    );
  }
}