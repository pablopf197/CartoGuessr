import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Principal from './Principal.jsx';
import Solution from './Solution.jsx';
import FlagsGame from './Games/FlagsGame.jsx'
import CapitalsGame from './Games/CapitalsGame.jsx'
import CountriesGame from './Games/CountriesGame.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/principal" />} />
          <Route path="/principal" element={<Principal />} />
          <Route path="/countriesGame" element={<CountriesGame />} />
          <Route path="/flagsGame" element={<FlagsGame />} />
          <Route path="/capitalsGame" element={<CapitalsGame />} />
          <Route path="/solution" element={<Solution />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
