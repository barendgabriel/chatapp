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
import { getAuth, signInAnonymously } from 'firebase/auth'; // Import Firebase Authentication

const Start = ({ navigation }: any) => {
  const [name, setName] = useState<string>(''); // State to store the name input

  // Handle the navigation to the chat screen
  const navigateToChat = () => {
    if (name.trim()) {
      const auth = getAuth();

      // Sign in anonymously
      signInAnonymously(auth)
        .then((userCredential) => {
          const user = userCredential.user;

          // Once logged in, navigate to the Chat screen with user details
          navigation.navigate('Chat', {
            userId: user.uid, // Pass the user ID
            userName: name, // Pass the user name
          });
        })
        .catch((error) => {
          console.error('Error signing in anonymously:', error);
          Alert.alert('Error', 'Could not sign in. Please try again.');
        });
    } else {
      Alert.alert('Validation Error', 'Please enter a name'); // Updated to use Alert for consistency
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity style={styles.button} onPress={navigateToChat}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Start;
