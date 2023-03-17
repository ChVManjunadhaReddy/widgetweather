import { useEffect, useState } from "react";
import WeatherWidget from "./widget/index";

function App() {
  const [customLoc, setCustomLoc] = useState("");
  const [isLocationSet, setIsLocationSet] = useState(false);

  const handleChange = (e) => {
    setCustomLoc(e.target.value)
    setIsLocationSet(false);
  }

  return (
    <div className="App">
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "20rem"}}>
        <input type="text" value={customLoc} onChange={handleChange} />  
        <button onClick={()=>setIsLocationSet(true)}>Set Location</button>
      </div>
      <WeatherWidget customLoc={isLocationSet ? customLoc : ''} />
    </div>
  );
}

export default App;
