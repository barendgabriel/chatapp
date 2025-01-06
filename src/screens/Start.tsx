import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';

// Start Screen component
const Start = ({ navigation }: any) => {
  const [name, setName] = useState<string>(''); // State to store the name input

  // Handle the navigation to the chat screen
  const navigateToChat = () => {
    if (name.trim()) {
      navigation.navigate('Chat', { userName: name }); // Passing name to the chat screen
    } else {
      alert('Please enter a name');
    }
  };

  return (
    // Updated image source path
    <ImageBackground
      source={require('../../assets/chatappbackground.jpg')} // Correct relative path
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Text Input for the name */}
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={setName}
          value={name}
        />
        {/* Button to navigate to the Chat screen */}
        <TouchableOpacity style={styles.button} onPress={navigateToChat}>
          <Text style={styles.buttonText}>Enter Chat</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// Styles for the Start screen
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
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
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Start;
