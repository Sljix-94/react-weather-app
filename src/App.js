import { useEffect } from "react";
import classes from "./App.module.css";
import axios from "axios";

function App() {
  const fetchData = async () => {
    const key = "95662109ff51268dddd80880a65ffd09";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${key}&units=metric`;
    axios
      .get(url)
      .then((response) => {
        return console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <main className={classes.container}>CONTENT</main>;
}

export default App;
