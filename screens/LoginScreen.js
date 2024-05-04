import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { formStyles, globalStyles, accountStyles } from '../styles';
import { signInWithEmailAndPassword } from '@firebase/auth';

import { auth } from '../config';

const Login = ({ navigation }) => {
  // State variables to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Function to handle user login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainStack' }],
        })
      );
    } catch (error) {
      if (error.code === 'auth/invalid-credential'){
        setErrorMsg('Invalid credentials.');
      }
      else if (error.code === 'auth/invalid-email'){
        setErrorMsg('Please enter a valid email.');
      }
      else if (error.code === 'auth/missing-password'){
        setErrorMsg('Please enter your password.');
      }
      else {
        setErrorMsg(error.message);
      }
    }
  };

  return (
    <View style={[accountStyles.container, globalStyles.background]}>
      <Text style={globalStyles.title}>Login</Text>
      <View style={formStyles.inputContainer}>
        <Text style={formStyles.label}>Email</Text>
        <TextInput
          style={formStyles.input}
          placeholder="Enter your email"
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
      </View>
      <View style={formStyles.inputContainer}>
        <Text style={formStyles.label}>Password</Text>
        <TextInput
          style={formStyles.input}
          placeholder="Enter your password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
      </View>
    {errorMsg && 
    <Text style={globalStyles.error}>{errorMsg}</Text>}
      <Button title="Login" onPress={handleLogin} />
      <View style={{ paddingTop: 15 }} />
      <Text onPress={() => navigation.navigate('Create Account')}>Don't have an account? Click here.</Text>
    </View>
  );
};

export default Login;