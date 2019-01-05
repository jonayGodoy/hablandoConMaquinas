import React from "react"
import get from "lodash/get"
import BoxArticle from '../components/boxArticle/BoxArticle';
import Helmet from "react-helmet";
import './index.css';

import  RecentArticles from "../components/widgets/recentArticles/RecentArticles";


class BlogIndex extends  React.Component {
    render () {
        const posts =  get(this, "props.data.allMarkdownRemark.edges");

        return (<div className="container-new">
            <div className="article">
                <Helmet title={get(this, "props.data.site.siteMetadata.title")} />
                <div>
                    {
                        posts.map((post,index) => {
                            if (post.node.path !== "/404/") {
                                return <BoxArticle key={index} post={post}/>
                            }
                        })
                    }
                </div>
            </div>
            <aside className="sidebar-column">
                <div>
                    <RecentArticles posts={posts}/>
                </div>
            </aside>
            <div className="parchForSizeContainer"/>
        </div>);
    }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
           title
           tags
            image_article {
             relativePath
            }
           path
           date(formatString: "DD MMMM, YYYY")
          }
          
        }
      }
    }
  }
`;
