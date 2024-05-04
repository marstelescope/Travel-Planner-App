// https://console.cloud.google.com/
// Get api key https://developers.google.com/maps/documentation/places/web-service/get-api-key
export const googleApiKey = 'YOUR-KEY';

// https://openweathermap.org/appid 
export const weatherApiKey = 'YOUR-KEY'; 

// Create a real-time firebase https://console.firebase.google.com/
// Config in project overview -> project settings
// Build -> Authentication -> enable email/password signin method
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
    // Your configuration here
};
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});