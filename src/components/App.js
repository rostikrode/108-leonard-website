import React, {Component} from 'react';
import { Switch, Route, /*Redirect*/ } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Header from './partials/Header';
import '../styles/App.css';

import CarouselPage from './pages/CarouselPage';
import Availability from './pages/Availability';
import Contact from './pages/Contact';

import buildingJSON from './data/building.json';
import amenitiesJSON from './data/amenities.json';
import availabilityJSON from './data/availability.json';
import contactJSON from './data/contact.json';
import crowncollectionJSON from './data/crowncollection.json';
import residencesJSON from './data/residences.json';
import tribecaJSON from './data/tribeca.json';

const PAGES = [{
  'title': 'Building',
  'component': CarouselPage,
  'slug': '/',
  'data': buildingJSON,
  'prefixed': '/',
  'subnavs': [
    'Property',
    'Entrance'
  ]}, {
    'title': 'Residences',
    'component': CarouselPage,
    'slug': '/residences',
    'data': residencesJSON,
    'prefixed': '/residences/',
    'subnavs': [
      'Interiors',
      'Kitchens',
      'Bathrooms',
      'Landmarked Residences'
  ]}, {
    'title': 'Crown Collection',
    'component': CarouselPage,
    'slug': '/crown-collection',
    'data': crowncollectionJSON,
    'prefixed': '/crown-collection/',
    'subnavs': [
      '14th Floor',
      '15th Floor',
      'Crown House',
      'Cupola',
      'Clocktower'
  ]}, {
    'title': 'Availability',
    'component': Availability,
    'slug': '/availability',
    'data': availabilityJSON,
    'prefixed': '/availability/',
    'subnavs': []
  }, {
    'title': 'Amenities',
    'component': CarouselPage,
    'slug': '/amenities',
    'data': amenitiesJSON,
    'prefixed': '/amenities/',
    'subnavs': [
      'Entertaining',
      'Wellness',
      'Outdoor'
  ]}, {
    'title': 'Tribeca',
    'component': CarouselPage,
    'slug': '/tribeca',
    'data': tribecaJSON,
    'prefixed': '/tribeca/',
    'subnavs': [
      'Neighborhood',
      'Map'
  ]}, {
    'title': 'Contact',
    'component': Contact,
    'slug': '/contact',
    'data': contactJSON,
    'prefixed': '/contact/',
    'subnavs': []
}];
export default class App extends Component {
  render() {
    const routeComponents = PAGES.map((page, key) => {
      var DynComp = page.component;
      return (<Route exact path={page.slug} key={key} render={(props) => ( <DynComp {...page.data} /> )} />)
    });
    //const routeRedirects = PAGES.map((i, key) => <Redirect key={key} from={i.prefixed} to={i.slug} />);
    
    return (
      <div className="App">
        <Header pages={PAGES} />
        <main>  
          <Switch>
            {routeComponents}
            
            {/* Not working correctly: {routeRedirects} - redirects to last page */}
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}