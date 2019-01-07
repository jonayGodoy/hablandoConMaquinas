import React from 'react';
import config from "../../config-blog";

import DisqusComments  from 'react-disqus-comments';

import "./md.css";
import "./blog-post.css"
import "./zenburn.css"

class ArticleTemplate extends React.Component {

    constructor(props, context){
        super(props, context);
        this.metaData = this.props.post.metaData;
    }

    render () {
        return (
            <article>
                <div className="img-cover" style={ { backgroundImage: `url(${"../"+this.metaData.image_article})`} } />
                <h1>{this.metaData.title}</h1>
                <div>{this.props.children}</div>
                <hr/>
                <DisqusComments
                    shortname={config.disqus_shortname}
                    identifier={this.metaData.title}
                    title={this.metaData.title}
                />
            </article>);

    }
}
export default ArticleTemplate
