import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Header from './partials/Header';
import '../styles/App.css';

import Amenities from './pages/Amenities';
import Availability from './pages/Availability';
import Building from './pages/Building';
import Contact from './pages/Contact';
import CrownCollection from './pages/CrownCollection';
import Residences from './pages/Residences';
import Tribeca from './pages/Tribeca';

const PAGES = [{
  'title': 'Building',
  'component': Building,
  'slug': '/',
  'prefixed': '/',
  'subnavs': [
    'Property',
    'Entrance'
  ]}, {
    'title': 'Residences',
    'component': Residences,
    'slug': '/residences',
    'prefixed': '/residences/',
    'subnavs': [
      'Interiors',
      'Kitchens',
      'Bathrooms',
      'Landmarked Residences'
  ]}, {
    'title': 'Crown Collection',
    'component': CrownCollection,
    'slug': '/crown-collection',
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
    'prefixed': '/availability/',
    'subnavs': []
  }, {
    'title': 'Amenities',
    'component': Amenities,
    'slug': '/amenities',
    'prefixed': '/amenities/',
    'subnavs': [
      'Entertaining',
      'Wellness',
      'Outdoor'
  ]}, {
    'title': 'Tribeca',
    'component': Tribeca,
    'slug': '/tribeca',
    'prefixed': '/tribeca/',
    'subnavs': [
      'Neighborhood',
      'Map'
  ]}, {
    'title': 'Contact',
    'component': Contact,
    'slug': '/contact',
    'prefixed': '/contact/',
    'subnavs': []
}];

const App = () => {
  const routeComponents = PAGES.map((page, key) => <Route exact path={page.slug} component={page.component} key={key} />);
  const routeRedirects = PAGES.map((i, key) => <Redirect key={key} from={i.prefixed} to={i.slug} />);
  
  return (
    <div className="App">
      <Header pages={PAGES} />
      <main>  
        <Switch>
          {routeComponents}
          {routeRedirects}
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

export default App;