import { useState, useEffect,useCallback } from "react";
import classes from "./App.module.css";
import axios from "axios";
import Weather from "./Components/Weather";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit,setUnit] = useState('metric');
 
  const fetchWeatherData = useCallback(async (unit = "metric") => {
    const key = "95662109ff51268dddd80880a65ffd09";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${key}&units=${unit}`;
    axios
      .get(url)
      .then((response) => {
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
  },[]);
  const changeUnitHandler = () => {
    setUnit((prevState)=>{
      return prevState === 'metric' ? 'imperial' : 'metric'
    })
    
    fetchWeatherData(unit === 'metric' ? 'imperial' : 'metric');
  };

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  let content;
  if (loading) content = <p>Loading...</p>;
  if (weatherInfo)
    content = (
      <Weather weatherInfo={weatherInfo} changeUnit={changeUnitHandler} unit = {unit}/>
    );
  if (error) content = <p>{error}</p>;

  return <main className={classes.container}>{content}</main>;
}

export default App;
