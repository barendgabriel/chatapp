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
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID',
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
            userName: user?.displayName || 'Anonymous',
            userId: user?.uid || '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
