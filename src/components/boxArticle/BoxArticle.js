import React from 'react';
import Link from "gatsby-link";
import * as routesPath from "../../routePath";
import formattedTag from "../../utils/formater-tag/formatterTags";

import './boxArticle.css';

const imagesAllArticles = require.context("../../pages/", true,  /\.(png|jpg|gif)$/);

class BoxArticles extends React.Component {

    constructor(props, context){
      super(props, context);
      this.cover = imagesAllArticles("./"+this.props.post.node.frontmatter.image_article.relativePath);
    }

  render () {
    const {post} = this.props;

    return(
        <section className="blog-card">
            <div className="photo-details">
                <Link to={post.node.frontmatter.path}>
                    <div className="photo-card" style={ { backgroundImage: `url(${this.cover})`} } />
                </Link>
                <ul className="details">
                    <li className="author">
                        {/* todo: testear el comportamiento del autor terminar que hacer que funciones ahora solo esta planteado*/}
                        <Link to={!post.node.frontmatter.author_path ? routesPath.conoceme.path : ""}>
                            {post.node.author || "Jonay Godoy" }
                        </Link>
                    </li>
                    <li className="date">{/*Aug. 24, 2015 Darle formato a la fecha*/post.node.frontmatter.date}</li>
                    <li className="tags">
                        <ul>
                            {/*todo: enlaces no trabajan */}
                            {formattedTag.format(post.node.frontmatter.tags)
                                .map(tag => (
                                    <li>
                                       {tag}
                                    </li>
                                ))}
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="description">
                <h3>
                    <Link style={{ boxShadow: "none" }} to={post.node.frontmatter.path}>
                        {post.node.frontmatter.title}
                    </Link>
                </h3>
                <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
                <Link
                    className="read-more"
                    style={{ boxShadow: "none" }}
                    to={post.node.frontmatter.path}>
                        Seguir leyendo
                </Link>
            </div>
        </section>
    );
  }
}

export default BoxArticles
