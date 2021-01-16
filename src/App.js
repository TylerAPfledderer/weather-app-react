import ForecastList from "./components/ForecastList";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";

function App() {
  

  return (
    <>
      <Header />
      <main>
        <ForecastList />
      </main>
    </>
  );
}

export default App;
