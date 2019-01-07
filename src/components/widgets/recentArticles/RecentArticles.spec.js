
//import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';
import RecentArticle from './RecentArticles';


describe("<RecentArticle />",function(){
    it("three post show three links", function () {
        let linkPages = findLink(3);

        expect(linkPages.length).toEqual(3);
    });

    it("max limit five pages", function () {
        let linkPages = findLink(8);

        expect(linkPages.length).toEqual(5);
    });
});

function getStubPost(number){
  let post = {
    metaData:{
        title: "any title"+number,
        path: "/anyPath"+number+"/"
    },
    content: ""
  };
  return post;
}

function getStubPosts(numPosts){
  let posts = [];
  for(let i = 0; i < numPosts;i++){posts.push(getStubPost(i))}
  return posts;
}

function findLink(numPosts){
  let wrapper = shallow(<RecentArticle posts={getStubPosts(numPosts)} />);
  return wrapper.find(".link-recent-articles");
}
