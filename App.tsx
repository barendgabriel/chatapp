import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './src/screens/Start'; // Import Start screen
import Chat from './src/screens/Chat'; // Import Chat screen

// Define the types for the screens
type RootStackParamList = {
  Start: undefined;
  Chat: { userName: string }; // Pass userName to Chat screen
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
