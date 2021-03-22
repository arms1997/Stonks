import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";

import Card3D from "../CustomCard/Card3D";
import { Typography, Button } from "@material-ui/core";

import "./About.scss";

export default function About() {
  const photoClassNames = ["graph", "graphWLock", "chatBox", "tickerPage"];

  // const [showScroll, setShowScroll] = useState(false);

  // const checkScrollTop = () => {
  //   if (!showScroll && window.pageYOffset > 400) {
  //     setShowScroll(true);
  //   } else if (showScroll && window.pageYOffset <= 400) {
  //     setShowScroll(false);
  //   }
  // };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // window.addEventListener("scroll", checkScrollTop);

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
            correlating news articles with direct changes in the stocks data the
            application is able to inform users of what may or may not have
            caused the stock to change.
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
        <Card3D photoClassName={photoClassNames[2]}></Card3D>
        <div className="learnMore__section-desc">
          <Typography variant="h3">REAL TIME CHAT, HELL YEAH!</Typography>
          <Typography className="learnMore__chatbox-desc-2">
            What is an application nowadays if it doesn't have a real time chat.
            Users can join chats for specific stocks or join the general chat
            available on their homepage, to communicate with other{" "}
            <strong>Stonks</strong> users.
          </Typography>
        </div>
        <div></div>
      </section>
      <section
        className="learnMore__section"
        style={{ justifyContent: "center" }}
      >
        <Card3D photoClassName={photoClassNames[3]}></Card3D>
      </section>
      <Button onClick={scrollTop} style={{ scrollSnapAlign: "start" }}>
        <FontAwesomeIcon id="scrollUp" icon={faArrowCircleUp} size="5x" />
      </Button>
    </main>
  );
}
