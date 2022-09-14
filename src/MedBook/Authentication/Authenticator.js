import { View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

let user = void 0;

export const getUser = () => {
  return user;
};

const Authenticator = ({ navigation }) => {
  AsyncStorage.getItem("locuser").then((res) => {
    if (res) {
      user = JSON.parse(res);
      navigation.navigate("SideMenu");
    } else {
      navigation.navigate("login");
    }
  });
  return <View></View>;
};
export default Authenticator;
