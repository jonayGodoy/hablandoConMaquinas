import React from 'react';

import MenuNav from '../menuNav/MenuNav';
import MenuMobile from '../menuMobile/MenuMobile';

import config_blog from "../../../../config-blog"

import '../../../styles.css';
import './template.css';
import "./footer.css"

import icon_github from "../../../assets/img/footer/github.svg";
import icon_twitter from "../../../assets/img/footer/twitter.svg";

class MainTemplate extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render () {
        return (
                <div className="blog-main" >
                    <header>
                        <MenuMobile/>
                        <MenuNav/>
                    </header>
                    <main id="pageMain" className="page-main">
                        {/* Main Content */}
                        {this.props.children()}
                    </main>
                    <footer className="footer">
                        <div className="path-typography-footer">
                            <p className="title-footer">
                                {config_blog.blogTitle}
                            </p>
                            <div className="icons-footer">
                                <a href={config_blog.social_networks.twitter} target="_blank">
                                    <img className="icon-footer" src={icon_twitter} />
                                </a>
                                <a href={config_blog.social_networks.github} target="_blank">
                                    <img className="icon-footer" src={icon_github} />
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
        )
    }
}

export default MainTemplate;