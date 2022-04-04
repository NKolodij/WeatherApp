var request = require('request');

let  weather = (city, callback) => {
	// get the URL
	var url = 'http://api.weatherstack.com/current?access_key=9ebf61530c8fb99d86d4a3bc08aa920f&query='+ city +'&units=f';
	
	request({url: url, json: true}, (error, response) => {
		if(error)
		{
			// low level error
			callback("Unable to connect to the Weather API");
		}
		else if(response.body.error)
		{
			// API level error
			callback(`${response.body.error.info}`);
		}
		else 
		{
			// if there is no error, generate the data to the callback
			callback(undefined, {
				cityName: response.body.location.name,
				stateName: response.body.location.region,
				currentDescription: response.body.current.weather_descriptions[0],
				currentTemp: response.body.current.temperature,
				feelsLikeTemp: response.body.current.feelslike,
				lat: response.body.location.lat,
				lon: response.body.location.lon,
				currentTime: response.body.location.localtime
			});
		}
	});	
};

/* let  weather = (city, callback) => {
	// get the URL
	var url = 'http://api.weatherstack.com/current?access_key=9ebf61530c8fb99d86d4a3bc08aa920f&query='+ city +'&units=f';
	
	request({url: url, json: true}, (error, {body}) => {
		if(error)
		{
			// low level error
			callback("Unable to connect to the Weather API");
		}
		else if(body.error)
		{
			// API level error
			callback(`${body.error.info}`);
		}
		else 
		{
			// if there is no error, generate the data to the callback
			callback(undefined, {
				cityName: body.location.name,
				stateName: body.location.region,
				lat: body.location.lat,
				lon: body.location.lon,
				currentDescription: body.current.weather_descriptions[0],
				currentTemp: body.current.temperature,
				feelsLikeTemp: body.current.feelslike,
				currentTime: body.location.localtime
			});
		}
	});	
}; */

module.exports = weather;