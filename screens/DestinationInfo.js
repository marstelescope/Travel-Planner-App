import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, ScrollView, Image} from 'react-native';
import { globalStyles, locationStyles } from '../styles';

const DestinationInfo = ({route}) => {
  const {destination} = route.params;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500, 
      useNativeDriver: true,
    }).start();
  };
  
  useEffect(() => {
    fadeIn(); 
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>{destination.title}</Text>      
      <Animated.View style={{ height: 220, opacity: fadeAnim }}>      
        <ScrollView horizontal>
          {destination.uris.map((image, idx) => (
            <Image key={idx} source={image} style={locationStyles.image}/>
          ))}
        </ScrollView>
      </Animated.View>
      {destination.locations.map((location, index) => (
        <Animated.View key={index} style= {{opacity: fadeAnim}}>
          <Text style={globalStyles.subtitle}>{location.name}</Text>
          <Text>{location.description}</Text>
        </Animated.View>
      ))}
    </View>
    </ScrollView>
  );
}

export default DestinationInfo;