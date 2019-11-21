import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const BarChart = React.lazy(() => import("./BarChart"));

function App() {
  return (
    <div className="App">
      <h1>Number of React, Vue and Angular Jobs</h1>
      <h2>Listed on GitHub Jobs</h2>
      <h3> November 18th, 2019</h3>
      <React.Suspense fallback={<div>Waiting...</div>}>
        <BarChart />
      </React.Suspense>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
