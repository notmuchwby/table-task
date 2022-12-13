import AddForecast from "./components/AddForecast";
import Header from "./components/Header";
import ForecastTable from "./components/ForecastTable";
import { useEffect, useState } from "react";

function App() {
  const [forecasts, setForecasts] = useState([]);
  console.log("forecasts", forecasts);
  useEffect(() => {
    async function fetchForecasts() {
      try {
        const response = await fetch(
          "http://195.210.47.140:8000/findAllForecastPlanerItems",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const res = await response.json();
        setForecasts(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetchForecasts();
  }, []);

  return (
    <div className="App">
      <Header />
      <ForecastTable forecasts={forecasts} setForecasts={setForecasts} />
      <AddForecast setForecasts={setForecasts} />
    </div>
  );
}

export default App;
