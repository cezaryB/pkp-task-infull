import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from './screens/Home';



function App() {
  return (
    <Router>
      <Route path='/' component={HomeScreen} />
    </Router>
  );
}

export default App;
