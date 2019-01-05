/* eslint-disable import/no-named-as-default */
import React from "react";
import { Route, Switch } from "react-router-dom";
import MainTemplate from '../components/commons/template/MainTemplate';
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
            <Route exact path={routesPath.home.path} render = {mountIntoTemplate(<HomePage/>)} />
            <Route path={routesPath.aboutMe.path}  render = {mountIntoTemplate(<AboutMePage/>)}/>
            <Route render = {mountIntoTemplate(<NotFoundPage/>)}/>
          </Switch>
        </div>
    );
    function mountIntoTemplate(children){
      return () => <MainTemplate children={children}/>
    }
  }
}
export default hot(module)(App);
