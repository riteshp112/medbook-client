import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import React from "react";
const Logout = ({ navigation }) => {
  AsyncStorage.removeItem("token").then(navigation.navigate("authenticator"));
  return <View></View>;
};

export default Logout;
