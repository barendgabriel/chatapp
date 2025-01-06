import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chat = ({ route }: any) => {
  const { userName } = route.params; // Get the userName passed from Start screen

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, {userName}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Chat;
