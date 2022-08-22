import { View } from "react-native";
import getUser from "../../Actions/getUserAction";
import React from "react";
const Authenticator = ({ navigation }) => {
  const user = getUser();
  if (user.name) {
    console.log(user.name)
    navigation.navigate("SideMenu");
  } else {
    navigation.navigate("login");
  }
  return <View></View>;
};
export default Authenticator;
