import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import AvailabilityShare from '../components/pages/AvailabilityShare';
import { MemoryRouter } from 'react-router-dom';


it('renders without crashing', () => {
  const tree = renderer.create(
    <MemoryRouter><AvailabilityShare /></MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

