import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL, TOKEN_KEY} from '@env';



// Définition des types
interface AuthProps {
    authState: { token: string | null; authenticated: boolean | null };
    onRegister: (email: string, password: string, username: string) => Promise<any>;
    onLogin: (email: string, password: string) => Promise<any>;
    onLogout: () => Promise<void>;
}


console.log("🔗 API_URL:", API_URL);
console.log("🔑 TOKEN_KEY utilisé :", TOKEN_KEY);




// Création du contexte
const AuthContext = createContext<AuthProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth doit être utilisé dans un AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<{ token: string | null; authenticated: boolean | null }>({
        token: null,
        authenticated: null,
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({ token, authenticated: true });
            } else {
                setAuthState({ token: null, authenticated: false });
            }
        };
        loadToken();
    }, []);

    const register = async (email: string, username: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/user/register`, {email, username, password});
        } catch (e: any) {
            console.error(e);
            return { error: true, msg: e.response?.data || 'Erreur inconnue' };
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/user/auth`, { email, password });

            console.log("🚀 AuthContext.tsx: Login result", result);

            setAuthState({ token: result.data.token, authenticated: true });
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
        } catch (e: any) {
            console.error(e);
            return { error: true, msg: e.response?.data || 'Erreur inconnue' };
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        axios.defaults.headers.common['Authorization'] = '';
        setAuthState({ token: null, authenticated: false });
    };

    const value: AuthProps = {
        authState,
        onRegister: register,
        onLogin: login,
        onLogout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
