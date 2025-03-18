import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./app/context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "./app/context/AuthContext";


//pages
import HomeScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import { Button } from "react-native";

const Stack = createStackNavigator();


export default function App() {
  return (
    <AuthProvider>
      <Layout>

      </Layout>
    </AuthProvider>

  );
};


export const Layout = () => {

  const { authState, onLogout } = useAuth();

  return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authState.authenticated ? (
        <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          headerRight: () => (<Button title="Logout" onPress={onLogout} />),}}></Stack.Screen>
      ) : (
        <Stack.Screen 
        name="Login" 
        component={LoginScreen}>
        </Stack.Screen> 
      )}
    </Stack.Navigator>
  </NavigationContainer>
  );
}
