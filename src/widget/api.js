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
