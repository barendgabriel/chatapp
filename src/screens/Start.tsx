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
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/chatappbackground.jpg')} // Correct path to the image
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity onPress={navigateToChat} style={styles.button}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Start;
