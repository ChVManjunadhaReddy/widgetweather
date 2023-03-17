import axios from "axios";


export const fetchWeather = (city) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d388cc9c41e5c0d4bf75a2ab328a574f`)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    errorMessage: "",
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
              });
        } else { 
            reject({
                errorMessage: "Geolocation is not supported by this browser",
                latitude: "",
                longitude: "",
            })
        }
    })
}

export const fetchWeatherGeoLocation = (position) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=d388cc9c41e5c0d4bf75a2ab328a574f`)
            // .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d388cc9c41e5c0d4bf75a2ab328a574f`)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}