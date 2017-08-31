import React, {Component} from 'react';
import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react';
import '../../styles/Contact.css';

const Error = (props) => {
  return (
    <div className="error serif heavy upper">{props.error}</div>
  );
}

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
      residenceurl: '',
      submitMessage: '',
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    /** meta data for page */
    document.title = 'Availability Share Page';
    if(document.getElementsByTagName('meta').description) {
      document.getElementsByTagName('meta').description.content = 'Share form for availability residences.';
    }
    if (document.querySelector("link[rel='canonical']")) {
      document.querySelector("link[rel='canonical']").href = window.location.href
    }
    var viewport = document.querySelector("meta[name=viewport]");
    if(viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=0');
    }

    this.setState({
      checkboxArray: this.props.location.state ? this.props.location.state.checkboxArray : false
    });
  }

  validateForm() {
    var empty = false;
    var errorStr = '';
    // var emailValid = true;
    var inputs = [this.state.tofirst, this.state.tolast, this.state.toemail, this.state.fromfirst, this.state.fromlast, this.state.fromemail];
    for (var i in inputs) {
      if ((inputs[i] === '') || (inputs[i].match(/^\s$/))) {
        empty = true;
        errorStr = '* fields are required';
      }
    }

    if(!empty) {
      if(!this.state.toemail.match(/^(.+)@(.+)$/) || !this.state.fromemail.match(/^(.+)@(.+)$/)) {
        errorStr = 'Please enter a valid email';
      } else if (this.state.toemail.match(/^(.+)@(.+)$/) && this.state.fromemail.match(/^(.+)@(.+)$/)) {
        errorStr = '';
      }

      if (!this.state.toemail.match(/^(.+)@(.+)$/)) {
        this.shareform.querySelector('input[name="toemail"]').classList.add('error-underline');
      } 
      if (!this.state.fromemail.match(/^(.+)@(.+)$/)) {
        this.shareform.querySelector('input[name="fromemail"]').classList.add('error-underline');
      }
      if (this.state.toemail.match(/^(.+)@(.+)$/) && this.shareform.querySelector('input[name="toemail"]').classList.contains('error-underline')) {
        this.shareform.querySelector('input[name="toemail"]').classList.remove('error-underline');
      } 
      if (this.state.fromemail.match(/^(.+)@(.+)$/) && this.shareform.querySelector('input[name="fromemail"]').classList.contains('error-underline')) {
        this.shareform.querySelector('input[name="fromemail"]').classList.remove('error-underline');
      }
    }
    
    this.setState({
      error: errorStr
    });

    return errorStr.length > 0 ? false : true;
  }

  handleSubmit(e) {
    e.preventDefault();
    // building the proper URL for sending
    var slug = '';
    var phrase = '';
    this.state.checkboxArray.forEach((value, index) => {
      if(index === (this.state.checkboxArray.length - 1)) {
        slug += `${value}`;
        phrase += `and ${value}`;
      } else {
        slug += `${value}&`;
        phrase += `${value}, `;
      }
    });
    this.setState({
      residenceurl: `${window.location.origin}/availability/${slug}/`,
      residencephrase:  phrase
    }, () => {
      var valid = this.validateForm();
      if(valid) {

        var data = '?', posturl = '';
        data += `fromname=${encodeURIComponent(this.state.fromfirst)} ${encodeURIComponent(this.state.fromlast)}`;
        data +=  `&fromemail=${encodeURIComponent(this.state.fromemail)}`;
        data +=  `&toname=${encodeURIComponent(this.state.tofirst)} ${encodeURIComponent(this.state.tolast)}`;
        data +=  `&toemail=${encodeURIComponent(this.state.toemail)}`;
        data +=  `&subject=${encodeURIComponent(this.state.fromfirst)} ${encodeURIComponent(this.state.fromlast)} Has Shared 108 Leonard Residences With You`;
        data +=  `&phrase=${encodeURIComponent(this.state.residencephrase)}`;
        data +=  `&url=${encodeURIComponent(this.state.residenceurl)}`;
        data +=  `&template=${encodeURIComponent('http://108leonard-full.dev.dbxd.com.s3-website-us-east-1.amazonaws.com/share-template.html')}`;

        // don't actually send email on localhost
        if (window.location.host.includes('localhost')) {
          posturl = '#';
        } else {
          posturl = `https://api.dbxd.com/sendmail.v1/send/${data}`;
        }

        /** TODO: fade out form and fade in responses */
          fetch(posturl, {
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then((response) => {
            console.log(response.status === 200 ? `posted ok ${response}` : 'error');
            console.log(response);

            if(response.status === 200) {
              this.setState({
                submitMessage: <div className="response-message"><p className="sans-light-bold">Thank you for your interest in 108 Leonard.</p><p className="sans-light-bold">Your email has been sent to {this.state.toemail}</p></div>
              });
            } else {
              this.setState({
                submitMessage: <div className="response-message"><p className="sans-light-bold">Your email could not be sent at this time.</p><p className="sans-light-bold">Please try again later.</p></div>
              });
            }
          })
          .catch((err) => {
            console.log('Request error ', err);
            this.setState({
              submitMessage: <div className="response-message"><p className="sans-light-bold">Your email could not be sent at this time.</p><p className="sans-light-bold">Please try again later.</p></div>
            });
          });
        }
    });
  }

  render() {
    return (
      <div className="form-page-wrapper">
      {this.state.checkboxArray ?  
        this.state.submitMessage ? 
          <VelocityComponent animation="fadeIn" display="flex" easing="ease-in" duration={400} runOnMount>
            <div className="form-page-message">
              <div className="form-chosen message">
                <div className="sans-light-bold">{this.state.submitMessage}</div>
              </div>
            </div>
          </VelocityComponent>
        : 
          <div className="form-page">
            <div className="form-chosen">
              <span className="serif upper">You have requested to share floorplans for residences,&nbsp;</span>
              {Object.entries(this.state.checkboxArray).map((res, key) => {
                return (
                  <span key={key} className="form-chosen-res serif upper serif-bold-same-size">
                  &nbsp;{key === (this.state.checkboxArray.length - 1) ? (this.state.checkboxArray.length === 1 ? `${res[1]}` : `and ${res[1]}`) : `${res[1]},`}
                  </span>
                );
              })}
            </div>
            <div className="form-wrapper">
              
            <VelocityTransitionGroup enter={{animation: "slideDown", display: 'flex', duration: 400, easing: 'ease-in-out'}} leave={{animation: "slideUp", duration: 400, easing: 'ease-in-out'}}>
                {this.state.error.length > 0 ? 
                  <div className="error-wrapper">
                    <Error error={this.state.error} />
                  </div>
                : 
                  undefined}
              </VelocityTransitionGroup>

              <form noValidate ref={(e) => this.shareform = e} onSubmit={this.handleSubmit}>
                <label className="form-section serif upper heavy">To:</label>
                <div className="half-wrapper">
                  <input onChange={ (e) => this.setState({ tofirst: e.target.value })} name="tofirst" required className="black-ph half" type="text" placeholder="FIRST NAME*" tabIndex="0" />
                  <input onChange={ (e) => this.setState({ tolast: e.target.value })} name="tolast" required className="black-ph half" type="text" placeholder="LAST NAME*" tabIndex="0" />
                </div>
                <input onChange={ (e) => this.setState({ toemail: e.target.value })} name="toemail" required className="black-ph whole" type="email" placeholder="EMAIL*" tabIndex="0" />

                <label className="form-section serif upper heavy">From:</label>
                <div className="half-wrapper">
                  <input onChange={ (e) => this.setState({ fromfirst: e.target.value })} name="fromfirst" required className="black-ph half" type="text" placeholder="FIRST NAME*" tabIndex="0" />
                  <input onChange={ (e) => this.setState({ fromlast: e.target.value })} name="fromlast" required className="black-ph half" type="text" placeholder="LAST NAME*" tabIndex="0" />
                </div>
                <input onChange={ (e) => this.setState({ fromemail: e.target.value })} name="fromemail" required className="black-ph whole" type="email" placeholder="EMAIL*" tabIndex="0" />
                <input type="submit" value="Submit" className="button sans-light-bold"/>
              </form>
            </div>
          </div>
      :
        <div className="form-page">
          <div className="form-chosen">
            <span className="serif upper">You have not selected any residences to share.</span>
          </div>
        </div>
      }
      </div>
    );
  }
}