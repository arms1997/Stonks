import "./App.css";
import Graph from "./components/Graph";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      {/* <Graph symbol={"tsla"} company={"tesla"} showNews={true} /> */}
      <Navbar />
    </div>
  );
}

export default App;
