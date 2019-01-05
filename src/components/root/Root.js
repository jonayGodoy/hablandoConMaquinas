import React from 'react';
import MainTemplate from '../commons/template/MainTemplate';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from '../../pages/App';
import NotFoundPage from "../../pages/notFoundPage/NotFoundPage";
import * as routesPath from "../../pages/routePath";
import AboutMePage from "../../pages/aboutMe/AboutMePage";
import HomePage from "../../pages/home/BlogHomePage";

export default class Root extends React.Component {
  render() {
    return (
      <Router><App/></Router>
    );
/*
    return (
      <Router>
        <div>
        <div>
          <NavLink exact to="/" activeStyle={activeStyle}>Inicio</NavLink>
          {' | '}
          <NavLink to={routesPath.aboutMe.path} activeStyle={activeStyle}>Conoceme</NavLink>
          {' | '}
        </div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          /*
          <Route path={routesPath.aboutMe.path} component={AboutMePage} />
          <Route component={NotFoundPage} />
          *//*
        </Switch>
      </div>
    </Router>)
    */
  }
}
