import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChatDetails from "./ChatDetails";
import AddNewChat from "./ChatForms";
import ChatItem from "./ChatItems";
import ChatList from "./ChatLists";

const Stack = createNativeStackNavigator();

const ChatScreens = (
  <Stack.Group>
    <Stack.Screen name="chat-item" component={ChatItem} />
    <Stack.Screen
      name="add-new-chat"
      component={AddNewChat}
      options={{
        presentation: "transparentModal",
        headerShown: false,
        contentStyle: {
          justifyContent: "flex-end",
        },
      }}
    />
    <Stack.Screen name="chat-list" component={ChatList} />
    <Stack.Screen
      name="chat-details"
      component={ChatDetails}
      options={{ title: "Chat " }}
    />
  </Stack.Group>
);

export default ChatScreens;
