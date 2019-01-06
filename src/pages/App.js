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

const markdownPagesModel = ArticlePageGenerator().generate();

class App extends React.Component {
  constructor(props, context){
    super(props, context);
  }

  render() {
    return (
        <div>
          <Switch>
            <Route exact path={routesPath.home.path} render = {mountIntoTemplate(<HomePage metaArticlePages={markdownPagesModel.metaDataPages}/>)} />
            <Route path={routesPath.aboutMe.path}  render = {mountIntoTemplate(<AboutMePage/>)}/>
            {mountArticlePages(markdownPagesModel.markdownReactPages)}
            <Route render = {mountIntoTemplate(NotFoundPage)}/>
          </Switch>
        </div>
    );

    function mountIntoTemplate(children){
      return () => <MainTemplate
        children={children}
        metaArticlePages = {markdownPagesModel.metaDataPages}
        />
    }
    function mountArticlePages(markdownReactPages){
      //todo: usar tu propio componente en lugar del markdown de la libreiria
      return markdownReactPages.map(
        (articlePage,index) => <Route key={index}
                                      path={markdownPagesModel.metaDataPages[index].path}
                                      render = {mountIntoTemplate(articlePage)}/>
        );
    }
  }
}
export default hot(module)(App);
