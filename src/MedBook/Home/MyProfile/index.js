import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfile from "./ProfileDetails";

const Stack = createNativeStackNavigator();

const ProfileScreens = () => {

  return (
    <Stack.Group>
      <Stack.Screen name="my-profile" component={MyProfile} />
    </Stack.Group>
  );
  
};

export default ProfileScreens;