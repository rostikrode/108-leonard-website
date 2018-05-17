import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Header from './partials/Header';
import Animation from './partials/Animation';
import '../styles/App.css';

import Carousel from './pages/Carousel';
import Availability from './pages/Availability';
// import ComingSoon from './partials/ComingSoon';
import AvailabilityShare from './pages/AvailabilityShare';
import Contact from './pages/Contact';
import PressList from './pages/PressList';
import PressArticle from './pages/PressArticle';
import Legal from './pages/Legal';
import Home from './pages/Home';

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
import homeJSON from './data/home.json';

const PAGES = [{
  'title': 'Building',
  'component': Carousel,
  'slug': '/building/',
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
      // 'Landmarked Residences'
  ]}, {
    'title': 'Crown Collection',
    'component': Carousel,
    'slug': '/crown-collection/',
    'data': crowncollectionJSON,
    'subnavs': [
      //'14th Floor',
      '15th Floor',
      //'Crown House',
      //'Cupola',
      //'Clocktower'
  ]}, {
    'title': 'Availability',
    // 'component': ComingSoon, 
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
      navElRef: '',
      subnavs: [],
      slider: null,
      parentslider: null
    }

    this.getPage = this.getPage.bind(this);
    this.onForwardButtonEvent = this.onForwardButtonEvent.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
  }
  componentDidUpate() {
    // remove any leftover active sub pages
    let allsubs = this.state.subnavs;
    console.log(allsubs);
    for(let i = 0; i < allsubs.length; i++) {
      allsubs[i].classList.remove('active');
    }
  }
  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
    window.onpushstate = this.onForwardButtonEvent;

    this.getPage();
    this.setFooterPageTitle();
  }

  setFooterPageTitle() {
    // getting footer page titles
    var page = window.location.pathname.replace(new RegExp('/', 'g'), '');
    page = page.charAt(0).toUpperCase() + page.slice(1);
    if ((page === 'Team') || (page === 'Press') || (page === 'Legal')) {
      this.setState({
        page: page
      });
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
      if (url.split('/')[1] === 'press') {
        this.setState({
          page: 'Press'
        });
      } else {
        if (url === '/') {
          this.setState({
            page: ''
          });
        } else {
          PAGES.forEach((index) => {
            if(url === index.slug) {
              this.setState({
                page: index.title
              });
            }
          });  
        }
      }
    }
  }
  onForwardButtonEvent() {
    this.getPage();
    this.setFooterPageTitle();
  }
  onBackButtonEvent() {
    this.getPage();
    this.setFooterPageTitle();
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
  passAllSubnavs(subnavs) {
    this.setState({
      subnavs: subnavs
    });
  }
  sendSlider(slider, parent) {
    this.setState({
      slider: slider,
      parentslider: parent
    });
  }
  onNavClick() {
    this.setState({
      navClicked: true
    }, () => {
      var url = window.location.pathname;
      PAGES.forEach((index) => {
        if(url === index.slug) {
          this.setState({
            page: index.title
          });
        }
      });  
      console.log('app.js', this.state.page, url)
    });  
  }
  

  render() {
    const routeComponents = PAGES.map((page, key) => {
      var DynComp = page.component;
      return (
        <Route exact path={page.slug} key={key} render={(props) => ( 
          <DynComp {...props} {...page.data} 
            onNextButton={this.onNextButton.bind(this)} 
            navClicked={this.state.navClicked} 
            subnavs={this.state.subnavs}
            sendSlider={this.sendSlider.bind(this)}
            availMessage='For current availability, please contact the sales gallery at <a class="grey-link" href="tel:2127751080">212 775 1080</a>.'
          />)} 
        />)
    });
    return (
      <div className="App">
        <Header 
          pages={PAGES} 
          page={this.state.page} 
          newPage={this.newPage.bind(this)} 
          section={this.state.section} 
          newSection={this.newSection.bind(this)} 
          slider={this.state.slider} 
          parentslider={this.state.parentslider}
          onNavClick={this.onNavClick.bind(this)} 
          passAllSubnavs={this.passAllSubnavs.bind(this)} 
        />

        <Animation {...homeJSON} />

        <main>  
          <Switch>
            <Route exact strict path="/:url*" render={props => <Redirect to={`${props.location.pathname}/`} newPage={this.newPage.bind(this)} />} />

            {routeComponents}

            <Route exact path="/" render={(props) => ( <Home {...homeJSON} onNextButton={this.onNextButton.bind(this)}  /> )} />  
            <Route exact path="/availability/:residence" render={(props) => ( <Availability {...props} {...availabilityJSON} /> )} />
            <Route exact path="/share/" render={(props) => ( <AvailabilityShare {...props} /> )} />
            <Route exact path="/team/" render={(props) =>  ( <Carousel {...teamJSON} sendSlider={this.sendSlider.bind(this)} subnavs={this.state.subnavs} /> )} />
            
            <Route exact path="/press/" render={(props) => ( <PressList {...pressJSON} /> )} />
            <Route path="/press/:publication/:article/" render={(props) => ( <PressArticle {...props} {...pressJSON} /> )} />
            
            <Route exact path="/legal/" render={(props) => ( <Legal {...legalJSON} /> )} />
            
            <Route path="/404/" component={NotFound} />
            <Redirect from='*' to='/404/' />
          </Switch>
        </main>
      </div>
    );
  }
}