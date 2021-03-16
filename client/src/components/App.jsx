import "./App.css";

import Signup from './Signup';
import { Container } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm" >
        <Signup />
      </Container>
    </div>);
}

export default App;
