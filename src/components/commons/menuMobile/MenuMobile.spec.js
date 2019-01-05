import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import MenuMobile from './MenuMobile';

import "./menuMobile.css";

function wrapperMount(){
   return shallow(<MenuMobile />);
}

function findButtonHead(wrapper){
    return wrapper.find('.btn-hamburger').first();
}

function findSidePanel(wrapper){
    return wrapper.find("#drawer");
}

describe("<MenuMobile/>", function(){

    let wrapper;
    beforeEach(function () {
        wrapper = wrapperMount();
    });

    it("Mobile menu panel start hidden", function () {
        let wrapper = shallow(<MenuMobile />);

        expect(wrapper.state().isHidden).to.equal(true);
    });
    it("Mobile menu panel is show when click button ", function () {
        let button = findButtonHead(wrapper);

        button.simulate('click');

        expect(wrapper.state().isHidden).to.equal(false);
    });
    it("Mobile menu panel is hidden when twice click ", function () {
        let sidePanel = findSidePanel(wrapper);
        let button = findButtonHead(wrapper);

        button.simulate('click');
        sidePanel.simulate('click');

        expect(wrapper.state().isHidden).to.equal(true);
    });
    it("Mobile menu panel, the background work ", function () {
        let sidePanel = findSidePanel(wrapper);
        let background = sidePanel.parent();

        background.simulate('click');

        expect(wrapper.state().isHidden).to.equal(true);
    });
});