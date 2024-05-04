import { weatherApiKey } from '../config';
export const getWeather = async (city, setWeatherData, setForecastData, setErrorMsg) => {
    try {
        const apiUrl = 
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
 
        // Check if the response contains an error message
        if (data.cod && data.cod !== 200) {
            throw new Error(data.message || 'Failed to fetch weather data');
        }
 
        // Extract temperature and weather description from the API response
        const temperatureKelvin = data.main.temp;
         
        // Convert to Celsius
        const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(2); 
        const description = data.weather[0].description;
 
        setWeatherData({ temperature: temperatureCelsius, description });
        setForecastData(null);
        setErrorMsg(null);
    } catch (error) {
        setForecastData(null);
        setWeatherData(null);
        setErrorMsg('Error fetching weather data: ' + error.message);
    }
};
 
export const getForecast = async (city, setWeatherData, setForecastData, setErrorMsg) => {
    try {
        const apiUrl = 
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
 
        // Check if the response contains an error message
        if (data.cod && data.cod !== '200') {
            throw new Error(data.message || 'Failed to fetch forecast data');
        }
 
        // Extract relevant forecast information from the API response
        const forecast = data.list.slice(0, 3); // Get forecast for the next few hours
 
        setWeatherData(null);
        setErrorMsg(null);
        setForecastData(forecast);
    } catch (error) {
        setForecastData(null);
        setWeatherData(null);
        setErrorMsg('Error fetching forecast data: ' + error.message);
    }
};