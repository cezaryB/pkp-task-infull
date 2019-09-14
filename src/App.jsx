import React, { useState } from 'react';
import AppState from './context';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.scss';
import SignInScreen from './screens/SignInScreen';
import MapScreen from './screens/MapScreen';


function App() {
  const [ticketNumber, setTicketNumber] = useState('');

  return (
    <AppState.Provider value={{
      ticketNumber,
      setTicketNumber
    }}>
      <Router>
        <Route exact path='/' component={SignInScreen} />
        <Route path='/journey' component={MapScreen} />
      </Router>
    </AppState.Provider>
  );
}

export default App;
