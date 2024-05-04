import React from 'react';
import { View, Button, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { accountStyles, globalStyles, locationStyles } from '../styles';

const LoginCreateAccountScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={[accountStyles.container, globalStyles.landingPageBackground]}>
      <Text style={globalStyles.title}>TRVL</Text>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6350/6350271.png' }} 
        style={locationStyles.image}
      />
      
      <Text style={globalStyles.subtletitle}>your pocket travel planner</Text>
      <View style={{ paddingTop: 25 }} />
      <View style={accountStyles.buttonContainer}>
        <View style={[accountStyles.buttonWrapper, accountStyles.bgGreen]}>
          <Button 
            title="Login" 
            color="white" 
            onPress={() => navigation.navigate("Login")} 
          />
        </View>
        <View style={{ marginVertical: 20 }} />
        <View style={[accountStyles.buttonWrapper, accountStyles.bgBlue]}>
          <Button 
            title="Create Account" 
            color="white" 
            onPress={() => navigation.navigate("Create Account")} 
          />
        </View>
      </View>
    </View>
  );
}

export default LoginCreateAccountScreen;
