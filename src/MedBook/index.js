import React, { useState } from "react";
import { StatusBar } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthenticationScreens from "./Authentication";
import HomeScreens from "./Home";
const Stack = createNativeStackNavigator();

export const ThemeContext = React.createContext();

const MainApp = () => {
  const [theme, setTheme] = useState(true);
  const themeData = { theme, setTheme };
  return (
    <ThemeContext.Provider value={themeData}>
      <NavigationContainer theme={theme ? DefaultTheme : DarkTheme}>
        <StatusBar backgroundColor={"lightgray"} />
        <Stack.Navigator>
          {AuthenticationScreens}
          {HomeScreens}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};
export default MainApp;
