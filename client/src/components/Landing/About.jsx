import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowCircleUp,
  faChartArea,
  faGlobeAmericas,
  faCalculator,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

import Card3D from "../CustomCard/Card3D";
import { Typography, Button } from "@material-ui/core";

import "./About.scss";

export default function About() {
  //temp classes to pass as props to each 3D card to use for specific background image
  const photoClassNames = ["graph", "graphWLock", "chatBox", "tickerPage"];

  // when bottom arrow is clicked, scroll window to the top of the page
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="learnMore">
      <section className="learnMore__section">
        <Card3D photoClassName={photoClassNames[0]}></Card3D>
        <div className="learnMore__section-desc">
          <Typography style={{ marginBottom: 15 }} variant="h3">
            Why use Stonks?
          </Typography>
          <Typography align="center" className="learnMore__section-p">
            Stonks was designed for newcomers in the stock trading game. By
            correlating news articles with direct changes in the stocks data,
            the application is able to inform users of what may or may not have
            caused the stock value to change.
          </Typography>
        </div>
      </section>
      <section className="learnMore__section">
        <div className="learnMore__section-desc">
          <Typography variant="h3" style={{ marginBottom: 15 }}>
            Relevant news to time periods in the graph!
          </Typography>
          <Typography variant="subtitle1">
            News is currated for the user upon hovering various highlighted
            areas. These areas signify where the system was able to correlate
            news to the change in a company's stock.
          </Typography>
        </div>
        <Card3D photoClassName={photoClassNames[1]}></Card3D>
      </section>
      <section className="learnMore__section">
        <div className="learnMore__section-howTo">
          <Typography variant="h2">How does it work?</Typography>
          <div className="learnMore__section-howTo-text">
            <div className="learnMore__section-howTo-text-step">
              <div className="learnMore__section-howTo-text-step-title">
                <FontAwesomeIcon
                  id="scrollUp"
                  icon={faGlobeAmericas}
                  size="3x"
                />
              </div>
              <Typography variant="subtitle1">
                Using the Alpha Vantage API, we are able to grab the relevant
                stock data that a user requests when they select a ticker.
              </Typography>
              <div className="learnMore__section-howTo-text-step-link">
                <a
                  className="learnMore__section-howTo-text-step-link"
                  href="https://www.alphavantage.co/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Alpha Vantage API
                </a>
              </div>
            </div>
            <div className="learnMore__section-howTo-text-step">
              <div className="learnMore__section-howTo-text-step-title">
                <FontAwesomeIcon id="scrollUp" icon={faChartArea} size="3x" />
              </div>
              <Typography
                variant="subtitle1"
                className="learnMore__howTo-howTo-step"
              >
                We parse the data into a format that can be translated and
                utilized to build a corresponding graph to the stock with the
                React-Vis charting library.
              </Typography>
              <div className="learnMore__section-howTo-text-step-link">
                <a
                  className="learnMore__section-howTo-text-step-link"
                  href="https://uber.github.io/react-vis/"
                  target="_blank"
                  rel="noreferrer"
                >
                  React Vis
                </a>
              </div>
            </div>
            <div className="learnMore__section-howTo-text-step">
              <div className="learnMore__section-howTo-text-step-title">
                <FontAwesomeIcon id="scrollUp" icon={faCalculator} size="3x" />
              </div>
              <Typography
                variant="subtitle1"
                className="learnMore__howTo-howTo-step"
              >
                Using a pre-selected delta value, we analyze the stock data for
                any signifcant changes in a set period of time, and if a
                signicant change is present, we search for relevant news in that
                period of time using the News API.
              </Typography>
              <div className="learnMore__section-howTo-text-step-link">
                <a
                  className="learnMore__section-howTo-text-step-link"
                  href="https://newsapi.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  News API
                </a>
              </div>
            </div>
            <div className="learnMore__section-howTo-text-step">
              <div className="learnMore__section-howTo-text-step-title">
                <FontAwesomeIcon id="scrollUp" icon={faNewspaper} size="3x" />
              </div>
              <Typography
                variant="subtitle1"
                className="learnMore__howTo-howTo-step"
              >
                A user can hover over the highlighted area on the graph and view
                relevant news that has been found for that area of significant
                change.
              </Typography>
            </div>
          </div>
        </div>
      </section>
      <section className="learnMore__section">
        <Card3D photoClassName={photoClassNames[2]}></Card3D>
        <div className="learnMore__section-desc">
          <Typography variant="h3">REAL TIME CHAT, HELL YEAH!</Typography>
          <Typography className="learnMore__chatbox-desc-2">
            What is an application nowadays if it doesn't have a real time chat?
            Users can join chat rooms for specific stocks or join the general
            chat room available on their homepage, to communicate with other{" "}
            <strong>Stonks</strong> users.
          </Typography>
        </div>
      </section>
      <section
        className="learnMore__section"
        style={{
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Card3D photoClassName={photoClassNames[3]}></Card3D>
      </section>
      <Button onClick={scrollTop} style={{ scrollSnapAlign: "start" }}>
        <FontAwesomeIcon id="scrollUp" icon={faArrowCircleUp} size="5x" />
      </Button>
    </main>
  );
}
