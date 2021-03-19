import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Collapse } from "@material-ui/core";

import NewsListItem from "./NewsListItem";
import "./NewsList.scss";

export default function NewsList({ company, symbol }) {
  const articlesPerPage = 5;
  let arrayForHoldingArticles = [];

  const [newsData, setNewsData] = useState(null);
  const [articlesToShow, setArticlesToShow] = useState([]);
  const [next, setNext] = useState(5);

  function getNews(company, symbol) {
    return axios.get(`/api/news/company?company=${company}&symbol=${symbol}`);
  }

  useEffect(() => {
    getNews(company, symbol)
      .then((newsData) => setNewsData(newsData.data))
      .catch((err) => console.error(err));
  }, [company, symbol]);

  const parsedArticles =
    newsData &&
    newsData.map((article, index) => {
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
      );
    });

  const loopWithSlice = (start, end, articles) => {
    const slicedArticles = articles.slice(start, end);
    arrayForHoldingArticles = [...arrayForHoldingArticles, ...slicedArticles];
    setArticlesToShow(arrayForHoldingArticles);
  };

  useEffect(() => {
    if (newsData) {
      loopWithSlice(0, articlesPerPage, parsedArticles);
    }
  }, [newsData]);

  const handleShowMoreArticles = () => {
    loopWithSlice(0, next + articlesPerPage, parsedArticles);
    setNext(next + articlesPerPage);
  };

  return (
    <div>
      {newsData && newsData.length < 1 && <h2>No Articles Available</h2>}
      {newsData && newsData.length > 1 && (
        <>
          <h1 style={{ textAlign: "start" }}>News</h1>
          {articlesToShow}
          {newsData.length > 5 && (
            <Button
              className="newsList__button"
              variant="outlined"
              onClick={handleShowMoreArticles}
            >
              Show More
            </Button>
          )}
        </>
      )}
    </div>
  );
}
