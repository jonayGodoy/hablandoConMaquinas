import React from 'react';

import { NavLink } from 'react-router-dom';
import config from "../../../config-blog"
import * as routesPath from "../../../pages/routePath";

import './menuMobile.css';
import img_head from '../../../assets/img/head.jpg';
import svg_menu_hamburger from '../../../assets/img/menu-hamburger.svg';


class MenuMobile extends React.Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            isHidden: true
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState(Object.assign({}, this.state, {isHidden: !this.state.isHidden}));
    }

    componentDidUpdate(){
        document.documentElement.style.overflowY = !this.state.isHidden ? "hidden" : "";
    }

    render(){
        return (
            <div className="hidden-header-mobile">

                <div className="head-mobile">
                    <img className="btn-hamburger" src={svg_menu_hamburger} onClick={this.toggle} />
                    <NavLink to={'/'} className="title-header-mobile">
                        <h2 >{config.blogTitle}</h2>
                    </NavLink>
                </div>
                <div id="drawer" className={ this.state.isHidden ? "" : "background-menu-mobile"}
                     onClick={this.toggle}>
                    <div className="drawer-panel panel-new"
                         style={this.state.isHidden ? { left: "-500px"} :{left: "0" }}>
                        <div>
                            <NavLink to={'/'} onClick={this.toggle}>
                                <div className="img_logo_mobile" style={ { backgroundImage: `url(${img_head})`} } />
                            </NavLink>
                            <div onClick={this.toggle}>
                                {routesPath.routes.map((routePath, index) =>(
                                    <div key={index}>
                                        <hr/>
                                        <NavLink to={routePath.path}>
                                            <h3 className="blog-nav-item-mobile">{routePath.name}</h3>
                                        </NavLink>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MenuMobile;
