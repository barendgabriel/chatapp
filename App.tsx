import React from 'react';
import { StyleSheet, View } from 'react-native';
import Start from './src/screens/Start';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Start />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
