import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import NotFound from '../components/pages/NotFound';
import { MemoryRouter } from 'react-router-dom';


it('renders without crashing', () => {
  const tree = renderer.create(
    <MemoryRouter><NotFound /></MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});