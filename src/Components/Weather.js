import classes from "./Weather.module.css";
import propTypes from "prop-types";

const Weather = (props) => {
  const { name, description, icon, temperature, unit } = props.weatherInfo;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 onClick={props.changeUnit}>Europe/{name}</h1>
        <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="Icon" />
      </div>
      <div className={temperature}>
        {temperature} {unit === "metric" ? "C" : "F"}
      </div>
      <div>{description}</div>
    </div>
  );
};

Weather.propTypes = {
  weatherInfo: propTypes.shape({
    name: propTypes.string,
    temperature: propTypes.number,
    icon: propTypes.string,
    unit: propTypes.string,
    description: propTypes.string,
  }),
  changeUnit: propTypes.func,
};

export default Weather;
