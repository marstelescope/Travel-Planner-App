import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Keyboard, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { googleApiKey } from '../config';
import { mapStyles } from '../styles';

const HomeMap = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');


  // Google Places documentation: https://developers.google.com/maps/documentation/places/web-service/place-details
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': googleApiKey,
      'X-Goog-FieldMask': 'places.formattedAddress,places.displayName,places.location,places.shortFormattedAddress,places.websiteUri,places.regularOpeningHours,places.internationalPhoneNumber,places.rating,places.photos' 
    },
    body: JSON.stringify({
      textQuery: searchText
    })
  };

  useEffect(() => {
    const setCurrentLocation = async () => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': googleApiKey,
            'X-Goog-FieldMask': 'places.formattedAddress,places.displayName,places.location,places.shortFormattedAddress,places.websiteUri,places.regularOpeningHours,places.internationalPhoneNumber,places.rating,places.photos' 
          },
          body: JSON.stringify({
            textQuery: 'current location',
          })
        };
        const response = await fetch('https://places.googleapis.com/v1/places:searchText', requestOptions);
        const data = await response.json();
        if (data.places && data.places.length > 0) {
          setRegion({
            ...region,
            latitude: data.places[0].location.latitude,
            longitude: data.places[0].location.longitude,
          });
        } 
        else {
          // Will display San Francisco region be default if current location not found
          console.log('Current location not found');
        }
      } catch (error) {
        console.error('Error fetching current location:', error);
      }
    };
    setCurrentLocation();
  }, []); // Empty dependency array to run only once on component mount

  const handleSearch = async () => {
    Keyboard.dismiss();

    /* Reset the index to display most relevant results first and not run
      into out of bounds index error if previous result changed the index */
    setCurrentIndex(0);
    try {
      const response = await fetch('https://places.googleapis.com/v1/places:searchText', requestOptions);
      const data = await response.json();

      if (data.places && data.places.length > 0) {
        const results = data.places.map(place => ({
          displayName: place.displayName.text,
          latitude: place.location.latitude,
          longitude: place.location.longitude,
          address: place.shortFormattedAddress,
          longaddress: place.formattedAddress,
          websiteUri: place.websiteUri,
          regularOpeningHours: place.regularOpeningHours,
          internationalPhoneNumber: place.internationalPhoneNumber,
          rating: place.rating,
          photos:place.photos,
        }));
        
        setSearchResults(results);
        setRegion({
          ...region,
          latitude: results[0].latitude,
          longitude: results[0].longitude,
        });
        setErrorMessage('');
      } 
      else {
        setSearchResults([]);
        setErrorMessage('No results found');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleMarkerPress = (index) => {
    setCurrentIndex(index);
    setRegion({
      ...region,
      latitude: searchResults[index].latitude,
      longitude: searchResults[index].longitude,
    });
    const selectedResult = searchResults[index];
    navigation.navigate('Location Info', {
      locationDetails: {
        displayName: selectedResult.displayName,
        address: selectedResult.longaddress,
        websiteUri: selectedResult.websiteUri,
        regularOpeningHours: selectedResult.regularOpeningHours,
        internationalPhoneNumber: selectedResult.internationalPhoneNumber,
        rating: selectedResult.rating,
        photos:selectedResult.photos,
        latitude: selectedResult.latitude,
        longitude:selectedResult.longitude
      }
    });
  };

  const handleNext = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= searchResults.length) {
      nextIndex = 0; // Wrap around to the beginning
    }
    setCurrentIndex(nextIndex);
    setRegion({
      ...region,
      latitude: searchResults[nextIndex].latitude,
      longitude: searchResults[nextIndex].longitude,
    });
  };
  
  const handlePrevious = () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = searchResults.length - 1; // Wrap around to the end
    }
    setCurrentIndex(prevIndex);
    setRegion({
      ...region,
      latitude: searchResults[prevIndex].latitude,
      longitude: searchResults[prevIndex].longitude,
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };



  return (
    <View style={mapStyles.container}>
      <View style={mapStyles.searchContainer}>
        <TextInput
          style={mapStyles.input}
          placeholder="Search location"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch} // On keyboard return, we search right away
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      
      {searchResults.length === 0 && errorMessage && (
        <View style={mapStyles.errorContainer}>
          <Text style={mapStyles.errorMessage}>{errorMessage}</Text>
        </View>
      )}

      {searchResults.length > 0 && (
        <View style={mapStyles.resultContainer}>
          <TouchableOpacity onPress={handlePrevious}>
            <Text style={mapStyles.title}>Previous</Text>
          </TouchableOpacity>
            <TouchableOpacity>
              <Text numberOfLines={1} style={mapStyles.resultTitle}>
                {truncateText(searchResults[currentIndex].displayName, 30)}
              </Text>
            </TouchableOpacity>
          <TouchableOpacity onPress={handleNext}>
            <Text style={mapStyles.title}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
        style={{ flex: 1 }} 
      >
        <MapView style={mapStyles.map} region={region}>
          {searchResults.map((result, index) => (
            <Marker
            key={`${result.latitude}-${result.longitude}-${index}`}
            coordinate={{
              latitude: result.latitude,
              longitude: result.longitude,
            }}
            pinColor={index === currentIndex ? 'yellow' : 'red'}
          >
              <Callout tooltip>
                <View style={mapStyles.calloutContainer}>
                  <Text style={mapStyles.title}>{result.displayName}</Text>
                  <Text style={mapStyles.address}>{result.address}</Text>
                  <Button 
                    title="View Details" 
                    onPress={() => handleMarkerPress(index)}
                  />
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </TouchableOpacity>
    </View>
  );
};

export default HomeMap;