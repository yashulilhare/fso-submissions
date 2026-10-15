import { useEffect, useState } from "react";
import weatherService from "./../services/weather";

const WeatherData = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    weatherService
      .get(city)
      .then((data) => {
        setWeatherData(data);
      })
      .catch(() => {
      });
  }, [city]);
  if (!weatherData) return null;
  return (
    <section>
      <h2>Weather in {city}</h2>
      <p>Temperature: {weatherData.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}.png`}
        alt="weather state icon"
      />
      <p>Wind: {weatherData.wind.speed} m/s</p>
    </section>
  );
};

export default WeatherData;
