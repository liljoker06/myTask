import React from 'react';
import { View, Text } from 'react-native';
import TabNavigator from '../navigation/TabNavigator'; 

export default function MainScreen() {
  return (
    <View style={{ flex: 1 }}>
      <TabNavigator />
    </View>
  );
}
