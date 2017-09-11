import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PressArticle from '../components/pages/PressArticle';
import pressJSON from '../components/data/press.json';
import { MemoryRouter } from 'react-router-dom';


it('renders without crashing', () => {
  const tree = renderer.create(
    <MemoryRouter><PressArticle {...pressJSON} /></MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});