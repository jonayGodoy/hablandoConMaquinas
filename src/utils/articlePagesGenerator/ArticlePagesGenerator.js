import Markdown from 'markdown-to-jsx';
import React, {Component} from 'react';
//todo: mejorar la firma del generador ahora el metodo tiene dos funciones

//aunque no se usen esto carga todas las imagenes
require.context('../../content/articles', true, /\.(jpe?g|png|gif|ico)$/i);

const markdownContext = require.context('../../content/articles', true, /\.md$/);

export default function ArticlePagesGenerator() {

  const markdownPages = recoverMarkdownFiles();

  function generate() {
    //todo este metodo es llamado 2 veces
    return buildMarkdownPagesModel(markdownPages);

    function buildMarkdownPagesModel(markdownPages){
      const pages = markdownPages.map(page => converterMarkdownPageModel(page));
      const markdownReactPages = markdownPages
        .map(page =>  generatePage(extractContentToPage(page)));
      return {
        pages: pages,
        markdownReactPages: markdownReactPages
      };

      function converterMarkdownPageModel(page){
        const content = extractContentToPage(page);
        const metaData = generateMetaData(page, content);
        return {
          metaData: metaData,
          content: content
        };

        function generateMetaData(page, content){
          const metaData = extractMetaDataToPage(page);
          metaData.description = extractDescription(content);
          return metaData;

          function extractMetaDataToPage(page,){
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

          function extractDescription(content){
            const characterNumber = 140;
            return content.substring(0,characterNumber);
          }
        }
      }
    }

    function extractContentToPage(page){
      const from = page.indexOf("---");
      const to = page.indexOf("---", from+1)+3;
      return page.substring(to, page.length);
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

  function recoverMarkdownFiles(){
    return markdownContext.keys()
      .map(markdownContext)
      .reverse();
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

