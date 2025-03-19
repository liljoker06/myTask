import React from 'react';
import { View, Image } from 'react-native';

export default function Logo() {
  return (
    <View style={{ marginBottom: 0, alignItems: 'center' }}> 
      <Image 
        source={require('../../assets/logo.png')} 
        style={{ width: 250, height: 250, resizeMode: 'contain' }} 
      />
    </View>
  );
}