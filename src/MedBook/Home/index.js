import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreens from "./Chats";
import HomeTabs from "./HomeTabs";
import ProfileScreens from "./MyProfile";
import PostScreens from "./Posts";
import RecordScreens from "./Records";

const Stack = createNativeStackNavigator();

const HomeScreens = () => {
  return (
    <Stack.Group 
    >
      {PostScreens()}
      {ChatScreens()}
      {RecordScreens()}
      {ProfileScreens()}
      <Stack.Screen name="home-tabs" component={HomeTabs} options={{header:()=>null}}/>
    </Stack.Group>
  );
};

export default HomeScreens;
