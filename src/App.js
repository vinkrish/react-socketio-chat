import React from 'react';
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "containers/Dashboard";
import Login from 'containers/Login';
import Signup from 'containers/Signup';
import { toast } from "react-toastify";
import PrivateRoute from 'routes/privateRoute';
import 'react-toastify/dist/ReactToastify.min.css';

toast.configure({
  autoClose: 3000,
  draggable: false,
  position: "bottom-left"
});

const hist = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/" exact component={Dashboard} />
        <Route path="*" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
