// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react"
import Forecast from "./Forecast"
import axios from "axios"

const URL = "http://api.weatherapi.com/v1/current.json?key=23b780f221464cf6af241619202111&q=Malaysia&aqi=no"
const forecastURL = "http://api.weatherapi.com/v1/forecast.json?key=23b780f221464cf6af241619202111&q=Malaysia&days=1&aqi=no&alerts=no"
const searchURL = "http://api.weatherapi.com/v1/search.json?key=23b780f221464cf6af241619202111&q=Malaysia"
function App() {
  const [weatherData, setWeatherData] = useState("");
  const [condition, setCondition] = useState("");
  const [icon, setIcon] = useState("");
  const [temprature, setTemprature] = useState("");

  const fetchWeatherData = async () => {
    const response = await axios.get(URL)
    const { text, icon } = response.data.current.condition
    setWeatherData(response.data.location.name)
    setCondition(text)
    setIcon(icon)
    setTemprature(response.data.current.temp_c)
  }

  useEffect(() => {
    fetchWeatherData()
  }, [])

  return (
    <div className="container">
      <div className="weather-container">
        <div className="weather-location">
          <h1>{weatherData}</h1>
        </div>
        <div className="horizontal-line">{" "}</div>
        <div className="weather-data">
          <h2>{condition}</h2>
          <img src={icon} alt={weatherData} />
          <h4>It's {temprature} degrees centigrade</h4>
        </div>
      </div>
      <Forecast url={forecastURL} />
    </div>
  );
}

export default App;
