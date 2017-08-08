import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './partials/Header';

import Home from './pages/Home';
import Building from './pages/Building';
import Residences from './pages/Residences';

import NotFound from './pages/NotFound';

import '../styles/App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route strict exact path="/" component={Home} /> 
          <Route strict exact path="/building" component={Building} />
          <Route strict exact path="/residences" component={Residences} />
          
          <Redirect from="/building/" to="/building" />
          <Redirect from="/residences/" to="/residences" />

          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

export default App;