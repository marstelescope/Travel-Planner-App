import React from 'react';
import { ScrollView, View, Text, Linking, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { googleApiKey } from '../config';
import { locationStyles } from '../styles';

const LocationInfo = ({ route, navigation }) => {
const { displayName, address, websiteUri, internationalPhoneNumber, rating, regularOpeningHours, photos, id, storedPhotoUris, latitude, longitude } = route.params.locationDetails;

// Function to open the website in the browser
const handleWebsitePress = () => {
  if (websiteUri) {
    Linking.openURL(websiteUri);
  }
};

const [photoUris, setPhotoUris] = useState([]);

// Fetch photo URIs only if they are not already present
// This saves API use costs
  useEffect(() => {
    // Check if storedPhotoUris are present
    if (storedPhotoUris && storedPhotoUris.length > 0) {
      // If storedPhotoUris are present, use them directly
      setPhotoUris(storedPhotoUris);
    } else {
      // Otherwise, fetch photo URIs if there are photos
      if (photos){
        const fetchPhotoUris = async () => {
          const fetchedPhotoUris = [];
          let photoCount = 0;
          for (const photo of photos) {
            try {
              const response = await fetch(`https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=300&maxWidthPx=300&key=${googleApiKey}`);
              if (response.ok) {
                fetchedPhotoUris.push(response.url);
                photoCount++; // Increment the photo count
                if (photoCount === 3) break; // Break out of the loop if three photos are fetched (all photos is time consuming)
              }
            } catch (error) {
              console.error('Error fetching photo URI:', error);
            }
          }
          setPhotoUris(fetchedPhotoUris);
          }
          
        fetchPhotoUris();
      };
    }
  }, []);


  const renderRating = () => {
    if (rating) {
      const ratingStars = '★'.repeat(Math.round(rating));
      const emptyStars = '☆'.repeat(5 - Math.round(rating));
      return (
        <Text>
          {ratingStars}{emptyStars} ({rating.toFixed(1)}/5)
        </Text>
      );
    }
    return <Text>No rating available</Text>;
  };

  return (
    <ScrollView style={{ flex: 1 }}>
    <View style={locationStyles.container}>
    {!id &&
      (<TouchableOpacity style={locationStyles.addButton} onPress={() => {
          navigation.navigate('Create/View Trips', {
            locationDetails: {
              latitude,
              longitude,
              displayName,
              address,
              websiteUri,
              internationalPhoneNumber,
              rating,
              regularOpeningHours,
              photos,
              storedPhotoUris: (storedPhotoUris ? storedPhotoUris : photoUris)
            }
          });
        }}>
          <Text style={locationStyles.addButtonLabel}>Add to Trip</Text>
        </TouchableOpacity> )}
      <Text style={locationStyles.title}>{displayName}</Text>
      {rating && (
        <Text style={locationStyles.rating}>{renderRating()}</Text>
      )}
      {/* Only include scrollview when there are photos so we don't have a large blank block */}
      {photoUris && photoUris.length > 0 && (
          <View style={{ height: 220 }}>
            <ScrollView horizontal>
              {photoUris.map((uri, index) => (
                <Image key={index} source={{ uri }} style={locationStyles.image} />
              ))}
            </ScrollView>
          </View>
      )}
      {address && (
      <Text style={locationStyles.address}>{address}</Text>
      )}
      {internationalPhoneNumber && (
        <Text style={locationStyles.info}>{internationalPhoneNumber}</Text>
      )}
      {websiteUri && (
        <Text style={locationStyles.link} onPress={handleWebsitePress}>Visit website</Text>
      )}
      {regularOpeningHours && regularOpeningHours.weekdayDescriptions && (
        <View>
          <Text style={locationStyles.subtitle}>Opening Hours:</Text>
          {regularOpeningHours.weekdayDescriptions.map((day, index) => (
            <Text key={index} style={locationStyles.openingHours}>{day}</Text>
          ))}
        </View>
      )}
    </View>
    </ScrollView>
  );
};


export default LocationInfo;