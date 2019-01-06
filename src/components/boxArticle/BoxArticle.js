
import React from 'react';
import { Link } from 'react-router-dom';
import * as routesPath from "../../pages/routePath";
import formattedTag from "../../utils/formaterTag/formatterTags";
import './boxArticle.css';

const moment = require('moment');

class BoxArticles extends React.Component {

    constructor(props, context){
      super(props, context);
      //todo: volver a poner los comentarios
    }

  render () {
    const post = this.props.post;
    const date = moment(post.date);
    moment.locale('es')
    return(
        <section className="blog-card">
            <div className="photo-details">
                <Link to={post.path}>
                    <div className="photo-card" style={ { backgroundImage: `url(${this.props.post.image_article})`} } />
                </Link>
                <ul className="details">
                    <li className="author">
                        <Link to={!post.author_path ? routesPath.aboutMe.path : ""}>
                            {post.author || "Jonay Godoy" }
                        </Link>
                    </li>
                    <li className="date">{date.format("DD MMMM, YYYY")}</li>
                    <li className="tags">
                        <ul>
                            {formattedTag.format(post.tags).map(tag => (<li>{tag}</li>))}
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="description">
                <h3>
                    <Link style={{ boxShadow: "none" }} to={post.path}>
                        {post.title}
                    </Link>
                </h3>
                <Link
                    className="read-more"
                    style={{ boxShadow: "none" }}
                    to={post.path}>
                        Seguir leyendo
                </Link>

            </div>
        </section>
    );
  }
}

export default BoxArticles;


