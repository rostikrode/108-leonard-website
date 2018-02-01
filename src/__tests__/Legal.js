import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Legal from '../components/pages/Legal';
import legalJSON from '../components/data/legal.json';
import { MemoryRouter } from 'react-router-dom';

window.gtag = window.gtag || function() {
  return true;
};

it('renders without crashing', () => {
  const tree = renderer.create(
    <MemoryRouter><Legal {...legalJSON}  /></MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});