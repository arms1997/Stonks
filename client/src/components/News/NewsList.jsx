import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Collapse } from "@material-ui/core";

import NewsListItem from "./NewsListItem";
import "./NewsList.scss";

export default function NewsList({ company, symbol }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [newsData, setNewsData] = useState(null);

  function getNews(company, symbol) {
    return axios.get(`/api/news/company?company=${company}&symbol=${symbol}`);
  }

  useEffect(() => {
    getNews(company, symbol)
      .then((newsData) => setNewsData(newsData.data))
      .catch((err) => console.err(err));
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

  // const showArticles = parsedArticles.slice(0, 6);

  // const restOfArticles = parsedArticles.slice(5);

  return (
    <div>
      {/* {parsedArticles.length < 1 && <h2>No Articles Available</h2>} */}
      <h1>News</h1>
      {/* {showArticles} */}
      <Button
        className="newsList__button"
        variant="outlined"
        onClick={handleExpandClick}
      >
        Show More
      </Button>
      <Collapse in={expanded}>{parsedArticles}</Collapse>
    </div>
  );
}
