import Markdown from 'markdown-to-jsx';
import React, {Component} from 'react';
//todo: mejorar la firma del generador ahora el metodo tiene dos funciones

//aunque no se usen esto carga todas las imagenes
require.context('../content/articles', true, /\.(jpe?g|png|gif|ico)$/i);

const markdownContext = require.context('../content/articles', true, /\.md$/);

export default function ArticlePagesGenerator() {
  function generateAndPublicMeta() {
    const markdownPages = markdownContext.keys().map(markdownContext);
    const markdownPagesModel = buildMarkdownPagesModel(markdownPages);
    console.log(markdownPagesModel.metaDataPages);
    return generateReactPages(markdownPagesModel.markdownPagesFormatted);

    function buildMarkdownPagesModel(markdownPages){
      const markdownPagesFormatted = markdownPages .map(page => markdownPagesFormat(page));
      const metaDataPages = markdownPages.map(page => markdownExtractMetaData(page));
      return {
        metaDataPages: metaDataPages,
        markdownPagesFormatted: markdownPagesFormatted
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
        console.log(metaData);
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

    function generateReactPages(markdownPagesFormatted){
      return markdownPagesFormatted.map((article, index) => generatePage(article, index));

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

