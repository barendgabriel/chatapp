import React, { useState, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat'; // Import IMessage from GiftedChat
import { View, Text, StyleSheet } from 'react-native';

// Define the structure of a message
interface User {
  _id: number;
  name: string;
  avatar: string;
}

// Use IMessage directly from GiftedChat to avoid conflicts with _id types
const Chat = ({ route, navigation }: any) => {
  const { userName, bgColor } = route.params; // Get userName and bgColor passed from Start screen

  // Explicitly type the messages state as IMessage[]
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    // Set a static initial message
    setMessages([
      {
        _id: 1, // _id can now be number or string, as per IMessage definition
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  // Function to handle sending a new message
  const onSend = (newMessages: IMessage[]) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  useEffect(() => {
    // Set the name in the navigation bar
    navigation.setOptions({
      title: userName, // Set the title in the header to the user's name
    });
  }, [navigation, userName]);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.greeting}>Hello, {userName}!</Text>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1, // ID of the current user
          name: userName, // Name of the current user
        }}
      />
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
    marginBottom: 20,
  },
});

export default Chat;
