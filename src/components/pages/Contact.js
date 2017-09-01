import React, {Component} from 'react';
import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react';
import Autocomplete from 'react-autocomplete';
import Checkbox from '../partials/Checkbox';
import {PhoneNumberFormat, PhoneNumberUtil} from 'google-libphonenumber';
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
      countrycodevalue: '',
      brokerage_firm: '',
      phoneIsValid: false,
      phonenumber: '',
      brokerslist: [
        "Douglas Elliman",
        "Corcoran",
        "Brown Harris Stevens",
        "Stribling",
        "Sotheby's",
        "Town Residential",
        "Compass",
        "Nest Seekers International",
        "Citi Habitats",
        "Elegran",
        "Warburg Realty",
        "Halstead",
        "Kleier Residential",
        "Core",
        "Keller Williams"
      ],
      residencename: '',
      residenceid: 0,
      residencelist: [
        {
          name: '1 BEDROOM',
          id: 29770
        },
        {
          name: '2 BEDROOMS',
          id: 29771
        },
        {
          name: '3 BEDROOMS',
          id: 29772
        },
        {
          name: '4 BEDROOMS',
          id: 29773
        },
        {
          name: 'PENTHOUSE',
          id: 29774
        }
      ],
      hearfrom: '',
      hearfromid: 0,
      hearfromlist: [
        {
          name: 'BROKER/MLS',
          id: '29779'
        },
        {
          name: 'CURBED.COM',
          id: '29780'
        },
        {
          name: 'EBLAST',
          id: '29781'
        },
        {
          name: 'EVENTS',
          id: '29782'
        },
        {
          name: 'NEWSPAPERS/MAGAZINE',
          id: '29783'
        },
        {
          name: 'NY TIMES.COM',
          id: '29784'
        },
        {
          name: 'ONLINE SEARCH',
          id: '29785'
        },
        {
          name: 'REAL DEAL',
          id: '29787'
        },
        {
          name: 'REFERRAL',
          id: '29788'
        },
        {
          name: 'SITE SIGNAGE',
          id: '29789'
        },
        {
          name: 'STREETEASY.COM',
          id: '29790'
        },
        {
          name: 'WALL STREET JOURNAL',
          id: '29791'
        },
        {
          name: 'WWW.ELLIMAN.COM',
          id: '29792'
        },
        {
          name: 'OTHER',
          id: '29786'
        }
      ]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
    this.onPhoneNumberEnter = this.onPhoneNumberEnter.bind(this);
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

  validatePhoneNumber(phoneNumber) {
    /*
    Phone number validation using google-libphonenumber
    */
    let valid = false;
    try {
      var phoneUtil = PhoneNumberUtil.getInstance();
      valid =  phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber));
    } catch(e) {
      valid = false;
    }
    if(valid) {
      var parsedNumber = phoneUtil.parse(phoneNumber);
      var formattedNumber = phoneUtil.format(parsedNumber, PhoneNumberFormat.INTERNATIONAL);
      formattedNumber = formattedNumber.split(this.state.countrycode)[1];

      this.setState({
        phoneIsValid: true,
        phonenumber: formattedNumber
      });
      this.phonefield.value = formattedNumber;
    } else {
      this.setState({
        phoneIsValid: false
      });
    }
  }

  onPhoneNumberEnter(e) {
    this.validatePhoneNumber(this.state.countrycode+' '+e.target.value);
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
                  <input onChange={ (e) => this.setState({ first: e.target.value })} name="first" required className="black-ph half" type="text" placeholder="FIRST NAME*" tabIndex={1} />
                  <input onChange={ (e) => this.setState({ last: e.target.value })} name="last" required className="black-ph half" type="text" placeholder="LAST NAME*" tabIndex={2} />
                </div>
                
                <input onChange={ (e) => this.setState({ email: e.target.value })} name="email" required className="black-ph whole" type="email" placeholder="EMAIL*" tabIndex={3} />

                <div className="half-wrapper">
                  {/* textfield with dropdown */}
                  <Autocomplete
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
                      return <div className="select-wrapper"><input name="countrycode" className="black-ph" {...props} required placeholder="COUNTRY CODE*" tabIndex={4} /></div>
                    }}
                    onChange={(event, value) => this.setState({ countrycodevalue: value })}
                    onSelect={(value, item) => {
                      this.setState({ countrycodevalue: item.abbr, countrycode: item.abbr })
                    }}
                  />

                  <input ref={e => this.phonefield = e} onChange={this.onPhoneNumberEnter} name="phone" required className="black-ph half" type="tel" placeholder="PHONE NUMBER*" tabIndex={5} />
                </div>
                
                {/* radio select */}
                <div className="radio-fieldset">
                  <span className="radio-field">
                    <Checkbox checked={this.state.client_type === '29766'} required="required" radio={true} radio_id='client_type' value="29766" handleCheck={this.handleCheck} index="client-type-broker" tabIndex={6} />
                    <span className="serif">BROKER</span>
                  </span>
                  <span className="radio-field">
                    <Checkbox checked={this.state.client_type === '29767'} rrequired="required" adio={true} radio_id='client_type' value="29767" handleCheck={this.handleCheck} index="client-type-purchaser" tabIndex={7} />
                    <span className="serif">PROSPECTIVE PURCHASER</span>
                  </span>
                </div>

                {/* on broker select - textfield with dropdown */}
                <VelocityTransitionGroup className="input-wrapper" enter={{animation: "fadeIn", display: "block", duration: 400, easing: 'ease-in-out', delay: 405}} leave={{animation: "fadeOut", duration: 400, easing: 'ease-in-out'}}>
                  {this.state.client_type === '29766' ? 
                    <Autocomplete
                      value={this.state.brokerage_firm}
                      wrapperStyle={{display: 'block', width: '100%'}}
                      getItemValue={(item) => item}
                      shouldItemRender={(item, value) => {
                        return (
                          item.toLowerCase().indexOf(value.toLowerCase()) !== -1
                        )
                      }}
                      items={this.state.brokerslist}
                      renderMenu={(children) => {
                        if (children.length > 0) {
                          return (
                            <div className="menu full">
                              {children}
                            </div>
                          )
                        } else {
                          return <div />
                        }
                      }}
                      renderItem={(item, isHighlighted) =>
                        <div className="menu-item" key={item} style={{ background: isHighlighted ? '#A1C6CF' : '#FFF' }}>{item}</div>
                      }
                      renderInput={(props) => {
                        return <div className="textselect-wrapper"><input name="brokerage_firm" className="black-ph" {...props} placeholder="BROKERAGE FIRM" tabIndex={8} /></div>
                      }}
                      onChange={(event, value) => this.setState({ brokerage_firm: value })}
                      onSelect={(value, item) => {
                        this.setState({ brokerage_firm: item })
                      }}
                    />
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
                        <Checkbox checked={this.state.hasbroker === '1'} required="required" radio={true} radio_id='hasbroker' value="1" handleCheck={this.handleCheck} index="hasbroker-1" tabIndex={9} />
                        <span className="input serif">YES</span>
                      </span>
                      <span className="radio-field">
                        <Checkbox checked={this.state.hasbroker === '0'} required="required" radio={true} radio_id='hasbroker' value="0" handleCheck={this.handleCheck} index="hasbroker-0" tabIndex={10} />
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
                      <input onChange={ (e) => this.setState({ agent_name: e.target.value })} name="agent_name" required className="black-ph whole" type="text" placeholder="AGENT NAME*" tabIndex={11} />
                      <Autocomplete
                        value={this.state.brokerage_firm}
                        wrapperStyle={{display: 'block', width: '100%'}}
                        getItemValue={(item) => item}
                        shouldItemRender={(item, value) => {
                          return (
                            item.toLowerCase().indexOf(value.toLowerCase()) !== -1
                          )
                        }}
                        items={this.state.brokerslist}
                        renderMenu={(children) => {
                          if (children.length > 0) {
                            return (
                              <div className="menu full">
                                {children}
                              </div>
                            )
                          } else {
                            return <div />
                          }
                        }}
                        renderItem={(item, isHighlighted) =>
                          <div className="menu-item" key={item} style={{ background: isHighlighted ? '#A1C6CF' : '#FFF' }}>{item}</div>
                        }
                        renderInput={(props) => {
                          return <div className="textselect-wrapper"><input name="brokerage_firm" className="black-ph" {...props} placeholder="BROKERAGE FIRM" tabIndex={12} /></div>
                        }}
                        onChange={(event, value) => this.setState({ brokerage_firm: value })}
                        onSelect={(value, item) => {
                          this.setState({ brokerage_firm: item })
                        }}
                      />
                    </div>
                  :
                    undefined
                  }
                </VelocityTransitionGroup>


                {/* floorplan/residence dropdown */}  
                <Autocomplete
                  ref={e => this.resauto = e}
                  value={this.state.residencename}
                  wrapperStyle={{display: 'block', width: '100%', position: 'relative'}}
                  getItemValue={(item) => item.name}
                  shouldItemRender={(item, value) => {
                    return true;
                  }}
                  items={this.state.residencelist}
                  renderMenu={children => (
                    <div className="menu full">
                      {children}
                    </div>
                  )}
                  renderItem={(item, isHighlighted) =>
                    <div className="menu-item" key={item.id} style={{ background: isHighlighted ? '#A1C6CF' : '#FFF' }}>{item.name}</div>
                  }
                  renderInput={(props) => {
                    return <div className="select-field-wrapper"><input ref={e => this.resinput = e} readOnly name="countrycode" className="black-ph select-field" {...props} required placeholder="DESIRED RESIDENCE" tabIndex={13} /></div>
                  }}
                  onChange={(event, value) => this.setState({ residencename: value })}
                  onSelect={(value, item) => {
                    this.resauto.refs.input.classList.add('no-padding');
                    this.setState({ residencename: item.name, residenceid: item.id })
                  }}
                />

                {/* how heard about us dropdown */}
                <Autocomplete
                  ref={e => this.hearauto = e}
                  value={this.state.hearfrom}
                  wrapperStyle={{display: 'block', width: '100%', position: 'relative'}}
                  getItemValue={(item) => item.name}
                  shouldItemRender={(item, value) => {
                    return true;
                  }}
                  items={this.state.hearfromlist}
                  renderMenu={children => (
                    <div className="menu full">
                      {children}
                    </div>
                  )}
                  renderItem={(item, isHighlighted) =>
                    <div className="menu-item" key={item.id} style={{ background: isHighlighted ? '#A1C6CF' : '#FFF' }}>{item.name}</div>
                  }
                  renderInput={(props) => {
                    return <div className="select-field-wrapper"><input ref={e => this.resinput = e} readOnly name="countrycode" className="black-ph select-field hear-field" {...props} required placeholder="HOW DID YOU HEAR ABOUT US?" tabIndex={14} /></div>
                  }}
                  onChange={(event, value) => this.setState({ hearfrom: value })}
                  onSelect={(value, item) => {
                    this.hearauto.refs.input.classList.add('no-padding');
                    this.setState({ hearfrom: item.name, hearfromid: item.id })
                  }}
                />
                
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