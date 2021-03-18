
import { useEffect, useState } from 'react';
import axios from 'axios';

import NewsListItem from './NewsListItem';

export default function NewsList({company, symbol}) {

  const [newsData, setNewsData] = useState(null);

  function getNews(company, symbol) {
    return axios.get(`/api/news/company?company=${company}&symbol=${symbol}`)
  }

  useEffect(() => {
    getNews(company, symbol)
      .then((newsData) => setNewsData(newsData.data))
      .catch((err) => console.err(err))
  }, [company, symbol])

  const parsedArticles = newsData && newsData.map((article, index) => {

    return (
      <NewsListItem
        key={index}
        title={article.title}
        description={article.description}
        image={article.image}
        author={article.author}
        source={article.source}
        url={article.url}
        publishedDate={article.publishedAt}
      />
    )

  })

  return (
    <>
      {parsedArticles}
    </>
  );
}
