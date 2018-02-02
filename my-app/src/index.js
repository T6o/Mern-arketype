import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UsersList from './UserList';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<UsersList />, document.getElementById('UserList'));


registerServiceWorker();
