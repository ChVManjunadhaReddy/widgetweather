import WeatherWidget from "./widget/index";
import './App.css';

function App() {
  return (
    <div className="App">
      <WeatherWidget location="Hyderabad" />
    </div>
  );
}

export default App;
