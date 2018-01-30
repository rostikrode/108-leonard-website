import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import fetch from 'isomorphic-fetch';
import Availability from '../components/pages/Availability';
import availJSON from '../components/data/availability.json'
import { MemoryRouter } from 'react-router-dom';


it('renders without crashing', () => {
  const tree = mount(
    <MemoryRouter><Availability {...availJSON}  /></MemoryRouter>
  );
  expect(tree.html()).toMatchSnapshot()
});

