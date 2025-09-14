import { Slot, Stack, Tabs } from "expo-router";
import '../../global.css';

import { ThemeProvider, DarkTheme } from "@react-navigation/native";

export default function RootLayout() {
    console.log("RootLayout");
    return (
        <ThemeProvider value={DarkTheme}> 
            <Slot />
        </ThemeProvider>
    );
}