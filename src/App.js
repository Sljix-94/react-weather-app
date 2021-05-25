import { useState, useEffect, useCallback } from "react";
import classes from "./App.module.css";
import axios from "axios";
import Weather from "./Components/Weather";
import Loading from "./UI/Loading";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWeatherData = useCallback(async (unit = "metric") => {
    try {
      const key = "95662109ff51268dddd80880a65ffd09";
      const url = `http://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${key}&units=${unit}`;

      const response = await axios.get(url);
      const {
        name,
        main: { temp: temperature },
        weather: [{ description }],
        weather: [{ icon }],
      } = response.data;

      setWeatherInfo({
        name,
        temperature,
        description,
        icon,
        unit,
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, []);

  const changeUnitHandler = () => {
    fetchWeatherData(weatherInfo.unit === "metric" ? "imperial" : "metric");
  };

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  if (error)
    return <div className={classes.container}>Something went wrong!</div>;

  return (
    <main className={classes.container}>
      {loading ? (
        <Loading />
      ) : (
        <Weather weatherInfo={weatherInfo} changeUnit={changeUnitHandler} />
      )}
    </main>
  );
}

export default App;
