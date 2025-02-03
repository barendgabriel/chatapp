import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
} from 'react-native-gifted-chat';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  Unsubscribe,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, storage, isConnected }: any) => {
  const { userName, bgColor } = route.params; // Ensure userName is received correctly

  const [messages, setMessages] = useState<IMessage[]>([]);
  const db = getFirestore(); // Initialize Firestore
  const auth = getAuth(); // Initialize Firebase Authentication
  const user = auth.currentUser;

  useEffect(() => {
    navigation.setOptions({ title: userName });
    let unsubscribe: Unsubscribe;

    if (isConnected === true) {
      // Fetch messages from Firestore in real-time
      const messagesRef = collection(db, 'messages');
      const q = query(messagesRef, orderBy('createdAt', 'desc')); // Order by createdAt descending

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedMessages: IMessage[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            location: data.location,
            createdAt: data.createdAt.toDate(),
            user: {
              _id: data.userId,
              name: data.userName,
            },
          };
        });
        cachedMessages(fetchedMessages);
        setMessages(fetchedMessages);
      });
    } else {
      loadCachedMessages();
    }

    // Clean up code
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [db, userName, navigation, isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('messages')) || '[]';
    setMessages(JSON.parse(cachedMessages));
  };

  const cachedMessages = async (messagesToCache: IMessage[]) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onSend = (newMessages: IMessage[] | any) => {
    // Ensure that userName is properly passed and not undefined
    if (!userName) {
      console.error('User name is undefined.');
      return;
    }

    // Save new message to Firestore
    const newMessage = newMessages[0]; // The message to be sent
    addDoc(collection(db, 'messages'), {
      text: newMessage.text || null,
      location: newMessage.location || null,
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

  const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
    if (isConnected === true) return <InputToolbar {...props} />;
    else return null;
  };

  const renderCustomActions = (props: any) => {
    return <CustomActions storage={storage} {...props} onSend={onSend} />;
  };

  const renderCustomView = (props: any) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
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
          renderInputToolbar={renderInputToolbar}
          renderActions={renderCustomActions}
          renderCustomView={renderCustomView}
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
