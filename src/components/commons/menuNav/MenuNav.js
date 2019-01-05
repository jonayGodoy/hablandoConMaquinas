import React from 'react';

import { NavLink } from 'react-router-dom';
import config from "../../../config-blog"
import * as routesPath from "../../../pages/routePath";


import './menuNav.css';
import img_head from '../../../assets/img/head.jpg';


const MenuNav = () => {

    return (
        <div className="header hidden-header">
            <div className="pathPadding">
                <NavLink to={routesPath.home.path}>
                    <div className="img-logo" style={ { backgroundImage: `url(${img_head})`} } />
                </NavLink>
                <div className="blog-nav">
                    <NavLink to={routesPath.home.path} className="title-header">
                        <h3>{config.blogTitle}</h3>
                    </NavLink>
                    {routesPath.routes.map((routePath, index) =>(
                            <NavLink key={index} className="blog-nav-item" to={routePath.path}>{routePath.name}</NavLink>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default MenuNav;
