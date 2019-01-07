import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import "./recent-articles.css"
import './sidebar.css';

class RecentArticles extends React.Component {

    constructor(props, context){
        super(props, context);
        const NUM_MAX = 5;

        const posts = this.props.posts.length > NUM_MAX ? this.props.posts.slice(0,5) : this.props.posts;
        this.metaData = posts.map(post => post.metaData);
    }

    render () {
        return (
            <div className="recent-articles widget">
                <h5 className="sidebar-module-title">Articulos Recientes</h5>
                <hr/>
                <div>
                  {this.metaData.map((post) => {
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
RecentArticles.propTypes = {
  posts: PropTypes.array.isRequired
};

export default RecentArticles;

