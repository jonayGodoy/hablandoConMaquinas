
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
    const metaData = this.props.post.metaData;
    const date = moment(metaData.date);
    moment.locale('es')
    return(
        <section className="blog-card">
            <div className="photo-details">
                <Link to={metaData.path}>
                    <div className="photo-card" style={ { backgroundImage: `url(${metaData.image_article})`} } />
                </Link>
                <ul className="details">
                    <li className="author">
                        <Link to={!metaData.author_path ? routesPath.aboutMe.path : ""}>
                            {metaData.author || "Jonay Godoy" }
                        </Link>
                    </li>
                    <li className="date">{date.format("DD MMMM, YYYY")}</li>
                    <li className="tags">
                        <ul>
                            {formattedTag.format(metaData.tags).map((tag,index) => (<li key={index}>{tag}</li>))}
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="description">
                <h3>
                    <Link style={{ boxShadow: "none" }} to={metaData.path}>
                        {metaData.title}
                    </Link>
                </h3>
              <p>{metaData.description+"..."}</p>
                <Link
                    className="read-more"
                    style={{ boxShadow: "none" }}
                    to={metaData.path}>
                        Seguir leyendo
                </Link>

            </div>
        </section>
    );
  }
}

export default BoxArticles;


