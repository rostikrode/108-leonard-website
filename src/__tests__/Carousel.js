import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Carousel from '../components/pages/Carousel';
import buildingJSON from '../components/data/building.json'
import { MemoryRouter } from 'react-router-dom';

window.gtag = window.gtag || function() {
  return true;
};

it('renders without crashing', () => {
  const tree = mount(
    <MemoryRouter><Carousel {...buildingJSON} sendSlider={() => {console.log('test output')}}  /></MemoryRouter>
  );
  expect(tree.html()).toMatchSnapshot()
});

