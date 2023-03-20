import "./App.css";

import Weather from "weather-widget-react-test";
import { useState } from "react";

function App() {
  const [cstLocation, setCstLocation] = useState("");

  return (
    <div className="App">
      <h1>Weather Widget - test1</h1>
      <button onClick={() => setCstLocation(prompt())}>
        Enter custom location
      </button>
      <Weather customLoc={cstLocation} />
    </div>
  );
}

export default App;
