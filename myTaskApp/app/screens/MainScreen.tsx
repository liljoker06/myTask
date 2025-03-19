import React from 'react';
import { View } from 'react-native';
import TabNavigator from '../navigation/TabNavigator';

export default function MainScreen() {
  return (
    <View style={{ flex: 1, paddingTop: 50}}> 
      <TabNavigator />
    </View>
  );
}
