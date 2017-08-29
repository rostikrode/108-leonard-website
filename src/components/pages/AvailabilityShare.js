import React, {Component} from 'react';
import ComingSoon from '../partials/ComingSoon';
// import '../../styles/Contact.css';

export default class AvailabilityShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxArray: []
    };
  }
  componentDidMount() {
    document.title = "Availability Share Page";
    document.getElementsByTagName('meta').description.content = "Availability share page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;

    console.log(this.props.location.state.checkboxArray);
    this.setState({
      checkboxArray: this.props.location.state.checkboxArray
    })
  }

  render() {
    return (
      <div>
        You have chosen to share...
      {
        this.state.checkboxArray.length > 0 ?
        
        <strong>{this.state.checkboxArray}</strong>
        :
        <i>Nothing</i>
      }
      </div>
    );
  }
}