import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Header from './partials/Header';
import '../styles/App.css';

import Carousel from './pages/Carousel';
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
  'component': Carousel,
  'slug': '/',
  'data': buildingJSON,
  'subnavs': [
    'Property',
    'Entrance'
  ]}, {
    'title': 'Residences',
    'component': Carousel,
    'slug': '/residences',
    'data': residencesJSON,
    'subnavs': [
      'Interiors',
      'Kitchens',
      'Bathrooms',
      'Landmarked Residences'
  ]}, {
    'title': 'Crown Collection',
    'component': Carousel,
    'slug': '/crown-collection',
    'data': crowncollectionJSON,
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
    'subnavs': []
  }, {
    'title': 'Amenities',
    'component': Carousel,
    'slug': '/amenities',
    'data': amenitiesJSON,
    'subnavs': [
      'Entertaining',
      'Wellness',
      'Outdoor'
  ]}, {
    'title': 'Tribeca',
    'component': Carousel,
    'slug': '/tribeca',
    'data': tribecaJSON,
    'subnavs': [
      'Neighborhood',
      'Map'
  ]}, {
    'title': 'Contact',
    'component': Contact,
    'slug': '/contact',
    'data': contactJSON,
    'subnavs': []
}];
export default class App extends Component {
  render() {
    const routeComponents = PAGES.map((page, key) => {
      var DynComp = page.component;
      return (<Route exact path={page.slug} key={key} render={(props) => ( <DynComp {...page.data} activeSection={this.props.activeSub} /> )} />)
    });
    
    return (
      <div className="App">
        <Header pages={PAGES} />
        <main>  
          <Switch>
            {routeComponents}
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}