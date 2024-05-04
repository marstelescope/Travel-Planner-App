import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { tripStyles } from '../styles';

const TripModal = ({ isVisible, onCancel, onAction, actionText, inputValue, setInputValue }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => onCancel()}
        >
            <View style={tripStyles.modalContainer}>
                <View style={tripStyles.modalContent}>
                    <Text>Enter trip name:</Text>
                    <View style={{ paddingTop: 15 }} />
                    <TextInput
                        style={tripStyles.input}
                        placeholder="Enter trip name"
                        value={inputValue}
                        onChangeText={setInputValue}
                    />
                    <View style={tripStyles.buttons}>
                        <TouchableOpacity onPress={onAction} style={tripStyles.actionButton}>
                            <Text style={tripStyles.buttonText}>{actionText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCancel} style={tripStyles.cancelButton}>
                            <Text style={tripStyles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default TripModal;