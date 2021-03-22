import { useEffect, useState } from "react";
import axios from "axios";

import NewsListItem from "./NewsListItem";

import CustomButton from "../CustomButton";

export default function NewsList({ company, symbol, showAllNews = false }) {
  //set limit for articles per page on first render
  const articlesPerPage = 5;
  // temporary holding container for articles in view
  let arrayForHoldingArticles = [];

  const [newsData, setNewsData] = useState(null);
  const [articlesToShow, setArticlesToShow] = useState([]);
  const [next, setNext] = useState(5);

  useEffect(() => {
    //determine with api endpoint to call by showAllNews boolean
    const requestString = showAllNews
      ? `/api/news/`
      : `/api/news/company?company=${company}&symbol=${symbol}`;

    axios
      .get(requestString)
      .then((newsData) => setNewsData(newsData.data))
      .catch((err) => console.error(err));
  }, [company, symbol, showAllNews]);

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
    //if newsData present on first render, run through loopWithSlice to show first set of articles
    if (newsData) {
      loopWithSlice(0, articlesPerPage, parsedArticles);
    }
  }, [newsData]);

  //when someone clicks show more button, use this function to add next 5 articles to articlesToShow array
  const handleShowMoreArticles = () => {
    loopWithSlice(0, next + articlesPerPage, parsedArticles);
    setNext(next + articlesPerPage);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {newsData && newsData.length < 1 && (
        <h2 style={{ textAlign: "start", marginTop: 0 }}>
          No Articles Available
        </h2>
      )}
      {newsData && newsData.length > 0 && (
        <>
          {articlesToShow}
          {newsData.length > articlesToShow.length && (
            <CustomButton variant="outlined" onClick={handleShowMoreArticles}>
              Show More
            </CustomButton>
          )}
        </>
      )}
    </div>
  );
}
