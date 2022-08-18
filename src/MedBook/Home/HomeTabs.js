import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatList from "./Chats/ChatLists";
import ProfileDetail from "./MyProfile/ProfileDetails";
import PostList from "./Posts/PostLists";
import RecordList from "./Records/RecordLists";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabs = () => {
  return (
      <Tab.Navigator >
        <Tab.Screen name="Posts" component={PostList} />
        <Tab.Screen name="Chat" component={ChatList} />
        <Tab.Screen name="Records" component={RecordList} />
        <Tab.Screen name="Profile" component={ProfileDetail} />
      </Tab.Navigator>
  );
};

export default HomeTabs;
