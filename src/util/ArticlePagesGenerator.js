import Markdown from 'markdown-to-jsx';
import React, {Component} from 'react';
//todo: mejorar la firma del generador ahora el metodo tiene dos funciones
//const markdownImages = require.context('../content/articles', true, /\.(jpe?g|png|gif|ico)$/i)
const markdownContext = require.context('../content/articles', true, /\.md$/);

export default function ArticlePagesGenerator() {
  function generateAndPublicMeta() {
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
    generateAndPublicMeta: generateAndPublicMeta
  }
}


class Image extends Component {
  constructor(props, context) {
    super(props, context);
  }
/*todo: extrar el componente imgae a un estilo y a js*/
  render() {
    return (<div>
      <img src={this.props.src}
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        width: '100%',
                        maxWidth: '800px',
                        height: 'auto'}}/>
    </div>)
  }
}

