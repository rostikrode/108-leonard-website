import React, {Component} from 'react';
import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react';
import Autocomplete from 'react-autocomplete';
import Checkbox from '../partials/Checkbox';
// import down_arrow from '../../assets/down_arrow_small.svg';
import staticJSON from '../data/countrycodes.json';
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
      submitMessage: '',
      client_type: '',
      hasbroker: '',
      countrycodelist: [],
      countrycode: '',
      countrycodevalue: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
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

    fetch('https://restcountries.eu/rest/v2/all', {
      method: 'get',
    })
    .then(response => response.json())
    .then(json => {
      this.countryCodeCallback(json);
    })
    .catch((err) => {
      console.log('External request error ', err);
      this.countryCodeCallback(staticJSON);
    });
  }

  countryCodeCallback(json) {
    var codeList = [];
    var index = 1;
    json.forEach(function(country) {
			country.callingCodes.forEach(function(code) {
        if(country.name !== 'United States of America') {
          var codeFormatted = code === '' ?  'n/a': '+'+code;
          var countryFormatted = code === '' ?  country.name: '('+codeFormatted+') ' + country.name;
          codeList.push({
            'id': index,
            'name': countryFormatted,
            'abbr': codeFormatted
          });
          index++;
        }
      });
		});  

		codeList.push({
      'id': 0,
			'name': 'Other',
			'abbr': 'n/a'
    });
    codeList.unshift({
      'id': -1,
			'name': '(+1) United States of America',
			'abbr': '+1'
    })
    this.setState({
      countrycodelist: this.state.countrycodelist.concat(codeList)
    })
  }

  handleCheck(e) {
    if(e.currentTarget.getAttribute('name') === 'client_type') {
      this.setState({
        client_type: e.currentTarget.value
      });
    } else if(e.currentTarget.getAttribute('name') === 'hasbroker') {
      this.setState({
        hasbroker: e.currentTarget.value
      });
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
                  <input onChange={ (e) => this.setState({ last: e.target.value })} name="last" required className="black-ph half" type="text" placeholder="LAST NAME*" tabIndex="1" />
                </div>
                
                <input onChange={ (e) => this.setState({ email: e.target.value })} name="email" required className="black-ph whole" type="email" placeholder="EMAIL*" tabIndex="2" />

                <div className="half-wrapper">
                  {/* textfield with dropdown */}
                  <Autocomplete
                    ref={e => this.countrycode = e}
                    value={this.state.countrycodevalue}
                    className="half"
                    wrapperStyle={{display: 'block', width: '50%'}}
                    getItemValue={(item) => item.name}
                    shouldItemRender={(item, value) => {
                      return (
                        item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                        item.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1
                      )
                    }}
                    items={this.state.countrycodelist}
                    renderMenu={children => (
                      <div className="menu">
                        {children}
                      </div>
                    )}
                    renderItem={(item, isHighlighted) =>
                      <div className="menu-item" key={item.id} style={{ background: isHighlighted ? '#A1C6CF' : '#FFF' }}>{item.name}</div>
                    }
                    renderInput={(props) => {
                      return <div className="select-wrapper"><input ref={e => this.countrycodeinput = e} className="black-ph" {...props} required placeholder="COUNTRY CODE*" tabIndex="3" /></div>
                    }}
                    onChange={(event, value) => this.setState({ countrycodevalue: value })}
                    onSelect={(value, item) => {
                      this.setState({ countrycodevalue: item.abbr, countrycode: item.abbr })
                    }}
                  />

                  <input onChange={ (e) => this.setState({ phone: e.target.value })} name="phone" required className="black-ph half" type="tel" placeholder="PHONE NUMBER*" tabIndex="4" />
                </div>
                
                {/* radio select */}
                <div className="radio-fieldset">
                  <span className="radio-field">
                    <Checkbox checked={this.state.client_type === '29766'} required="required" radio={true} radio_id='client_type' value="29766" handleCheck={this.handleCheck} index="client-type-broker" tabIndex="5" />
                    <span className="serif">BROKER</span>
                  </span>
                  <span className="radio-field">
                    <Checkbox checked={this.state.client_type === '29767'} rrequired="required" adio={true} radio_id='client_type' value="29767" handleCheck={this.handleCheck} index="client-type-purchaser" tabIndex="6" />
                    <span className="serif">PROSPECTIVE PURCHASER</span>
                  </span>
                </div>

                {/* on broker select - textfield with dropdown */}
                <VelocityTransitionGroup className="input-wrapper" enter={{animation: "fadeIn", display: "block", duration: 400, easing: 'ease-in-out', delay: 405}} leave={{animation: "fadeOut", duration: 400, easing: 'ease-in-out'}}>
                  {this.state.client_type === '29766' ? 
                    <input onChange={ (e) => this.setState({ brokerage_firm: e.target.value })} name="brokerage_firm" className="black-ph whole" type="text" placeholder="BROKERAGE FIRM" tabIndex="7" />
                    :
                    undefined
                  }
                </VelocityTransitionGroup>

                {/* on purchaer select  - radio */}
                <VelocityTransitionGroup className="input-wrapper" enter={{animation: "fadeIn", display: "flex", duration: 400, easing: 'ease-in-out', delay: 405}} leave={{animation: "fadeOut", duration: 400, easing: 'ease-in-out'}}>
                  {this.state.client_type === '29767' ?                
                    <div className="radio-fieldset">
                      <span className="input serif radio-label">REPRESENTED BY A BROKER?*</span>
                      <span className="radio-field">
                        <Checkbox checked={this.state.hasbroker === '1'} required="required" radio={true} radio_id='hasbroker' value="1" handleCheck={this.handleCheck} index="hasbroker-1" tabIndex="7" />
                        <span className="input serif">YES</span>
                      </span>
                      <span className="radio-field">
                        <Checkbox checked={this.state.hasbroker === '0'} required="required" radio={true} radio_id='hasbroker' value="0" handleCheck={this.handleCheck} index="hasbroker-0" tabIndex="7" />
                        <span className="input serif">NO</span>
                      </span>
                    </div>
                  :
                    undefined
                  }
                </VelocityTransitionGroup>

                {/* on represented select */}
                <VelocityTransitionGroup className="input-wrapper" enter={{animation: "fadeIn", display: 'block', duration: 400, easing: 'ease-in-out'}} leave={{animation: "fadeOut", duration: 400, easing: 'ease-in-out'}}>
                  {this.state.hasbroker === '1' && this.state.client_type === '29767' ?
                    <div className="input-wrapper">
                      <input onChange={ (e) => this.setState({ agent_name: e.target.value })} name="agent_name" required className="black-ph whole" type="text" placeholder="AGENT NAME*" tabIndex="8" />
                      <input onChange={ (e) => this.setState({ brokerage_firm: e.target.value })} name="brokerage_firm" required className="black-ph whole" type="text" placeholder="BROKERAGE FIRM*" tabIndex="9" />
                    </div>
                  :
                    undefined
                  }
                </VelocityTransitionGroup>


                {/* dropdown */}  
                <input onChange={ (e) => this.setState({ residence: e.target.value })} name="residence" className="black-ph whole" type="text" placeholder="DESIRED RESIDENCE" tabIndex="10" />
                {/* dropdown */}
                <input onChange={ (e) => this.setState({ hear_about: e.target.value })} name="hear_about" className="black-ph whole" type="text" placeholder="HOW DID YOU HEAR ABOUT US?" tabIndex="11" />
                
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