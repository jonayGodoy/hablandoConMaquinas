import React, {Component} from 'react';

import BoxArticle from '../../components/boxArticle/BoxArticle';
import './index.css';

import  RecentArticles from "../../components/widgets/recentArticles/RecentArticles";


class BlogHomePage extends Component {
  constructor(props, context) {
    super(props, context);
  }
    render () {
      //  const posts =  get(this, "props.data.allMarkdownRemark.edges");
        return (<div className="container-new">
            <div className="article">
              {/* <Helmet title={get(this, "props.data.site.siteMetadata.title")} />*/}

                <div>
                    {
                      this.props.pages
                        .map((post,index) => <BoxArticle key={index} post={post}/>)
                    }
                </div>

            </div>
            <aside className="sidebar-column">
                <div>
                  <RecentArticles posts={this.props.pages}/>
                </div>
            </aside>
            <div className="parchForSizeContainer"/>
        </div>);
    }
}
export default BlogHomePage

