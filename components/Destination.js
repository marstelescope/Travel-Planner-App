import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
 import PropTypes from 'prop-types'; // Import PropTypes from 'prop-types'

import { destinationStyles } from '../styles';

const DestinationItem = ({ destination, onPress }) => {
  return (
    <TouchableOpacity style={destinationStyles.destinationItem} onPress={() => onPress(destination)}>
      <Image source={destination.image} style={destinationStyles.image} />
      <Text style={destinationStyles.destinationTitle}>{destination.title}</Text>
    </TouchableOpacity>
  );
};

DestinationItem.propTypes = {
  destination: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default DestinationItem;
