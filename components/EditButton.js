import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const EditButton = ({ onPress, isEditing }) => {
    return (
        <View style={styles.editButton}>
            <Button onPress={onPress} title={isEditing ? 'Done' : 'Edit'} color="white" />
        </View>
    );
};

const styles = StyleSheet.create({
    editButton: {
        position: 'absolute',
        top: 10,
        right: '5%',
        backgroundColor: 'blue',
        borderRadius: 5,
    },
});

export default EditButton;
