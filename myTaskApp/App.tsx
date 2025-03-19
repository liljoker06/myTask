import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./app/context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "./app/context/AuthContext";
import { Button } from "react-native";

// Pages
import HomeScreen from "./app/screens/MainScreen";
import LoginScreen from "./app/screens/LoginScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authState.authenticated ? (
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            headerRight: () => (
              <Button 
                title="Logout" 
                onPress={onLogout} 
              />
            ),
          }} 
        />
      ) : (
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
        />
      )}
    </Stack.Navigator>
  );
};
