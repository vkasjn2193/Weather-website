const request = require('request')
const forecast = (latitude, longitude, callback) => {
  //const url = 'https://api.darksky.net/forecast/41cebc257d49437b995d01443ea89ad4/37.8267,-122.4233?units=us' // ? add krne ke bad key=value 
    const url = 'https://api.darksky.net/forecast/41cebc257d49437b995d01443ea89ad4/' + latitude + ',' + longitude+'?units=si'   //si for 'celcius,us for feranite                       

    request({ url, json: true }, (error, {body}) => {
          if (error) {
            callback('Unable to connect', undefined)
        } else if (body.error) {
            console.log(body.error)
            callback('unable to find Forecast location try another location', undefined)
        } else {
            
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out . high temperature is '+ body.daily.data[0].temperatureHigh+' and low temperature is '+body.daily.data[0].temperatureLow +'. There is a ' + body.currently.precipProbability + ' % chance of rain')
        }
    })
}
module.exports = forecast
