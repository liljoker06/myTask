import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, StyleSheet, View } from 'react-native';



// Importer les écrans pour chaque onglet
import HomeScreen from '../screens/HomeScreen';
import UncomingScreen from '../screens/UncomingScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Créer le Tab
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarActiveTintColor: '#00008B',
                    tabBarInactiveTintColor: '#BDBDBD',
                    tabBarStyle: {
                        height: 80,
                        paddingBottom: 10,
                        borderTopWidth: 0,  // Suppression du bord supérieur
                        position: 'relative',  // Assurer la position relative de la navbar
                        zIndex: 0,  // Pour être derrière le bouton "+" flottant
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home-outline" color={color} size={size} />
                        ),
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="Explore"
                    component={UncomingScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="compass-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person-outline" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>

            {/* Bouton + flottant */}
            <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add-outline" color="#fff" size={30} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 90,  // Distance au-dessus de la navbar
        left: '90%',
        transform: [{ translateX: -30 }],  // Centrer le bouton horizontalement
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00008B',
        borderRadius: 50,
        height: 60,
        width: 60,
        zIndex: 1,  // Assure que le bouton est au-dessus de la navbar
    },
});
