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
      residencesList: [],
      submitMessage: '',
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentWillMount() {
    if (window.location.origin === 'https://108leonard.com') {
      window.gtag('config', 'UA-113369414-1', {
        'page_title': 'Share 108 Leonard Residences',
        'page_location': window.location.href,
        'page_path': window.location.pathname
      });
    }
  }

  componentDidMount() {
    /** meta data for page */
    document.title = 'Share 108 Leonard Residences';
    if(document.getElementsByTagName('meta').description) {
      document.getElementsByTagName('meta').description.content = 'Select 108 Leonard residences to email and share with a friend.';
      document.querySelector("meta[property='og:description']").content = 'Select 108 Leonard residences to email and share with a friend.';
      document.querySelector("meta[property='og:title']").content = 'Share 108 Leonard Residences';
    }
    if (document.querySelector("link[rel='canonical']")) {
      document.querySelector("link[rel='canonical']").href = window.location.href
      document.querySelector("meta[property='og:url']").content = window.location.href
    }
    var viewport = document.querySelector("meta[name=viewport]");
    if(viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
    }
    
    this.setState({
      checkboxArray: this.props.location && this.props.location.state ? this.props.location.state.checkboxArray : false
    });
  }

  validateForm() {
    var empty = false;
    var errorStr = '';
    // var emailValid = true;
    var inputs = [this.state.tofirst, this.state.tolast, this.state.toemail, this.state.fromfirst, this.state.fromlast, this.state.fromemail];
    for (var i in inputs) {
      if ((inputs[i] === '') || (inputs[i].match(/^\s$/)) || (inputs[i] === ' ')) {
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
      this.setState(prevState => ({
        residencesList: [...prevState.residencesList, {
          res: `${value}`,
          url: `${window.location.origin}/availability/${value}/`
        }]
      }));

      if(index === (this.state.checkboxArray.length - 1)) {
        slug += `${value}`;
        if (this.state.checkboxArray.length === 1) {
          phrase += `${value}`;
        } else {
          phrase += `and ${value}`;
        }
        
      } else {
        slug += `${value}&`;
        if (this.state.checkboxArray.length === 2) {
          phrase += `${value} `;
        } else {
          phrase += `${value}, `;
        }
      }
    });
    this.setState({
      residenceurl: `${window.location.origin}/availability/${slug}/`,
      residencephrase:  phrase
    }, () => {
      var valid = this.validateForm();
      if(valid) {
        // Send the smart email via Email Marketing Manager/Campaign Monitor
        var emaildata = {
          projectname: '108leonard',
          smartEmailID: '6ee5e920-e0bf-4384-8bdc-f0e774335ae3',
          Data: {
            fromname: `${this.state.fromfirst} ${this.state.fromlast}`,
            fromemail: this.state.fromemail,
            toname: `${this.state.tofirst} ${this.state.tolast}`,
            toemail: this.state.toemail,
            residences: this.state.residencephrase,
            residencesList: this.state.residencesList,
            url: this.state.residenceurl
          },
          To: this.state.toemail,
          From: '108 Leonard <info@108leonard.com>',
          ReplyTo: this.state.fromemail
        };
        fetch('https://form.api.dbxd.com/post-smart-email', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emaildata)
        }).then((response) => {
          console.log(response.status === 200 ? `posted ok ${response.status}` : 'error');
          return response.text();
        }).then((data) => {
          var jsonData = JSON.parse(data);

          if(jsonData.success) {
            console.log("send smart email: success - no error");
            this.setState({
              submitMessage: <div className="response-message"><p className="sans-light-bold upper">Thank you for your interest in 108&nbsp;Leonard.</p><p className="sans-light-bold upper">Your email has been sent to {this.state.toemail}</p></div>
            });
            
            // send share email to info@108leonard.com also
            var secondemaildata = {
              projectname: '108leonard',
              Subject: `${this.state.fromfirst} ${this.state.fromlast} shared Residences ${this.state.residencephrase} with  ${this.state.tofirst} ${this.state.tolast}`,
              From: '108Leonard Web Admin <info@108leonard.com>',
              To: '108Leonard Sales Team <info@108leonard.com>',
              Text: `From:\n${this.state.fromfirst} ${this.state.fromlast} <${this.state.fromemail}>\n\nTo:\n${this.state.tofirst} ${this.state.tolast} <${this.state.toemail}>\n\nShared Residences:\n${this.state.residencephrase}`
            };
            fetch('https://form.api.dbxd.com/post-email', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(secondemaildata)
            }).then((response) => {
              console.log(response.status === 200 ? `posted ok ${response.status}` : 'error');
              return response.text();
            }).then((data) => {
              var jsonData = JSON.parse(data);
    
              if(jsonData.success) {
                console.log("send second smart email: success - no error");
              } else {
                console.log('send second smart email: success - INTERNAL ERROR', jsonData);
              }
            }).catch((err) => {
              console.log('send second smart email error ', err);
            });

          } else {
            console.log('send smart email: success - INTERNAL ERROR', jsonData);
            this.setState({
              submitMessage: <div className="response-message"><p className="sans-light-bold upper">Your email could not be sent at this time.</p><p className="sans-light-bold upper">Please try again later.</p></div>
            });
          }
        })
        .catch((err) => {
          console.log('send smart email error ', err);
            this.setState({
              submitMessage: <div className="response-message"><p className="sans-light-bold upper">Your email could not be sent at this time.</p><p className="sans-light-bold upper">Please try again later.</p></div>
            });
        });
      }
    });
  }

  toTitleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
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
              <span className="serif upper">You have requested to share {this.state.checkboxArray.length === 1 ? 'the floorplan' : 'floorplans'} for {this.state.checkboxArray.length === 1 ? 'residence' : 'residences'}&nbsp;</span>
              {this.state.checkboxArray.map((res, key) => {
                return (
                  <span key={key} className="form-chosen-res serif upper serif-bold-same-size">
                  &nbsp;{key === (this.state.checkboxArray.length - 1) ? (this.state.checkboxArray.length === 1 ? `${res}` : `and ${res}`) : (this.state.checkboxArray.length === 2 ? `${res}` : `${res},`)}
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
                  <input onChange={ (e) => this.setState({ tofirst: this.toTitleCase(e.target.value) })} name="tofirst" required className="black-ph half" type="text" placeholder="FIRST NAME*" tabIndex="0" />
                  <input onChange={ (e) => this.setState({ tolast: this.toTitleCase(e.target.value) })} name="tolast" required className="black-ph half" type="text" placeholder="LAST NAME*" tabIndex="0" />
                </div>
                <input onChange={ (e) => this.setState({ toemail: e.target.value })} name="toemail" required className="black-ph whole" type="email" placeholder="EMAIL*" tabIndex="0" />

                <label className="form-section serif upper heavy">From:</label>
                <div className="half-wrapper">
                  <input onChange={ (e) => this.setState({ fromfirst: this.toTitleCase(e.target.value) })} name="fromfirst" required className="black-ph half" type="text" placeholder="FIRST NAME*" tabIndex="0" />
                  <input onChange={ (e) => this.setState({ fromlast: this.toTitleCase(e.target.value) })} name="fromlast" required className="black-ph half" type="text" placeholder="LAST NAME*" tabIndex="0" />
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