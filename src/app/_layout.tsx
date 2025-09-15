import { Slot, Stack, Tabs } from "expo-router";
import '../../global.css';

import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
    console.log("RootLayout");
    return (
        <AuthProvider>
            <ThemeProvider value={DarkTheme}> 
                <Slot />
            </ThemeProvider>
        </AuthProvider>
    );
}