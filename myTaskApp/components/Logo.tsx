// components/Logo.tsx
import React from 'react';
import { View, Image } from 'react-native';

export default function Logo() {
  return (
    <View style={{ marginBottom: 32, alignItems: 'center' }}>
      <Image 
        source={require('../assets/logo.png')} 
        style={{ width: 150, height: 150, resizeMode: 'contain' }} 
      />
    </View>
  );
}