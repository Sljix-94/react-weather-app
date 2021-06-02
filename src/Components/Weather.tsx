import React from "react";
import classes from "./Weather.module.css";

interface WheatherProps {
  weatherInfo: {
    name: string;
    description: string;
    temp: number | null;
    icon: string;
    unit: string;
  };
  changeUnit: () => void;
}

const Weather: React.FC<WheatherProps> = (props) => {
  const {
    weatherInfo: { name, description, icon, temp, unit },
    changeUnit,
  } = props;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 onClick={changeUnit}>Europe/{name}</h1>
        <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="Icon" />
      </div>
      <div className={classes.temperature}>
        {temp} {unit === "metric" ? "C" : "F"}
      </div>
      <div>{description}</div>
    </div>
  );
};

export default Weather;
