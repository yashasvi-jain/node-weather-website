const request = require('request')

const forecast = (latitude, longitude, callback) =>  {
    const url = `http://api.weatherstack.com/current?access_key=47036221dd7746db7f9d0a4dc5051496&query=${latitude},${longitude}`

    request({url , json:true}, (error, {body}) => {
        if (error) 
        {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) 
        {
            callback('Unable to find location.', undefined)
        } else 
        {
            const data = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike}.`
            callback(undefined, data)
        }
        
    }) 
}


module.exports = forecast

