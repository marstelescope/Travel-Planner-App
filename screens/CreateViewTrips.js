import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Button, Dimensions } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { globalStyles, tripStyles } from '../styles/';
import TripModal from '../components/TripModal';
import EditButton from '../components/EditButton';
import { getDatabase, ref, set, get, remove, child } from "firebase/database";
import { auth } from '../config'; 

const CreateViewTrips = ({ route, navigation }) => {
  const [trips, setTrips] = useState([]);
  const [isAddingTrip, setIsAddingTrip] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTripName, setNewTripName] = useState('');
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameTripId, setRenameTripId] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const screenHeight = Dimensions.get('window').height;
  const topBarHeight = 300;

  const userID = auth.currentUser.uid;

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const db = getDatabase();
        const userTripsRef = ref(db, `users/${userID}/trips`);
        const snapshot = await get(userTripsRef);
        
        if (snapshot.exists()) {
          const tripsData = snapshot.val();
          const tripsArray = Object.keys(tripsData).map((key) => ({
            id: key,
            name: tripsData[key].name,
            locations: tripsData[key].locations || [] // Ensure locations property is defined
          }));
          setTrips(tripsArray);
        } else {
          console.log("No trips available");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrips();
  }, []);
  
  const addTrip = async () => {
    if (newTripName.trim() !== '') {
      try {
        const db = getDatabase();
        const newIndex = trips.length;
        const newTripRef = ref(db, `users/${userID}/trips/${newIndex}`);
        
        // Update state with the new trip including index
        setTrips([...trips, { 
          id: newIndex, 
          name: newTripName.trim(), 
          locations: [] 
        }]);

        // Ensure locations property is initialized in the database
        await set(newTripRef, { 
          id: newIndex, 
          name: newTripName.trim(), 
          locations: [] 
        }); 
      
        setNewTripName('');
        setIsAddingTrip(false);
      } catch (error) {
        console.error('Error adding trip:', error);
      }
    }
  };
  


  const deleteTrip = async (id) => {
    const db = getDatabase();
  
    // Remove the trip from the database
    await remove(ref(db, `users/${userID}/trips/${id}`));
  
    // Filter out the deleted trip and update the order of the remaining trips
    const updatedTrips = trips
      .filter(trip => trip.id !== id) // Remove the deleted trip
      .map((trip, index) => ({ ...trip, id: index, 
       })); // Update IDs and order
  
    // Update state with the updated trips
    setTrips(updatedTrips);
    // Update the trips in the database
    await set(ref(db, `users/${userID}/trips`), updatedTrips);
  };

  const handleRename = async () => {
    if (renameValue.trim() !== '') {
      const db = getDatabase();
      await set(ref(db, `users/${userID}/trips/${renameTripId}/name`), renameValue.trim());
      const updatedTrips = trips.map(t => {
        if (t.id === renameTripId) {
          return { ...t, name: renameValue.trim() };
        }
        return t;
      });
      setTrips(updatedTrips);
    }
    setIsRenaming(false);
    setRenameTripId(null);
    setRenameValue('');
  };

  const handleCancel = () => {
    setIsAddingTrip(false);
    setIsRenaming(false);
    setRenameTripId(null);
    setRenameValue('');
    setNewTripName('');
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleTripClick = async (trip) => {
    if (isEditing) return;
  
    if (route.params && route.params.locationDetails) {
      try {
        const db = getDatabase();
        const tripRef = ref(db, `users/${userID}/trips/${trip.id}`);
    
        // Fetch the current locations of the trip from the database
        const tripSnapshot = await get(child(tripRef, 'locations'));
        const tripLocations = tripSnapshot.val() || {};
    
        // Calculate the index for the new location
        const newIndex = Object.keys(tripLocations).length;
    
        // Add the index to the locationDetails object
        const locationDetails = {
            id: newIndex, // Store the index as the ID
            // Not storing null values of location details in DB
            ...Object.entries(route.params.locationDetails).reduce((acc, [key, value]) => {
                if (value !== null && value !== undefined) {
                    acc[key] = value;
                }
                return acc;
            }, {})
        };
    
        // Update the trip's locations in the database
        await set(child(tripRef, `locations/${newIndex}`), locationDetails);
    
        // Fetch the updated trip data from the database
        const updatedTripSnapshot = await get(tripRef);
        const updatedTrip = updatedTripSnapshot.val();
    
        // Update the state with the new trip data
        setTrips(trips.map(item =>
            item.id === updatedTrip.id ? updatedTrip : item
        ));
    
        navigation.goBack();
    } catch (error) {
        console.error('Error adding new location:', error);
    }    
    } else {
      navigation.navigate('Trip Details', { trip: trip, userID: userID });
    }
  };

  return (
    <View style={tripStyles.container}>
      <View style={{ marginVertical: 5 }} />
      <Text style={globalStyles.title}> Trips </Text>
      {( !trips || trips.length === 0) && (
          <Text>No trips. Click the + to create one.</Text>
      )}
      {!route.params && (
        <>
          <View style={tripStyles.addButton}>
            <Button onPress={() => setIsAddingTrip(true)} title="+" color="white" />
          </View>
          <EditButton
            onPress={toggleEditing}
            isEditing={isEditing}
          />
        </>
      )}
      <View style={{ marginVertical: 10 }} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddingTrip || isRenaming}
        onRequestClose={handleCancel} 
      >
        <TripModal
          isVisible={isAddingTrip || isRenaming}
          onCancel={handleCancel} 
          onAction={isAddingTrip ? addTrip : handleRename} 
          actionText={isAddingTrip ? 'Add' : 'Rename'}
          inputValue={isAddingTrip ? newTripName : renameValue} 
          setInputValue={isAddingTrip ? setNewTripName : setRenameValue} 
        />
      </Modal>
      <DraggableFlatList
        data={trips}
        renderItem={({ item, drag }) => (
          <TouchableOpacity style={tripStyles.tripItem} onLongPress={drag} onPress={() => handleTripClick(item)}>
            <Text style={globalStyles.subtletitle}>{item.name}</Text>
            {isEditing && (
              <View style={tripStyles.buttonsContainer}>
                <View style={tripStyles.buttons}>
                <TouchableOpacity onPress={() => [setIsRenaming(true), setRenameTripId(item.id), setRenameValue(item.name)]} style={ { marginRight: 10 }}>
                  <Text>Rename</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTrip(item.id)}>
                  <Text style={tripStyles.deleteButton}>Delete</Text>
                </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => String(item.id)}
        onDragEnd={async ({ data }) => {
          try {
            const db = getDatabase();
            const userTripsRef = ref(db, `users/${userID}/trips`);

            const updatedTrips = data.map((trip, index) => ({
              ...trip,
              id: index,
            }));

            // Update the state and database
            setTrips(updatedTrips);
            await set(userTripsRef, updatedTrips);

        } catch (error) {
            console.error('Error updating trip order:', error);
        }
      }}
      contentContainerStyle={{ minHeight: screenHeight - topBarHeight }} />
    </View>
  );
};

export default CreateViewTrips;