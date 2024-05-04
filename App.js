import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { auth } from './config'; // Import Firebase authentication

import HomeMap from './screens/HomeMap';
import LocationInfo from './screens/LocationInfo';
import CreateViewTrips from './screens/CreateViewTrips';
import TripInfo from './screens/TripInfo';
import DestinationRecommendations from './screens/DestinationRecommendations';
import DestinationInfo from './screens/DestinationInfo';
import RealTimeUpdates from './screens/RealTimeUpdates';
import AccountScreen from './screens/AccountScreen';
import LoginCreateAccountScreen from './screens/LoginCreateAccountScreen';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () =>{
  return (
  <Stack.Navigator initialRouteName="Home" screenOptions={{
    headerStyle: {
      backgroundColor: '#d1e3d9'
    }}}>
      <Stack.Screen name="Home" component={HomeMap} options={{ headerShown: false }} />
      <Stack.Screen name="Location Info" component={LocationInfo} />
      <Stack.Screen name="Create/View Trips" component={CreateViewTrips}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
  </Stack.Navigator>
  );
}

const DestinationStack = () =>{
  return (
  <Stack.Navigator initialRouteName="Destination Recommendations" screenOptions={{
    headerStyle: {
      backgroundColor: '#d1e3d9'
    }}}>
      <Stack.Screen name="Destination Recommendations" component={DestinationRecommendations} />
      <Stack.Screen name="Destination Info" component={DestinationInfo} />
  </Stack.Navigator>
  );
}

const TripStack = () =>{
  return (
    <Stack.Navigator initialRouteName="Create/View Trips" screenOptions={{
      headerStyle: {
        backgroundColor: '#d1e3d9'
      }}}>
        <Stack.Screen name="Create/View Trips" component={CreateViewTrips} />
        <Stack.Screen name="Trip Details" component={TripInfo} />
        <Stack.Screen name="Location Info" component={LocationInfo} />
    </Stack.Navigator>
  );
}

const AuthStack = () =>{
  return (
    <Stack.Navigator initialRouteName='Login/Create Account'>
        <Stack.Screen name="Login/Create Account" component={LoginCreateAccountScreen} options={{
          headerShown: false, 
        }}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{
          headerShown: false, 
        }}/>
      <Stack.Screen name="Create Account" component={CreateAccountScreen} options={{
          headerShown: false, 
        }}/>
    </Stack.Navigator>
  );
}

const MainStack = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarInactiveBackgroundColor:'#ad8674',
            tabBarActiveBackgroundColor:'#ad8674',
            tabBarInactiveTintColor:'#52372b',
            tabBarActiveTintColor:'white',
            tabBarStyle: {
              display: 'flex',
            },
            headerStyle: {
              backgroundColor: '#d1e3d9'
            },
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home/Map') {
              iconName = 'home';
            } else if (route.name === 'Trips') {
              iconName = 'calendar-plus';
            } else if (route.name === 'Real-Time Updates') {
              iconName = 'clock';
            } else if (route.name === 'Recommendations') {
              iconName = 'map-marker-alt';
            } else if (route.name === 'Account') {
              iconName = 'user';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home/Map" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Trips" component={TripStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Real-Time Updates" component={RealTimeUpdates} />
        <Tab.Screen name="Recommendations" component={DestinationStack}  options={{ headerShown: false }}/>
        <Tab.Screen name="Account" component={AccountScreen}/>
      </Tab.Navigator>
  );
}


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    
    const checkLoginStatus = async () => {

      try {
        const loggedInStatus = auth.currentUser;
        if (loggedInStatus) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'MainStack' : 'AuthStack'}>
        <Stack.Screen
          name="MainStack" component={MainStack} options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AuthStack" component={AuthStack} options={{
            gestureEnabled: false,
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;