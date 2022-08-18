import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddNewChat from "./ChatForms";
import ChatItem from "./ChatItems";
import ChatList from "./ChatLists";

const Stack = createNativeStackNavigator();

const ChatScreens = () => {

  return (
    <Stack.Group>
      <Stack.Screen name="chat-item" component={ChatItem} />
      <Stack.Screen
        name="add-new-chat"
        component={AddNewChat}
        options={{ presentation: "transparentModal" }}
      />
      <Stack.Screen name="chat-list" component={ChatList} />
    </Stack.Group>
  );

};

export default ChatScreens;
