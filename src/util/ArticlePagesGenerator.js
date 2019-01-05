import Markdown from 'markdown-to-jsx';
import React from 'react';

const markdownContext = require.context('../content/articles/2017-05-30-la-historia-de-mi-blog', false, /\.md$/);

export default function ArticlePagesGenerator(){
  function generateAndPublic(){
    const markdownPages = markdownContext.keys().map(markdownContext);

    return markdownPages.map((article, index)=> <Markdown key={index}>{article}</Markdown>);
  }
  return {
    generateAndPublic: generateAndPublic
  }
}

