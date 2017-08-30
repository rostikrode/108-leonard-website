import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Header from './partials/Header';
import '../styles/App.css';

import Carousel from './pages/Carousel';
import Availability from './pages/Availability';
import AvailabilityShare from './pages/AvailabilityShare';
import Contact from './pages/Contact';
import Team from './pages/Team';
import Press from './pages/Press';
import Legal from './pages/Legal';

import buildingJSON from './data/building.json';
import amenitiesJSON from './data/amenities.json';
import availabilityJSON from './data/availability.json';
import contactJSON from './data/contact.json';
import crowncollectionJSON from './data/crowncollection.json';
import residencesJSON from './data/residences.json';
import tribecaJSON from './data/tribeca.json';
import teamJSON from './data/team.json';
import pressJSON from './data/press.json';
import legalJSON from './data/legal.json';

import AvailabilityComingSoon from './pages/AvailabilityComingSoon';

const PAGES = [{
  'title': 'Building',
  'component': Carousel,
  'slug': '/',
  'data': buildingJSON,
  'subnavs': [
    'Property',
    'Entrance'
  ]}, {
    'title': 'Residences',
    'component': Carousel,
    'slug': '/residences/',
    'data': residencesJSON,
    'subnavs': [
      'Interiors',
      'Kitchens',
      'Bathrooms',
      'Landmarked Residences'
  ]}, {
    'title': 'Crown Collection',
    'component': Carousel,
    'slug': '/crown-collection/',
    'data': crowncollectionJSON,
    'subnavs': [
      '14th Floor',
      '15th Floor',
      'Crown House',
      'Cupola',
      'Clocktower'
  ]}, {
    'title': 'Availability',
    //'component': Availability,
    'component': Availability,
    'slug': '/availability/',
    'data': availabilityJSON,
    'subnavs': []
  }, {
    'title': 'Amenities',
    'component': Carousel,
    'slug': '/amenities/',
    'data': amenitiesJSON,
    'subnavs': [
      'Entertaining',
      'Wellness',
      'Outdoor'
  ]}, {
    'title': 'Tribeca',
    'component': Carousel,
    'slug': '/tribeca/',
    'data': tribecaJSON,
    'subnavs': [
      'Neighborhood',
      'Map'
  ]}, {
    'title': 'Contact',
    'component': Contact,
    'slug': '/contact/',
    'data': contactJSON,
    'subnavs': []
  }];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: '',
      section: '',
      navClicked: false,
      navElRef: ''
    }

    this.getPage = this.getPage.bind(this);
    this.onForwardButtonEvent = this.onForwardButtonEvent.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
  }
  componentDidUpate() {
    // remove any leftover active sub pages
    let allsubs = document.getElementsByClassName('nav-subnav-item');
    for(let i = 0; i < allsubs.length; i++) {
      allsubs[i].classList.remove('active');
    }
  }
  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
    window.onpushstate = this.onForwardButtonEvent;

    this.getPage();

    if(this.navElRef) {
      this.setState({
        navElRef: this.navElRef
      })
    }
  }

  getPage() {
    // get current page title
    var url = window.location.pathname;
    
    if ((url.split('/')[1] === 'availability') || (url === '/availability/') || (url === '/share/')) {
      this.setState({
        page: 'Availability'
      });
    } else {
      PAGES.forEach((index, key) => {
        if(url === index.slug) {
          this.setState({
            page: index.title
          });
        }
      });  
    }
  }
  onForwardButtonEvent(e) {
    console.log('forward!');
    this.getPage();
  }
  onBackButtonEvent(e) {
    this.getPage();
  }

  onNextButton(nextTitle) {
    this.setState({
      page: nextTitle,
      section: ''
    });
  }
  newPage(title) {
    this.setState({
      page: title,
      section: ''
    });
  }
  newSection(title) {
    this.setState({
      section: title
    });
  }
  onNavClick(clicked) {
    this.setState({
      navClicked: true
    });
  }
  

  render() {
    const routeComponents = PAGES.map((page, key) => {
      var DynComp = page.component;
      return (<Route exact path={page.slug} key={key} render={(props) => ( <DynComp {...props} {...page.data} onNextButton={this.onNextButton.bind(this)} navClicked={this.state.navClicked} navElement={this.state.navElRef} /> )} />)
    });
    
    return (
      <div className="App">
        <Header pages={PAGES} page={this.state.page} newPage={this.newPage.bind(this)} section={this.state.section} newSection={this.newSection.bind(this)} slider={this.state.slider} onNavClick={this.onNavClick.bind(this)} navEl={el=>this.navElRef = el} />
        <main>  
          <Switch>
            <Route exact strict path="/:url*" render={props => <Redirect to={`${props.location.pathname}/`}/>} />

            {routeComponents}

            <Route exact path="/availability/:residence" render={(props) => ( <Availability {...props} {...availabilityJSON} /> )} />
            <Route exact path="/share/" render={(props) => ( <AvailabilityShare {...props} /> )} />
            <Route exact path="/team/" render={(props) => ( <Team {...teamJSON} /> )} />
            <Route exact path="/press/" render={(props) => ( <Press {...pressJSON} /> )} />
            <Route exact path="/legal/" render={(props) => ( <Legal {...legalJSON} /> )} />
            
            <Route path="/404/" component={NotFound} />
            <Redirect from='*' to='/404/' />
          </Switch>
        </main>
      </div>
    );
  }
}