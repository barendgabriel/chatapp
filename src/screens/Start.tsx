import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const Start = ({ navigation }: any) => {
  const [name, setName] = useState<string>(''); // State to store the name input

  // Handle the navigation to the chat screen
  const navigateToChat = () => {
    if (name.trim()) {
      navigation.navigate('Chat', { userName: name }); // Passing name to the chat screen
    } else {
      Alert.alert('Validation Error', 'Please enter a name'); // Updated to use Alert for consistency
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/chatappbackground.jpg')} // Correct relative path
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#888" // Added placeholder text color for better visibility
            onChangeText={setName}
            value={name}
          />
          <TouchableOpacity style={styles.button} onPress={navigateToChat}>
            <Text style={styles.buttonText}>Enter Chat</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  innerContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff', // Added background color for clarity
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold', // Enhanced visibility with bold text
  },
});

export default Start;
