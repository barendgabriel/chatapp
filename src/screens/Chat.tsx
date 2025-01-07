import { GiftedChat } from 'react-native-gifted-chat';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chat = ({ route, navigation }: any) => {
  const { userName, bgColor } = route.params; // Get userName and bgColor passed from Start screen

  useEffect(() => {
    // Set the name in the navigation bar
    navigation.setOptions({
      title: userName, // Set the title in the header to the user's name
    });
  }, [navigation, userName]);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
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
