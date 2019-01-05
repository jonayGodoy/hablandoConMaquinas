/* eslint-disable import/no-named-as-default */
import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticlePageGenerator from "../util/ArticlePagesGenerator"
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
            {mountArticlePages()}
            <Route render = {mountIntoTemplate(<NotFoundPage/>)}/>

          </Switch>
        </div>
    );
    function mountIntoTemplate(children){
      return () => <MainTemplate children={children}/>
    }
    function mountArticlePages(){
      const articlePages = ArticlePageGenerator().generateAndPublicMeta();

      return articlePages.map(
        (articlePage,index) => <Route key={index}
                                      path={"/"+index+"/"}
                                      render = {mountIntoTemplate(articlePage)}/>
        );
    }
  }
}
export default hot(module)(App);
