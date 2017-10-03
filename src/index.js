import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import './css/index.scss';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
