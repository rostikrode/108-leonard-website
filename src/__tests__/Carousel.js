import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from '../components/pages/Carousel';
import testJSON from '../components/data/building.json';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Carousel {...testJSON} />, div);
});
