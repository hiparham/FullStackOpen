import { useEffect, useState } from "react";
import axios from "axios";
const key = import.meta.env.VITE_API_KEY;
export default function SingleCountry({ country }) {
  if (!country) {
    return null;
  }
  const [weatherInfo, setWeatherInfo] = useState("");
  const getIcon = (id) => `https://openweathermap.org/img/wn/${id}@2x.png`;
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${key}`
      )
      .then(({ data: { weather } }) => {
        const { main, description, icon } = weather[0];
        setWeatherInfo({ main, description, icon });
      });
  }, []);
  return (
    <div>
      <h1>{country.name.common.toUpperCase()}</h1>
      <p>Capital : {country.capital}</p>
      <p>Area : {country.area}</p>
      <h2>Languages : </h2>
      <ul>
        {Object.values(country.languages).map((lang) => {
          return <li>{lang}</li>;
        })}
      </ul>
      <img
        src={country.flags.png}
        alt={country.name.common}
        style={{
          width: "100%",
          maxWidth: "250px",
          aspectRatio: "square",
          objectFit: "cover",
        }}
      />
      {weatherInfo && (
        <>
          <h3>Weather Information :</h3>
          <p>{weatherInfo.main}</p>
          <p>{weatherInfo.description}</p>
          <img
            src={getIcon(weatherInfo.icon)}
            alt={weatherInfo.main}
            style={{
              width: "150px",
              objectFit: "cover",
            }}
          />
        </>
      )}
    </div>
  );
}
