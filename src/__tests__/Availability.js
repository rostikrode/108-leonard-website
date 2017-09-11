import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Availability from '../components/pages/Availability';
import availJSON from '../components/data/availability.json'
import { MemoryRouter } from 'react-router-dom';


it('renders without crashing', () => {
  const tree = renderer.create(
    <MemoryRouter><Availability {...availJSON}  /></MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

