import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogoTitle from "../../../Components/LogoTitle";
import AddNewChat from "./ChatForms";
import ChatItem from "./ChatItems";
import ChatList from "./ChatLists";
import React from "react";
import ChatDetails from "./ChatDetails";

const Stack = createNativeStackNavigator();

const ChatScreens = () => {
  return (
    <Stack.Group>
      <Stack.Screen name="chat-item" component={ChatItem} />
      <Stack.Screen
        name="add-new-chat"
        component={AddNewChat}
        options={{ presentation: "transparentModal", headerShown: false }}
      />
      <Stack.Screen name="chat-list" component={ChatList} />
      <Stack.Screen
        name="Chat-Details"
        component={ChatDetails}
        options={{ title: "Chat " }}
      />
    </Stack.Group>
  );
};

export default ChatScreens;
