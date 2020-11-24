import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Photos from "./pages/Photos";
import PrivateRoute from "./PrivateRoute";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";

const App = (props) => {
  return (
    <Provider store={props.store}>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/" component={Posts} />
            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/photos" component={Photos} />
            <PrivateRoute path="/photos/:photoId" component={Detail} />
            <PrivateRoute path="/posts/:postId" component={Detail} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
