import React, {Component} from 'react';
import '../../styles/Contact.css';

export default class AvailabilityShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxArray: [],
      tofirst: '',
      tolast: '',
      toemail: '',
      fromfirst: '',
      fromlast: '',
      fromemail: '',
      residenceurl: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    document.title = "Availability Share Page";
    document.getElementsByTagName('meta').description.content = "Availability share page of the website.";
    document.querySelector("link[rel='canonical']").href = window.location.href;

    this.setState({
      checkboxArray: this.props.location.state ? this.props.location.state.checkboxArray : false
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // building the proper URL for sending
    var slug = '';
    var phrase = '';
    this.state.checkboxArray.forEach((value, index) => {
      console.log(this.state.checkboxArray.length, value, index)
      if(index === (this.state.checkboxArray.length - 1)) {
        slug += `${value}`;
        phrase += `and ${value}`;
      } else {
        slug += `${value}&`;
        phrase += `${value}, `;
      }
    });
    this.setState({
      residenceurl: `${window.location.origin}/availability/${slug}`,
      residencephrase:  phrase
    }, () => {
      console.log(this.state);
        fetch('https://api.dbxd.com/sendmail.v1/send/', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fromname: `${this.state.fromfirst} ${this.state.fromlast}`,
            fromemail: this.state.fromemail,
            toname: `${this.state.tofirst} ${this.state.tolast}`,
            toemail: this.state.toemail,
            subject: `${this.state.fromfirst} ${this.state.fromlast} Has Shared 108 Leonard Residences With You`,
            phrase: this.state.residencephrase,
            url: this.state.residenceurl,
            template: 'http://108leonard-full.dev.dbxd.com.s3-website-us-east-1.amazonaws.com/share-template.html'
          })
        })
        .then((response) => {
          console.log(response.status === 200 ? `posted ok ${response}` : 'error');
        })
        .catch((err) => {
          console.log('Request error ', err);
        });
    });
  }

  render() {
    return (
      <div>
      {this.state.checkboxArray ?  
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
          <form ref={(e) => this.shareform = e} onSubmit={this.handleSubmit}>
            <label className="form-section serif upper heavy">To:</label>
            <div className="half-wrapper">
              <input onChange={ (e) => this.setState({ tofirst: e.target.value })} required className="black-ph half" type="text" placeholder="FIRST NAME*" tabIndex="0" />
              <input onChange={ (e) => this.setState({ tolast: e.target.value })} required className="black-ph half" type="text" placeholder="LAST NAME*" tabIndex="0" />
            </div>
            <input onChange={ (e) => this.setState({ toemail: e.target.value })} required className="black-ph whole" type="email" placeholder="EMAIL NAME*" tabIndex="0" />

            <label className="form-section serif upper heavy">From:</label>
            <div className="half-wrapper">
              <input onChange={ (e) => this.setState({ fromfirst: e.target.value })} required className="black-ph half" type="text" placeholder="FIRST NAME*" tabIndex="0" />
              <input onChange={ (e) => this.setState({ fromlast: e.target.value })} required className="black-ph half" type="text" placeholder="LAST NAME*" tabIndex="0" />
            </div>
            <input onChange={ (e) => this.setState({ fromemail: e.target.value })} required className="black-ph whole" type="email" placeholder="EMAIL NAME*" tabIndex="0" />
            <input type="submit" value="Submit" className="button sans-light-bold"/>
          </form>
        </div>
      </div>
      :
      <div className="share-page">
        <div className="share-chosen">
          <span className="serif upper">You have not selected any residences to share.</span>
        </div>
      </div>
      }
      </div>
    );
  }
}