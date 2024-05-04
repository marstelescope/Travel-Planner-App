import React, { useState } from 'react';
import { Text, TextInput, Button, KeyboardAvoidingView, View,Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formStyles, globalStyles, accountStyles } from '../styles';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { getDatabase, ref, set } from "firebase/database"; 
import { auth } from '../config';
import { CommonActions } from '@react-navigation/native';

function CreateAccountScreen({ navigation }) {
  // State variables for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(null); // Use null for initial date
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  

  // Function to handle Date of Birth selection
  const handleDateConfirm = (date) => {
    setDob(date);
    hideDatePicker();
  };
  // Function to show Date of Birth picker
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  // Function to hide Date of Birth picker
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  // Function to validate form fields
  const validateFields = () => {
    if (!firstName || !lastName || !phoneNumber || !email || !dob) {
      setErrorMsg('All fields are required');
      return false;
    }
    if (phoneNumber.length < 10 || phoneNumber.length > 12){
      setErrorMsg('Please enter a valid phone number.');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return false;
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters.');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    try {
      // Validate form fields
      if (validateFields()) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        // Save additional user data in Realtime Database
        await addUserDataToRealtimeDatabase(user.uid, {
          firstName,
          lastName,
          phoneNumber,
          dob: dob.toISOString(),
        });
  
        // Sign in the user
        await signInWithEmailAndPassword(auth, email, password);
  
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'MainStack' }],
          })
        );
      }
    } catch (error) {
      if (error.code === 'auth/weak-password'){
        setErrorMsg('Password must be at least 6 characters.');
      }
      else if (error.code === 'auth/email-already-in-use'){
        setErrorMsg('Email already in use.');
      }
      else if (error.code === 'auth/invalid-email'){
        setErrorMsg('Please enter a valid email.');
      }
      else {
        setErrorMsg(error.message);
      }
    }
  };
  
  
  const addUserDataToRealtimeDatabase = async (uid, userData) => {
    try {
      const db = getDatabase();
      await set(ref(db, `users/${uid}`), userData);
      console.log('User data added to Realtime Database successfully!');
    } catch (error) {
      console.error('Error adding user data to Realtime Database:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={[accountStyles.container, globalStyles.background]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text style={globalStyles.title}>Sign up</Text>
        <View style={formStyles.inputContainer}>
          <Text style={formStyles.label}>First Name:</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
        </View>
        <View style={formStyles.inputContainer}>
          <Text style={formStyles.label}>Last Name:</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
        </View>
        <View style={formStyles.inputContainer}>
          <Text style={formStyles.label}>Phone Number:</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            keyboardType="phone-pad"
          />
        </View>
        <View style={formStyles.inputContainer}>
          <Text style={formStyles.label}>Email:</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={formStyles.inputContainer}>
          <Text style={formStyles.label}>Date of Birth:</Text>
          <Button title={dob ? dob.toDateString() : "Select Date"} onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View style={formStyles.inputContainer}>
          <Text style={formStyles.label}>Password:</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>
        <View style={formStyles.inputContainer}>
          <Text style={formStyles.label}>Confirm Password:</Text>
          <TextInput
            style={formStyles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={text => setconfirmPassword(text)}
            secureTextEntry
          />
          <Text style={formStyles.label}>Password must be at least 8 characters.</Text>
          </View> 
        { errorMsg && 
        <Text style={globalStyles.error}>{errorMsg}</Text> }
        <Button title="Sign up" onPress={handleSignup} />
        <View style={{ paddingTop: 15 }} />
        <Text onPress={() => navigation.navigate('Login')}>Already have an account? Log in here.</Text>
    </KeyboardAvoidingView>
  );
}

export default CreateAccountScreen;
