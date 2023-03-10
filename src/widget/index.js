import ReactDOM from "react-dom";
import {TiWeatherPartlySunny} from "react-icons/ti";
import PropTypes from "prop-types";
import {fetchWeather} from './api';
import { useState, useEffect } from "react";
import "./index.css";

function Badge(props) {
    const {location} = props;
    const [temperature, setTemperature] = useState("");

    useEffect(()=> {
        if(location) {
            fetchWeather(location)
            .then(res => {
                setTemperature((res.main.temp-273.15).toFixed(2))
            })
            .catch(error => {
                console.log(error)
            });
        }
    }, [location])

    return ReactDOM.createPortal(
        <div className="container container-borders">
            <div className="weather-details">
                <TiWeatherPartlySunny color="black" fontSize="3.5rem" />
                <div className="weather-stats">
                    {temperature ? <span className="temp">{temperature}&nbsp;<sup>o</sup>c</span> : "--"}
                    {location ? <span>{location}</span> : "--"}
                </div>
            </div>
        </div>,
        document.getElementById("widget-weather")
    );
}

Badge.propTypes = {
    location: PropTypes.string
};

export default Badge;