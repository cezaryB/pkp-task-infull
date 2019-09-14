import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import App from './App.jsx';

dotenv.config();
// all .env vars are available through:
// process.env.REACT_APP_SOME_EXAMPLE_VARIABLE

ReactDOM.render(<App />, document.getElementById('root'));

