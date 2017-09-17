import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import Jammming from './Jammming';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Jammming />, document.getElementById('root'));
registerServiceWorker();