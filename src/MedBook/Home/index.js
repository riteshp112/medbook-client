import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChatScreens from "./Chats";
import ProfileScreens from "./MyProfile";
import PostScreens from "./Posts";
import RecordScreens from "./Records";
import SideBar from "./SideMenuDrawer";

const Stack = createNativeStackNavigator();

const HomeScreens = () => {
  return (
    <Stack.Group 
    >
      {PostScreens()}
      {ChatScreens()}
      {RecordScreens()}
      {ProfileScreens()}
      <Stack.Screen name ="SideMenu" component={SideBar} options={{header:()=>null,}}/>
    </Stack.Group>
  );
};

export default HomeScreens;
