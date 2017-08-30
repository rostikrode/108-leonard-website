import React, {Component} from 'react';
import '../../styles/Contact.css';

export default class AvailabilityShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxArray: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    document.title = "Availability Share Page";
    document.getElementsByTagName('meta').description.content = "Availability share page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;

    console.log(this.props.location.state);

    this.setState({
      checkboxArray: this.props.location.state ? this.props.location.state.checkboxArray : 'Nothing'
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('clicky')
  }

  render() {
    return (
      <div className="share-page">
        <div className="share-chosen">
        <span className="serif upper">You have requested to share floorplans for residences,&nbsp;</span>
        {Object.entries(this.state.checkboxArray).map((res, key) => {
          return (
            <span key={key} className="share-chosen-res serif upper serif-bold-same-size">
            &nbsp;{key === (this.state.checkboxArray.length - 1) ? `and ${res[1]}` : `${res[1]},`}
            </span>
          );
        })}
        </div>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <label className="form-section serif upper heavy">To:</label>
            <div className="half-wrapper">
              <input className="black-ph half" type="text" placeholder="FIRST NAME*" tabIndex="0" />
              <input className="black-ph half" type="text" placeholder="LAST NAME*" tabIndex="0" />
            </div>
            <input className="black-ph whole" type="email" placeholder="EMAIL NAME*" tabIndex="0" />

            <label className="form-section serif upper heavy">From:</label>
            <div className="half-wrapper">
              <input className="black-ph half" type="text" placeholder="FIRST NAME*" tabIndex="0" />
              <input className="black-ph half" type="text" placeholder="LAST NAME*" tabIndex="0" />
            </div>
            <input className="black-ph whole" type="email" placeholder="EMAIL NAME*" tabIndex="0" />
            <input type="submit" value="Submit" className="button sans-light-bold"/>
          </form>
        </div>
      </div>
    );
  }
}