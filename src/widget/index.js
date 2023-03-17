import ReactDOM from "react-dom";
import {TiWeatherPartlySunny} from "react-icons/ti";
import {getLocation, getCity, fetchWeatherGeoLocation} from './api';
import { useState, useEffect } from "react";
import React  from 'react';
import "./index.css";

function Badge() {
    const [positionResponse, setPositionResponse] = useState();
    const [temperature, setTemperature] = useState("");
    const [time, setTime] = useState(new Date());
    const [location, setLocation] = useState("");

    useEffect(() => {
        setInterval(() => {
            setTime(new Date())
        }, 1000)
    }, []) 

    useEffect(() => {
        getLocation()
            .then(res => {
                setPositionResponse(res);
                const xhr = new XMLHttpRequest();
                const lat = res.latitude;
                const lng = res.longitude;
                
                xhr.open('GET', `https://us1.locationiq.com/v1/reverse.php?key=pk.5b45b339a98008a92c1293d74b2bfcd8&lat=${lat}&lon=${lng}&format=json`, true);
                xhr.send();
                xhr.onreadystatechange = processRequest;
                xhr.addEventListener("readystatechange", processRequest, false);
                
                function processRequest(e) {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        const response = JSON.parse(xhr.responseText);
                        const city = response.address.city;
                        setLocation(city);
                    }
                }
            })
            .catch(err => {
                setPositionResponse(err);
            })
    }, [])

    useEffect(() => {
        if(positionResponse) {
            fetchWeatherGeoLocation(positionResponse)
                .then(res => {
                    setTemperature((res.main.temp-273.15).toFixed(2));
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [positionResponse])

    return ReactDOM.createPortal(
        <div className="container container-borders">
            <div className="weather-details">
                <TiWeatherPartlySunny color="black" fontSize="3.5rem" />
                <div className="weather-stats">
                    {temperature ? <span className="temp">{temperature}&nbsp;<sup>o</sup>c</span> : "--"}
                    <span>{time.toLocaleTimeString()}</span>
                    {location ? <span>{location}</span> : "--"}
                </div>
            </div>
        </div>,
        document.getElementById("widget-weather")
    );
}

export default Badge;