import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const Start = ({ navigation }: any) => {
  const [name, setName] = useState('');

  // Handle button press to navigate to the chat screen
  const handleStartChat = () => {
    if (name.trim()) {
      navigation.navigate('Chat', { userName: name }); // Pass name as parameter to chat screen
    } else {
      alert('Please enter your name.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.button} onPress={handleStartChat}>
        <Text style={styles.buttonText}>Enter Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Start;
