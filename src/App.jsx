import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignInScreen from './screens/SignInScreen';
import MapScreen from './screens/MapScreen';

function App() {
  return (
    <Router>
      <Route exact path='/' component={SignInScreen} />
      <Route path='/journey' component={MapScreen} />
    </Router>
  );
}

export default App;
