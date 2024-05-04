import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { accountStyles, globalStyles } from '../styles/';
import { signOut as firebaseSignOut } from 'firebase/auth'; 
import { getDatabase, ref, get } from "firebase/database"; 
import { auth } from '../config';

const AccountScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userID = auth.currentUser.uid;

        if (userID) {
          const db = getDatabase();
          const userRef = ref(db, `users/${userID}`);
          const snapshot = await get(userRef);
          const userData = snapshot.val();
          if (userData) {
            // If user data exists, set the full name in state
            const { firstName, lastName } = userData;
            setFullName(`${firstName} ${lastName}`);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Call the function to fetch user data when the component mounts
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      // Sign out the user from Firebase Authentication
      await firebaseSignOut(auth);
      
      // Navigate to the authentication stack after logout
      navigation.navigate('AuthStack');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={[accountStyles.container, globalStyles.background]}>
      <Text style={globalStyles.title}>Welcome, {fullName || 'User'}</Text>
      <View style={{ marginVertical: 10 }} />
      <View style={accountStyles.buttonContainer}>
        <View style={[accountStyles.buttonWrapper, accountStyles.bgBlue]}>
          <Button
            title="Log out"
            color="white"
            onPress={handleLogout}
          />
        </View>
      </View>
    </View>
  );
};

export default AccountScreen;
