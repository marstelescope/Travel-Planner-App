import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { weatherStyles, globalStyles } from '../styles';
import { getWeather, getForecast } from '../API/weather';
 
const RealTimeUpdates = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
 
    const handleGetWeather = () => {
        getWeather(city, setWeatherData, setForecastData, setErrorMsg);
    };
 
    const handleGetForecast = () => {
        getForecast(city, setWeatherData, setForecastData, setErrorMsg);
    };
 
    return (
        <View style={weatherStyles.container}>
        <View style={weatherStyles.centeredContent}>
            <Text style={weatherStyles.title}>Trip Weather Checker</Text>
            <Text style={globalStyles.subtletitle}>Enter zipcode for most accurate results</Text>
             <TextInput
              style={weatherStyles.input}
              placeholder="Enter zip code"
              value={city}
              onChangeText={setCity}
            />
            <Pressable
              onPress={handleGetWeather}
              style={({ pressed }) => [
                  weatherStyles.button,
                  {
                      backgroundColor: pressed ? '#1e8449' : '#2ecc71',
                  },
              ]}
            >
                <Text style={weatherStyles.buttonText}>Get Weather</Text>
            </Pressable>
            <View style={{ paddingTop: 15 }} />
            <Pressable
              onPress={handleGetForecast}
              style={({ pressed }) => [
                  weatherStyles.button,
                  {
                      backgroundColor: pressed ? '#1e8449' : '#2ecc71',
                  },
              ]}
            >
              <Text style={weatherStyles.buttonText}>Get Forecast</Text>
            </Pressable>
            { errorMsg && 
                <View style={{ paddingTop: 20 }} >
                    <Text style={globalStyles.error}>{errorMsg}</Text>
                </View>
            }
            { weatherData && (
                <View style={weatherStyles.weatherInfo}>
                     <Text style={weatherStyles.weatherText}>
                        <Text style={weatherStyles.heading}>
                          Temperature:
                        </Text> {weatherData.temperature} °C
                     </Text>
                    <Text style={weatherStyles.weatherText}>
                        <Text style={weatherStyles.heading}>
                          Description:
                         </Text> {weatherData.description}
                    </Text>
                </View>
            )}
            { forecastData && (
                <View style={weatherStyles.weatherInfo}>
                    <Text style={weatherStyles.heading}>
                      Forecast for the next few hours: {'\n'}
                    </Text>
                    { forecastData.map((forecastItem, index) => (
                        <Text key={index} style={weatherStyles.weatherText}>
                          <Text style={weatherStyles.subheading}>Time:</Text>{' '}
                          {new Date(forecastItem.dt * 1000).toLocaleTimeString()},{' '}
                          <Text style={weatherStyles.subheading}>Temperature:</Text>{' '}
                          {(forecastItem.main.temp - 273.15).toFixed(2)} °C,{' '}
                          <Text style={weatherStyles.subheading}>Description:</Text>{' '}
                          {forecastItem.weather[0].description}
                      </Text>
                    ))}
                </View>
            )}
        </View>
    </View>
    );
};

export default RealTimeUpdates;