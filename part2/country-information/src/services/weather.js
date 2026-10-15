import axios from "axios";

const weather_api_key = import.meta.env.VITE_WEATHER_API_KEY;

const getCityCoordinates = (city) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${weather_api_key}`;
  return axios.get(url).then((res) => res.data);
};

const getWeather = (city) => {
  return getCityCoordinates(city)
    .then((locations) => {
      if (!locations || locations.length === 0) {
        throw new Error("City not found");
      }

      const { lat, lon } = locations[0];
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weather_api_key}`;

      return axios.get(weatherUrl);
    })
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
      alert("Something went wrong");
    });
};

export default {
  get: getWeather,
};
