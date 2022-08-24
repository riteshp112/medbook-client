import { View } from "react-native";
import getUser from "../../Actions/getUserAction";
import React from "react";
const Authenticator = ({ navigation }) => {
  const user = getUser();
  setTimeout(() => {
    if (user?.name) {
      navigation.navigate("SideMenu");
    } else {
      navigation.navigate("login");
    }
  },0);
  return <View></View>;
};
export default Authenticator;
