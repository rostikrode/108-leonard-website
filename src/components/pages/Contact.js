import React, {Component} from 'react';
import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react';
import Checkbox from '../partials/Checkbox';
import '../../styles/Contact.css';

const Error = (props) => {
  return (
    <div className="error serif heavy upper">{props.error}</div>
  );
}

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      submitMessage: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    /** meta data for page */
    document.title = 'Contact Page';
    if(document.getElementsByTagName('meta').description) {
      document.getElementsByTagName('meta').description.content = 'Contact page description.';
    }
    if (document.querySelector("link[rel='canonical']")) {
      document.querySelector("link[rel='canonical']").href = window.location.href
    }
    var viewport = document.querySelector("meta[name=viewport]");
    if(viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=0');
    }
  }

  handleSubmit(e) {
    e.preventDefault();

        // var data = '?', posturl = '';
        // data += `fromname=${encodeURIComponent(this.state.fromfirst)} ${encodeURIComponent(this.state.fromlast)}`;
        // data +=  `&fromemail=${encodeURIComponent(this.state.fromemail)}`;
        // data +=  `&toname=${encodeURIComponent(this.state.tofirst)} ${encodeURIComponent(this.state.tolast)}`;
        // data +=  `&toemail=${encodeURIComponent(this.state.toemail)}`;
        // data +=  `&subject=${encodeURIComponent(this.state.fromfirst)} ${encodeURIComponent(this.state.fromlast)} Has Shared 108 Leonard Residences With You`;
        // data +=  `&phrase=${encodeURIComponent(this.state.residencephrase)}`;
        // data +=  `&url=${encodeURIComponent(this.state.residenceurl)}`;
        // data +=  `&template=${encodeURIComponent('http://108leonard-full.dev.dbxd.com.s3-website-us-east-1.amazonaws.com/form-template.html')}`;

        // // don't actually send email on localhost
        // if (window.location.host.includes('localhost')) {
        //   posturl = '#';
        // } else {
        //   posturl = `https://api.dbxd.com/sendmail.v1/send/${data}`;
        // }

        // /** TODO: fade out form and fade in responses */
        //   fetch(posturl, {
        //     method: 'post',
        //     headers: {
        //       'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        //   })
        //   .then((response) => {
        //     console.log(response.status === 200 ? `posted ok ${response}` : 'error');
        //     console.log(response);

        //     if(response.status === 200) {
        //       this.setState({
        //         submitMessage: <div className="response-message"><p className="sans-light-bold">Thank you for your interest in 108 Leonard.</p><p className="sans-light-bold">Your email has been sent to {this.state.toemail}</p></div>
        //       });
        //     } else {
        //       this.setState({
        //         submitMessage: <div className="response-message"><p className="sans-light-bold">Your email could not be sent at this time.</p><p className="sans-light-bold">Please try again later.</p></div>
        //       });
        //     }
        //   })
        //   .catch((err) => {
        //     console.log('Request error ', err);
        //     this.setState({
        //       submitMessage: <div className="response-message"><p className="sans-light-bold">Your email could not be sent at this time.</p><p className="sans-light-bold">Please try again later.</p></div>
        //     });
        //   });
  }

  render() {
    return (
      <div className="form-page-wrapper">
        {this.state.submitMessage ? 
          <VelocityComponent animation="fadeIn" display="flex" easing="ease-in" duration={400} runOnMount>
            <div className="form-page-message">
              <div className="form-chosen message">
                <div className="sans-light-bold">{this.state.submitMessage}</div>
              </div>
            </div>
          </VelocityComponent>
        : 
          <div className="form-page">
            <div className="form-wrapper contact-form-wrapper">
              
            <VelocityTransitionGroup enter={{animation: "slideDown", display: 'flex', duration: 400, easing: 'ease-in-out'}} leave={{animation: "slideUp", duration: 400, easing: 'ease-in-out'}}>
                {this.state.error.length > 0 ? 
                  <div className="error-wrapper">
                    <Error error={this.state.error} />
                  </div>
                : 
                  undefined}
              </VelocityTransitionGroup>

              <form noValidate ref={(e) => this.contactform = e} onSubmit={this.handleSubmit}>
                <div className="half-wrapper">
                  <input onChange={ (e) => this.setState({ first: e.target.value })} name="first" required className="black-ph half" type="text" placeholder="FIRST NAME*" tabIndex="0" />
                  <input onChange={ (e) => this.setState({ last: e.target.value })} name="last" required className="black-ph half" type="text" placeholder="LAST NAME*" tabIndex="0" />
                </div>
                
                <input onChange={ (e) => this.setState({ email: e.target.value })} name="email" required className="black-ph whole" type="email" placeholder="EMAIL*" tabIndex="0" />

                <div className="half-wrapper">
                  {/* textfield with dropdown */}
                  <input onChange={ (e) => this.setState({ countrycode: e.target.value })} name="countrycode" required className="black-ph half" type="text" placeholder="COUNTRY*" tabIndex="0" />
                  <input onChange={ (e) => this.setState({ phone: e.target.value })} name="phone" required className="black-ph half" type="tel" placeholder="PHONE NUMBER*" tabIndex="0" />
                </div>
                
                {/* radio select */}
                <div className="radio-fieldset">
                  <span className="radio-field">
                    <Checkbox radio={true} radio_id='client_type' value="29766" handleCheck={this.handleCheck} index="client-type-broker" />
                    <span className="serif">BROKER</span>
                  </span>
                  <span className="radio-field">
                    <Checkbox radio={true} radio_id='client_type' value="29767" handleCheck={this.handleCheck} index="client-type-purchaser" />
                    <span className="serif">PROSPECTIVE PURCHASER</span>
                  </span>
                </div>


                <input onChange={ (e) => this.setState({ client_type: e.target.value })} name="client_type" required className="black-ph whole" type="text" placeholder="BROKER PROSPECTIVE PURCHASER*" tabIndex="0" />

                {/* on broker select - textfield with dropdown */}
                <input onChange={ (e) => this.setState({ brokerage_firm: e.target.value })} name="brokerage_firm" className="black-ph whole" type="text" placeholder="BROKERAGE FIRM" tabIndex="0" />

                {/* on purchaer select  - radio */}
                <input onChange={ (e) => this.setState({ represented: e.target.value })} name="represented" required className="black-ph whole" type="text" placeholder="REPRESENTED BY A BROKER?*" tabIndex="0" />

                {/* on represented select */}
                <input onChange={ (e) => this.setState({ agent_name: e.target.value })} name="agent_name" required className="black-ph whole" type="text" placeholder="AGENT NAME*" tabIndex="0" />
                {/* textfield with dropdown */}
                <input onChange={ (e) => this.setState({ brokerage_firm: e.target.value })} name="brokerage_firm" required className="black-ph whole" type="text" placeholder="BROKERAGE FIRM*" tabIndex="0" />


                {/* dropdown */}  
                <input onChange={ (e) => this.setState({ residence: e.target.value })} name="residence" className="black-ph whole" type="text" placeholder="DESIRED RESIDENCE" tabIndex="0" />
                {/* dropdown */}
                <input onChange={ (e) => this.setState({ hear_about: e.target.value })} name="hear_about" className="black-ph whole" type="text" placeholder="HOW DID YOU HEAR ABOUT US?" tabIndex="0" />
                
                <input type="submit" value="Submit" className="button sans-light-bold"/>
              </form>
            </div>
                
            <a className="serif-bold link" href="mailto:info@108leonard.com" >info@108leonard.com</a>
            <a className="serif-bold link" href="tel:2125551212" >212&#8226;555&#8226;1212</a>
          </div>
        }
      </div>
    );
  }
}