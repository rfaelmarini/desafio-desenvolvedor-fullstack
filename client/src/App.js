import { Fragment } from "react"
import './App.css';

//components

import SimulateForm from "./components/SimulateForm";
import SimulateList from "./components/SimulateList";

function App() {
  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center">Calculadora de investimentos</h1>
        <div>
          <div><SimulateForm /></div>
          <div><SimulateList /></div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
