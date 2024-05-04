import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Modal } from 'react-native';
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { globalStyles, tripStyles, mapStyles } from '../styles/';
import DraggableFlatList from 'react-native-draggable-flatlist';
import MapView, { Marker } from 'react-native-maps';
import EditButton from '../components/EditButton';

const TripInfo = ({ route, navigation }) => {
    const { trip, userID } = route.params;
    const [locations, setLocations] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isMapModalVisible, setMapModalVisible] = useState(false);
    const [mapRegion, setMapRegion] = useState(null);

    const toggleMapModal = () => {
        setMapModalVisible(!isMapModalVisible);
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const db = getDatabase();
                const tripRef = ref(db, `users/${userID}/trips/${trip.id}/locations`);
                const snapshot = await get(tripRef);
                if (snapshot.exists()) {
                    const locationsData = snapshot.val();
                    const locationsArray = Object.entries(locationsData).map(([key, value]) => ({
                        ...value,
                        id: key // Use the key as the item id
                    }));
                    setLocations(locationsArray);
                    calculateMapRegion(locationsArray);
                }
            } catch (error) {
                console.error('Error fetching trip locations:', error);
            }
        };

        fetchLocations();
    }, [trip.id, userID]);

    const deleteItem = async (itemId) => {
        try {
          const db = getDatabase();
          const tripLocationsRef = ref(db, `users/${userID}/trips/${trip.id}/locations/${itemId}`);
      
          // Remove the location from the database
          await remove(tripLocationsRef);
      
          // Filter out the deleted location and update the order of the remaining locations
          const updatedLocations = locations
            .filter(location => location.id !== itemId) // Remove the deleted location
            .map((location, index) => ({ ...location, id: index }));
      
          // Update the locations in the database
          await set(ref(db, `users/${userID}/trips/${trip.id}/locations`), updatedLocations);
      
          // Update state with the updated locations
          setLocations(updatedLocations);
      
          // Recalculate the map region if needed
          calculateMapRegion(updatedLocations);
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      };
      


    // Ensures all markers can be seen on view map click 
    const calculateMapRegion = (locations) => {
        if (locations.length === 0) return;
    
        let minLat = locations[0].latitude;
        let maxLat = locations[0].latitude;
        let minLng = locations[0].longitude;
        let maxLng = locations[0].longitude;
    
        locations.forEach(location => {
            minLat = Math.min(minLat, location.latitude);
            maxLat = Math.max(maxLat, location.latitude);
            minLng = Math.min(minLng, location.longitude);
            maxLng = Math.max(maxLng, location.longitude);
        });
    
        const latDelta = maxLat - minLat;
        const lngDelta = maxLng - minLng;
    
        const padding = 0.8; 
    
        setMapRegion({
            latitude: (minLat + maxLat) / 2,
            longitude: (minLng + maxLng) / 2,
            latitudeDelta: latDelta + padding,
            longitudeDelta: lngDelta + padding,
        });
    };



    const renderItem = ({ item, drag }) => {
        const handlePress = () => {
            if (!isEditing) {
                navigation.navigate('Location Info', {
                    locationDetails: item
                });
            }
        };
    
        return (
            <TouchableOpacity 
                style={tripStyles.tripItem} 
                onLongPress={drag} 
                onPress={handlePress} // Use a conditional handler
            >
                <Text style={globalStyles.subtletitle}>{item.displayName}</Text>
                {isEditing && (
                    <TouchableOpacity onPress={() => deleteItem(item.id)}>
                        <Text style={tripStyles.deleteButton}>Delete</Text>
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        );
    };
    
    return (
        <View style={tripStyles.container}>
            {locations && locations.length > 0&&
            <EditButton
                onPress={toggleEditing}
                isEditing={isEditing}
            />}
            {locations && locations.length > 0&&( <View style={tripStyles.viewMapButton}>
                <Button onPress={toggleMapModal} title='View in Map' color="white" />
            </View>)}
            <View style={{ marginVertical: 5 }} />
            <Text style={globalStyles.title}>{trip.name}</Text>
            <View style={{ marginVertical: 10 }} />
            <DraggableFlatList
                data={locations}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.id)}
                onDragEnd={async ({ data }) => {
                    try {
                        const db = getDatabase();
                        const tripRef = ref(db, `users/${userID}/trips/${trip.id}/locations`);

                        const updatedLocations = data.map((location, index) => ({
                            ...location,
                            id: index,
                        }));

                        // Update the state with the new locations
                        setLocations(updatedLocations);
                        calculateMapRegion(updatedLocations);
                        await set(tripRef, updatedLocations);

                    } catch (error) {
                    console.error('Error updating location order:', error);
                    }
                }}
                />
            {( !locations || locations.length === 0) && (
                <Text>No locations have been added to this trip.</Text>
            )
            }
            <Modal
                visible={isMapModalVisible}
                animationType="slide"
                onRequestClose={toggleMapModal}
            >
                <View style={tripStyles.modalHeader}>
                    <Text style={tripStyles.modalHeaderText}>{trip.name}</Text>
                        <TouchableOpacity onPress={toggleMapModal}>
                            <Text style={tripStyles.dismissButton}>Dismiss</Text>
                        </TouchableOpacity>
                       
                    </View>
                    {locations.length > 0 && (
            <MapView style={mapStyles.map} region={mapRegion}>
                {locations.map((location) => (
                <Marker
                    key={location.id}
                    coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                    title={location.displayName}
                    description={location.formattedAddress}
                />
                ))}
            </MapView>
            )}
            </Modal>
        </View>
    );
};

export default TripInfo;