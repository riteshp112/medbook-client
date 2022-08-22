import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Logout from "../Authentication/Logout";
import ChatList from "./Chats/ChatLists";
import HomeTabs from "./HomeTabs";
import ProfileDetail from "./MyProfile/ProfileDetails";
import PostList from "./Posts/PostLists";
import RecordList from "./Records/RecordLists";
const Drawer = createDrawerNavigator();

const SideBar = () => {
  return (
    <Drawer.Navigator initialRouteName={"Home"}>
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen name={"Posts"} component={PostList} />
      <Drawer.Screen name={"Chats"} component={ChatList} />
      <Drawer.Screen name={"Records"} component={RecordList} />
      <Drawer.Screen name={"My Profile"} component={ProfileDetail}/>
      <Drawer.Screen name={"Logout"} component={Logout}/>
    </Drawer.Navigator>
  );
};

export default SideBar;
