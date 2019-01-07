import Markdown from 'markdown-to-jsx';
import Image from '../../components/markdownComponents/image/Image';
import React, {Component} from 'react';

import ArticleTemplate from '../../components/articleTemplate/ArticleTemplate';

//aunque no se usen esto carga todas las imagenes
require.context('../../content/articles', true, /\.(jpe?g|png|gif|ico)$/i);

const markdownContext = require.context('../../content/articles', true, /\.md$/);

export default function ArticlePagesGenerator() {

  const markdownPages = recoverMarkdownFiles();

  function generate() {
    //todo este metodo es llamado 2 veces
    return buildMarkdownPagesModel(markdownPages);

    function buildMarkdownPagesModel(markdownPages) {
      const pages = markdownPages.map(page => converterMarkdownPageModel(page));
      const markdownReactPages = generateArticlePage(pages);
      return {
        pages: pages,
        markdownReactPages: markdownReactPages
      };

      function converterMarkdownPageModel(page) {
        const content = extractContentToPage(page);
        const metaData = generateMetaData(page, content);
        return {
          metaData: metaData,
          content: content
        };

        function generateMetaData(page, content) {
          const metaData = extractMetaDataToPage(page);
          metaData.description = extractDescription(content);
          return metaData;

          function extractMetaDataToPage(page,) {
            const from = page.indexOf("---") + 3;
            const to = page.indexOf("---", from + 4);
            const metaData = formatJSON(page, from, to);
            //todo: poner un test aqui
            return becomeMetaDateJson(metaData);

            function formatJSON(page, from, to) {
              //todo:simplificar codigo
              return "{\""
                + page
                  .substring(from, to)
                  .trim()
                  .replace(new RegExp(/\n/, 'g'), ",\"")
                  .replace(new RegExp(/: "/, 'g'), "\": \"")
                  .replace(new RegExp(/:"/, 'g'), "\":\"")
                + "}";
            }

            function becomeMetaDateJson(metaData) {
              return JSON.parse(metaData);
            }
          }

          function extractDescription(content) {
            const characterNumber = 140;
            return content.substring(0, characterNumber);
          }
        }
      }
    }

    function extractContentToPage(page) {
      const from = page.indexOf("---");
      const to = page.indexOf("---", from + 1) + 3;
      return page.substring(to, page.length);
    }

    function generateArticlePage(pages){
      return pages
        .map((page,index) => {
           let jsxMarkdownTag = generateJSXMarkdownTag(page.content, index);
           return introduceTagIntoTemplate(jsxMarkdownTag, page);}
         );

      function generateJSXMarkdownTag(article, index) {
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

      function introduceTagIntoTemplate(jsxMarkdownTag, page){
        return <ArticleTemplate children={jsxMarkdownTag} post={page}/>
      }
    }
  }

  function recoverMarkdownFiles() {
    return markdownContext.keys()
      .map(markdownContext)
      .reverse();
  }

  return {
    generate: generate
  }
}

