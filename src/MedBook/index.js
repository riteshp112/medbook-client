import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthenticationScreens from "./Authentication";
import HomeScreens from "./Home";
import SideBar from "./Home/SideMenuDrawer";

const Stack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={"lightgray"}></StatusBar>
      <Stack.Navigator>
        {AuthenticationScreens()}
        {HomeScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainApp;
