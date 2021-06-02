import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import axios from "axios";
import Weather from "./Components/Weather";
import Loading from "./UI/Loading";

const url = process.env.REACT_APP_API_URL || "test.google.com";
const key = process.env.REACT_APP_KEY;

interface WeatherTypes {
  name: string;
  description: string;
  temp: number | null;
  icon: string;
  unit: string;
}
interface fetchedData {
  name: string;
  main: { temp: number };
  weather: [{ description: string; icon: string }];
}

const App: React.FC = () => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherTypes>({
    name: "",
    description: "",
    temp: null,
    icon: "",
    unit: "metric",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `${url}?q=Berlin&appid=${key}&units=${weatherInfo.unit}`
      );
      const {
        name,
        main: { temp },
        weather: [{ description, icon }],
      }: fetchedData = response.data;

      setWeatherInfo((prevState) => ({
        ...prevState,
        name,
        description,
        temp,
        icon,
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const changeUnitHandler = () => {
    setWeatherInfo((prevState) => ({
      ...prevState,
      unit: prevState.unit === "metric" ? "imperial" : "metric",
    }));
  };

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherInfo.unit]);

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
};

export default App;
