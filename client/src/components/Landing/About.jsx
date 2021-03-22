import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";

import Card3D from "../CustomCard/Card3D";
import { Typography } from "@material-ui/core";

import "./About.scss";

export default function About() {
  const photoClassNames = ["graph", "graphWLock", "chatBox", "tickerPage"];

  return (
    <main className="learnMore">
      <section className="learnMore__graph1">
        <Card3D photoClassName={photoClassNames[0]}></Card3D>
        <div className="learnMore__graph1-desc">
          <Typography variant="h3" className="learnMore__graph1-desc-1">
            Why use Stonks?
          </Typography>
          <Typography className="learnMore__graph1-desc-2">
            Stonks is the ultimate resource for newbies to the stock market who
            want to learn more about trends in prices!......
          </Typography>
        </div>
      </section>
      <section className="learnMore__graph2">
        <div className="learnMore__graph2-desc">
          <Typography variant="h3" className="learnMore__graph2-desc-1">
            Relevant news to time periods in the graph!
          </Typography>
          <Typography className="learnMore__graph2-desc-2">
            Stonks is the ultimate resource for newbies to the stock market who
            want to learn more about trends in prices!......
          </Typography>
        </div>
        <Card3D photoClassName={photoClassNames[1]}></Card3D>
      </section>
      <section className="learnMore__chatbox">
        <Card3D photoClassName={photoClassNames[2]}></Card3D>
        <div className="learnMore__chatbox-desc">
          <Typography variant="h3" className="learnMore__chatbox-desc-1">
            Relevant news to time periods in the graph!
          </Typography>
          <Typography className="learnMore__chatbox-desc-2">
            Stonks is the ultimate resource for newbies to the stock market who
            want to learn more about trends in prices!......
          </Typography>
        </div>
        <div></div>
      </section>
      <section className="learnMore__ticker">
        <Card3D photoClassName={photoClassNames[3]}></Card3D>
        <div className="learnMore__ticker-desc">
          <Typography variant="h3" className="learnMore__ticker-desc-1">
            Relevant news to time periods in the graph!
          </Typography>
          <Typography className="learnMore__ticker-desc-2">
            Stonks is the ultimate resource for newbies to the stock market who
            want to learn more about trends in prices!......
          </Typography>
        </div>
        <FontAwesomeIcon id="scrollUp" icon={faArrowCircleUp} size="5x" />
      </section>
    </main>
  );
}
