import "./index.css";

import { fetchWeather, fetchWeatherGeoLocation, getLocation } from "./api";
import { useEffect, useState } from "react";

import React from "react";
import ReactDOM from "react-dom";
import {
  TiWeatherPartlySunny,
  TiWeatherCloudy,
  TiWeatherStormy,
  TiWeatherSnow,
  TiWeatherSunny,
} from "react-icons/ti";

function Badge(props) {
  const { customLoc } = props;
  const [positionResponse, setPositionResponse] = useState();
  const [temperature, setTemperature] = useState("");
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState("");

  let weatherIcon;
  if (temperature <= 10) {
    weatherIcon = <TiWeatherSnow color="white" fontSize="3.5rem" />;
  } else if (temperature > 10 && temperature <= 20) {
    weatherIcon = <TiWeatherCloudy color="white" fontSize="3.5rem" />;
  } else if (temperature > 20 && temperature <= 30) {
    weatherIcon = <TiWeatherPartlySunny color="white" fontSize="3.5rem" />;
  } else if (temperature > 30) {
    weatherIcon = <TiWeatherSunny color="white" fontSize="3.5rem" />;
  } else {
    weatherIcon = <TiWeatherStormy color="white" fontSize="3.5rem" />;
  }

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  useEffect(() => {
    getLocation()
      .then((res) => {
        setPositionResponse(res);
        const xhr = new XMLHttpRequest();
        const lat = res.latitude;
        const lng = res.longitude;

        xhr.open(
          "GET",
          `https://us1.locationiq.com/v1/reverse.php?key=pk.5b45b339a98008a92c1293d74b2bfcd8&lat=${lat}&lon=${lng}&format=json`,
          true
        );
        xhr.send();
        xhr.onreadystatechange = processRequest;
        xhr.addEventListener("readystatechange", processRequest, false);

        function processRequest(e) {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const city = response.address.city;
            setLocation(city);
          }
        }
      })
      .catch((err) => {
        setPositionResponse(err);
      });
  }, []);

  useEffect(() => {
    if (positionResponse && !customLoc) {
      fetchWeatherGeoLocation(positionResponse)
        .then((res) => {
          setTemperature((res.main.temp - 273.15).toFixed(2));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (customLoc) {
        fetchWeather(customLoc)
          .then((res) => {
            setTemperature((res.main.temp - 273.15).toFixed(2));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [positionResponse, customLoc, location]);

  const handleWidgetClose = (event) => {
    event.preventDefault();
    const widget = document.getElementById("widget-weather");
    widget.remove();
  };

  return ReactDOM.createPortal(
    <div className="container-cst container-borders">
      <div className="close" onClick={handleWidgetClose}>
        &times;
      </div>
      <div className="weather-details">
       {weatherIcon}
        <div className="weather-stats">
          {temperature ? (
            <span className="temp">
              {temperature}&nbsp;<sup>o</sup>c
            </span>
          ) : (
            "--"
          )}
          <span>{time.toLocaleTimeString()}</span>
          {location ? (
            <span>
              {customLoc ? (
                customLoc
              ) : (
                <span>
                  {location}
                  <br />
                  Current location
                </span>
              )}
            </span>
          ) : (
            "--"
          )}
        </div>
      </div>
    </div>,
    document.getElementById("widget-weather")
  );
}

export default Badge;
