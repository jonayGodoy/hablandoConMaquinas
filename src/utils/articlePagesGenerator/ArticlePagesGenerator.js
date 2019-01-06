import Markdown from 'markdown-to-jsx';
import React, {Component} from 'react';
//todo: mejorar la firma del generador ahora el metodo tiene dos funciones

//aunque no se usen esto carga todas las imagenes
require.context('../../content/articles', true, /\.(jpe?g|png|gif|ico)$/i);

const markdownContext = require.context('../../content/articles', true, /\.md$/);

export default function ArticlePagesGenerator() {
  function generate() {
    const markdownPages = markdownContext.keys().map(markdownContext);
    const markdownPagesModel = buildMarkdownPagesModel(markdownPages);
    return markdownPagesModel;

    function buildMarkdownPagesModel(markdownPages){
      const metaDataPages = markdownPages.map(page => markdownExtractMetaData(page));
      const markdownReactPages = markdownPages
        .map(page =>
          generatePage(markdownPagesFormat(page)));
      return {
        metaDataPages: metaDataPages,
        markdownReactPages: markdownReactPages
      };

      function markdownPagesFormat(page){
        const from = page.indexOf("---");
        const to = page.indexOf("---", from+1);
        return page.substring(to, page.length);
      }

      function markdownExtractMetaData(page){
        const from = page.indexOf("---")+3;
        const to = page.indexOf("---", from+4);
        const metaData = formatJSON(page, from, to);
        //todo: poner un test aqui
        return becomeMetaDateJson(metaData);

        function formatJSON(page, from, to){
          //todo:simplificar codigo
          return "{\""
            +page
            .substring(from, to)
            .trim()
            .replace(new RegExp(/\n/, 'g'),",\"")
            .replace(new RegExp(/: "/, 'g'),"\": \"")
            .replace(new RegExp(/:"/, 'g'),"\":\"")
            +"}";
        }

        function becomeMetaDateJson(metaData){
          return JSON.parse(metaData);
        }
      }
    }


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
    generate: generate
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

