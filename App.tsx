import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import Start from './src/screens/Start'; // Import Start screen
import Chat from './src/screens/Chat'; // Import Chat screen

// Define the types for the screens
type RootStackParamList = {
  Start: undefined;
  Chat: { userName: string; userId: string }; // Pass userName and userId to Chat screen
};

const Stack = createStackNavigator<RootStackParamList>();

const firebaseConfig = {
  apiKey: 'AIzaSyCqI4K-ZEHeylz21GPL_RJ4a03NwMPCI1w',
  authDomain: 'chatapp-24229.firebaseapp.com',
  projectId: 'chatapp-24229',
  storageBucket: 'chatapp-24229.firebasestorage.app',
  messagingSenderId: '205101684549',
  appId: '1:205101684549:web:ac029478185e05c4b7902c',
  measurementId: 'G-VGG64YCQ8R',
};

const App = () => {
  const [user, setUser] = useState<any>(null);

  // Initialize Firebase
  const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    // Anonymous sign-in logic
    const signIn = async () => {
      try {
        const userCredential = await signInAnonymously(auth);
        setUser(userCredential.user); // Store the user after signing in
      } catch (error) {
        console.error('Error during anonymous sign-in:', error);
      }
    };

    if (!user) {
      signIn(); // Trigger anonymous sign-in
    }
  }, [user, auth]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen
          name="Chat"
          component={Chat}
          initialParams={{
            userName: user?.displayName || 'Anonymous', // Use default name if not set
            userId: user?.uid || '', // Pass the userId to Chat screen
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
