import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatList from "./Chats/ChatLists";
import ProfileDetail from "./MyProfile/ProfileDetails";
import PostList from "./Posts/PostLists";
import RecordList from "./Records/RecordLists";
import React from "react";
import { getUser } from "../Authentication/Authenticator";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabs = () => {
  const user = getUser();
  return (
    <Tab.Navigator screenOptions={{ header: () => null }}>
      <Tab.Screen name="Posts" component={PostList} options={{ tabBarBadge: '10', tabBarBadgeStyle: { maxWidth: 40 } }} />
      <Tab.Screen name="Chat" component={ChatList} />
      <Tab.Screen name="Records" component={RecordList} />
      <Tab.Screen name="Profile" component={ProfileDetail} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
