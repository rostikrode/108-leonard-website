import 'babel-polyfill';
import React from 'react';
import fetch from 'isomorphic-fetch';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Contact from '../components/pages/Contact';
import { MemoryRouter } from 'react-router-dom';

window.gtag =
  window.gtag ||
  function() {
    return true;
  };

it('renders without crashing', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
