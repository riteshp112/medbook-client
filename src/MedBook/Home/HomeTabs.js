import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatList from "./Chats/ChatLists";
import PostList from "./Posts/PostLists";
import RecordList from "./Records/RecordLists";
import React from "react";
import { addFileBlue, record, tabChatBlue } from "../../Images";
import { Image } from "react-native";
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ header: () => null }}>
      <Tab.Screen
        name="Posts"
        component={PostList}
        options={{
          tabBarIcon: ({ size }) => {
            return (
              <Image
                source={addFileBlue}
                style={{
                  width: size,
                  height: size,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatList}
        options={{
          tabBarIcon: ({ size }) => {
            return (
              <Image
                source={tabChatBlue}
                style={{
                  width: size,
                  height: size,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Records"
        component={RecordList}
        options={{
          tabBarIcon: ({ size }) => {
            return (
              <Image
                source={record}
                style={{
                  width: size,
                  height: size,
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
