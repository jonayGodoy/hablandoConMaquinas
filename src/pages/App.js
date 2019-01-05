/* eslint-disable import/no-named-as-default */
import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import AboutMePage from "./aboutMe/AboutMePage";
import HomePage from "./home/BlogHomePage";
import NotFoundPage from "./notFoundPage/NotFoundPage";
import * as routesPath from "./routePath";
import { hot } from "react-hot-loader";

class App extends React.Component {
  render() {
    return (
        <div>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path={routesPath.aboutMe.path} component={AboutMePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
    );
  }
}
export default hot(module)(App);
