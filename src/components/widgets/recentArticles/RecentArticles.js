
import React from 'react';
import { Link } from 'react-router-dom';
import "./recent-articles.css"
import './sidebar.css'


class RecentArticles extends React.Component {

    constructor(props, context){
        super(props, context);
        const NUM_MAX = 5;

        this.posts = this.props.posts.length > NUM_MAX ? this.props.posts.reverse().slice(0,5) : this.props.posts;
    }


    render () {
        return (
            <div className="recent-articles widget">
                <h5 className="sidebar-module-title">Articulos Recientes</h5>
                <hr/>
                <div>
                  {this.posts.map((post) => {
                      return(
                        <div key={post.title} className="link-recent-articles">
                          <Link to={post.path}>{post.title}</Link>
                        </div>)
                  })
                  }
                </div>
            </div>
        )
    }
}


export default RecentArticles;

