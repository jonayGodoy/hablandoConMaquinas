/* eslint-disable import/no-named-as-default */
import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticlePageGenerator from "../../utils/articlePagesGenerator/ArticlePagesGenerator"
import MainTemplate from '../../components/commons/template/MainTemplate';
import AboutMePage from "../aboutMe/AboutMePage";
import HomePage from "../home/BlogHomePage";
import NotFoundPage from "../notFoundPage/NotFoundPage";
import * as routesPath from "../routePath";
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
            <Route exact path={routesPath.home.path} render = {mountIntoTemplate(<HomePage pages={markdownPagesModel.pages}/>)} />
            <Route path={routesPath.aboutMe.path}  render = {mountIntoTemplate(<AboutMePage/>)}/>
            {mountArticlePages(markdownPagesModel.markdownReactPages)}
            <Route render = {mountIntoTemplate(NotFoundPage)}/>
          </Switch>
        </div>
    );

    function mountIntoTemplate(children){
      return () => <MainTemplate pages={markdownPagesModel.pages}>{children}</MainTemplate>
    }
    function mountArticlePages(markdownReactPages){
      //todo: usar tu propio componente en lugar del markdown de la libreiria
      return markdownReactPages.map(
        (articlePage,index) => buildRoute(articlePage,index)
        );
      function buildRoute(articlePage,index){
        return (<Route key={index}
                      path={markdownPagesModel.pages[index].metaData.path}
                      render = {mountIntoTemplate(articlePage)}/>);
      }
    }
  }
}
export default hot(module)(App);
