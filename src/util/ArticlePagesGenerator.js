import Markdown from 'markdown-to-jsx';
import React, {Component} from 'react';

const markdownContext = require.context('../content/articles/2017-05-30-la-historia-de-mi-blog', false, /\.md$/);

export default function ArticlePagesGenerator() {
  function generateAndPublic() {
    const markdownPages = markdownContext.keys().map(markdownContext);
    return markdownPages.map((article, index) => generatePage(article, index));

    function generatePage(article, index){
      return (
        <Markdown
          key={index}
          options={{
            overrides: {
              img: {
                component: Image
              },
            },
          }}
        >{article}</Markdown>
      )
    }
  }

  return {
    generateAndPublic: generateAndPublic
  }
}


class Image extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (<div><img src={this.props.src}/></div>)
  }
}

