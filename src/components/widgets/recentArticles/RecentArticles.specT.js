/*
import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import RecentArticle from './RecentArticles';


function getStubPost(number){
    let post = {
        node:{
            frontmatter:{
                title: "any title"+number
            },
            path: "/anyPath"+number+"/"
        }
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


describe("<RecentArticle />",function(){
    it("three post show three links", function () {
        let linkPages = findLink(3);

        expect(linkPages.length).to.equal(3);
    });

    it("max limit five pages", function () {
        let linkPages = findLink(8);

        expect(linkPages.length).to.equal(5);
    });

    xit("Items are sorted from most recent to oldest", function () {
        //test broken
        let pages = getStubPosts(8);
        let wrapper = shallow(<RecentArticle posts={pages} />);
        let linkPages = wrapper.find("li");

        pages = pages.reverse().slice(0,5);


        expect(linkPages.length).to.equal(5);
        let i = 0;
        linkPages.forEach(function (node) {
            expect(node.childAt(0).children().text()).to.equal(pages[i].node.frontmatter.title);
            i++;
        });
    });
});
*/
