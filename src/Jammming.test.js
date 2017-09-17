import React from 'react';
import ReactDOM from 'react-dom';
import Jammming from './Jammming';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Jammming />, div);
});
