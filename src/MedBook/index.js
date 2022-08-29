import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer,DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthenticationScreens from "./Authentication";
import HomeScreens from "./Home";
import LogoTitle from "../Components/LogoTitle";
const Stack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <StatusBar backgroundColor={"lightgray"}></StatusBar>
      <Stack.Navigator>
        {AuthenticationScreens()}
        {HomeScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainApp;
