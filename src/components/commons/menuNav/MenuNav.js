import React from 'react';
import Link  from "gatsby-link";
import config from "../../../../config-blog"
import * as routesPath from "../../../routePath";


import './menuNav.css';
import img_head from '../../../assets/img/head.jpg';


const MenuNav = () => {
    return (
        <div className="header hidden-header">
            <div className="pathPadding">
                <Link to={routesPath.inicio.path}>
                    <div className="img-logo" style={ { backgroundImage: `url(${img_head})`} } />
                </Link>
                <div className="blog-nav">
                    <Link to={routesPath.inicio.path} className="title-header">
                        <h3>{config.blogTitle}</h3>
                    </Link>
                    {routesPath.menu.map((routePath, index) =>(
                            <Link key={index} className="blog-nav-item" to={routePath.path}>{routePath.name}</Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuNav;