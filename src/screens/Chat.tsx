import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }: any) => {
  const { name, bgColor } = route.params;

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Welcome! You’ve entered the chat.',
        createdAt: new Date(),
        system: true,
        user: {
          _id: 0, // A unique ID for the system user
          name: 'System', // System user's name
        },
      },
      {
        _id: 2,
        text: 'Hello! How can I assist you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native Bot',
          avatar: 'https://placeimg.com/140/140/tech',
        },
      },
    ]);
  }, []);

  const onSend = (newMessages: IMessage[]) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation, name]);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
            name,
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
