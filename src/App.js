import { useState, useEffect } from "react";
import classes from "./App.module.css";
import axios from "axios";
import Weather from "./Components/Weather";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const key = "95662109ff51268dddd80880a65ffd09";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${key}&units=metric`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
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
        });
      })
      .catch((error) => setError("Something went wrong!"));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let content;
  if (loading) content = <p>Loading...</p>;
  if (weatherInfo) content = <Weather weatherInfo={weatherInfo} />;
  if (error) content = <p>{error}</p>;

  return <main className={classes.container}>{content}</main>;
}

export default App;
