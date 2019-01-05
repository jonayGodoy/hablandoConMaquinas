import React from 'react';
import Link from "gatsby-link"
import "./recent-articles.css"
import './sidebar.css'


class RecentArticles extends React.Component {

    constructor(props, context){
        super(props, context);
        const NUM_MAX = 5;

        this.posts = this.props.posts.length > NUM_MAX ? this.props.posts.slice(0,5) : this.props.posts;
    }


    render () {
        return (
            <div className="recent-articles widget">
                <h5 className="sidebar-module-title">Articulos Recientes</h5>
                <hr/>
                <div>
                    {this.posts.map((post) => {
                        if (post.node.path !== "/404/") {
                          return(
                              <div key={post.node.frontmatter.title} className="link-recent-articles">
                                <Link to={post.node.frontmatter.path}>
                                    {post.node.frontmatter.title}
                                </Link>
                              </div>
                          )}
                    })
                    }
                </div>
            </div>
        )
    }
}


export default RecentArticles;
