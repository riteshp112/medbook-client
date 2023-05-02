import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfile from "./ProfileDetails";
import React from "react";
const Stack = createNativeStackNavigator();

const ProfileScreens = () => {

  return (
    <Stack.Group>
      <Stack.Screen name="my-profile" component={MyProfile} options={{title:'Profile'}}/>
    </Stack.Group>
  );
  
};

export default ProfileScreens;