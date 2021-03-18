
import { useEffect, useState } from 'react';
import axios from 'axios';

import NewsListItem from './NewsListItem';

export default function NewsList({company, symbol}) {

  const [newsData, setNewsData] = useState(null);

  // function getNews(company, symbol) {
  //   return axios.get(`/api/news/company?company=${company}&symbol=${symbol}`)
  // }

  // useEffect(() => {
  //   getNews(company, symbol)
  //     .then((newsData) => setNewsData(newsData.data))
  //     .catch((err) => console.err(err))
  // }, [company, symbol])

  // const parsedArticles = newsData && newsData.map((article, index) => {

  //   return (
  //     <NewsListItem
  //       key={index}
  //       title={article.title}
  //       description={article.description}
  //       image={article.image}
  //       author={article.author}
  //       source={article.source}
  //       url={article.url}
  //       publishedDate={article.publishedAt}
  //     />
  //   )

  // })

  return (
    <>
      <NewsListItem
        key="1"
        title="This is a really long title to demonstrate how long these titles can be"
        description="here is a long description as well"
        image="https://images.pexels.com/photos/241544/pexels-photo-241544.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        author="Emily Lim"
        source="Medium"
        url="https://www.cbc.ca/news"
        publishedDate="10/20/2020"
      />
       <NewsListItem
        key="1"
        title="This is a really long title to demonstrate how long these titles can be"
        description="here is a long description as well"
        image="https://images.pexels.com/photos/241544/pexels-photo-241544.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        author="Emily Lim"
        source="Medium"
        url="https://www.cbc.ca/news"
        publishedDate="10/20/2020"
      />
      {/* {parsedArticles} */}
    </>
  );
}
