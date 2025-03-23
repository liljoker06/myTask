import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

// Importer les écrans
import HomeScreen from '../screens/HomeScreen';
import UncomingScreen from '../screens/UncomingScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Importer la TaskSidebar
import TaskSidebar from '../components/TaskSidebar'; // Assure-toi que le chemin est correct

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [refreshTasks, setRefreshTasks] = useState(false);

    // ✅ Fonction pour forcer le rafraîchissement des tâches dans HomeScreen
    const handleTaskCreated = () => {
        setRefreshTasks(prev => !prev); 
        setSidebarVisible(false); 
    };

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
                        borderTopWidth: 0,
                        position: 'relative',
                        zIndex: 0,
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    children={() => <HomeScreen refreshTasks={refreshTasks} />}
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
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="person-outline" color={color} size={size} />
                        ),
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>

            {/* Bouton + flottant */}
            <TouchableOpacity style={styles.addButton} onPress={() => setSidebarVisible(true)}>
                <Ionicons name="add-outline" color="#fff" size={30} />
            </TouchableOpacity>

            {/* Sidebar pour créer une tâche */}
            <TaskSidebar visible={sidebarVisible} onTaskCreated={handleTaskCreated} onClose={() => setSidebarVisible(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 90, 
        left: '90%',
        transform: [{ translateX: -30 }],  
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00008B',
        borderRadius: 50,
        height: 60,
        width: 60,
        zIndex: 1,
    },
});
