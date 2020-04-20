import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProductList from "./components/ProductList";
import "./App.css";

function App() {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/caixa">Caixa</Link>
          </li>
          <li>
            <Link to="/gerente">Gerente</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/caixa">
          <ProductList />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
