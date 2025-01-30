import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Chat = ({ route, navigation }: any) => {
  const { userName, bgColor } = route.params; // Ensure userName is received correctly

  const [messages, setMessages] = useState<IMessage[]>([]);
  const db = getFirestore(); // Initialize Firestore
  const auth = getAuth(); // Initialize Firebase Authentication
  const user = auth.currentUser;

  useEffect(() => {
    navigation.setOptions({ title: userName });

    // Fetch messages from Firestore in real-time
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc')); // Order by createdAt descending
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages: IMessage[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: {
            _id: data.userId,
            name: data.userName,
          },
        };
      });
      setMessages(fetchedMessages);
    });

    // Cleanup the listener
    return () => unsubscribe();
  }, [db, userName, navigation]);

  const onSend = (newMessages: IMessage[]) => {
    // Ensure that userName is properly passed and not undefined
    if (!userName) {
      console.error('User name is undefined.');
      return;
    }

    // Save new message to Firestore
    const newMessage = newMessages[0]; // The message to be sent
    addDoc(collection(db, 'messages'), {
      text: newMessage.text,
      createdAt: new Date(),
      userId: user?.uid, // Get user ID from Firebase Authentication
      userName: userName, // Use userName passed from the Start screen
    }).catch((error) => {
      console.error('Error adding document: ', error);
    });

    // Append the new message to the local state
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

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
            _id: user?.uid || 1, // Use Firebase user ID if available, else fallback
            name: userName, // Ensure userName is passed correctly
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
