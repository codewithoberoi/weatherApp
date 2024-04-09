const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,snowfall,weather_code,wind_speed_10m`
    const apiOpts = {
        url: url,
        rejectUnauthorized: false,
        json: true
    }

    request(apiOpts, (error, {body}) => {
        if(error) {
            callback('Unable to connect with weather api.', undefined)
        } else if (body.errorcode) {
            callback('Unable to find the weather.', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature_2m,
                wind_speed: body.current.wind_speed_10m
            })
        }
    })
}

module.exports = forecast;