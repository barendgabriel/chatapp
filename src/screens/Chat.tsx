import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }: any) => {
  const { name } = route.params; // Get the user name passed from the previous screen

  // Set initial state for messages
  const [messages, setMessages] = useState<IMessage[]>([]);

  // Function to handle sending a new message
  const onSend = (newMessages: IMessage[]) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  useEffect(() => {
    // Set an initial message in the chat
    setMessages([
      {
        _id: 1,
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

  useEffect(() => {
    // Set the title of the navigation header to the user's name
    navigation.setOptions({ title: name });
  }, [name, navigation]); // Add name to dependencies so it updates if the name changes

  return (
    <GiftedChat
      messages={messages} // Display the list of messages
      onSend={(messages) => onSend(messages)} // Handle sending new messages
      user={{
        _id: 1, // ID of the current user
        name: name, // Name of the current user (passed from params)
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
