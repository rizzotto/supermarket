import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import SaleView from './components/SaleView';
import ManagerView from './components/ManagerView';

import './App.css';

function App() {
  return (
    <Router>
      <div className="test">
        <nav className="routes">
          <Link className="link" to="/caixa">
            Caixa
          </Link>

          <Link className="link" to="/gerente">
            Gerente
          </Link>
        </nav>

        <Switch>
          <Route exact path="/">
            <div className="background">Supermercado de Projarq</div>
          </Route>
          <Route path="/caixa">
            <SaleView />
          </Route>
          <Route path="/gerente">
            <ManagerView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
