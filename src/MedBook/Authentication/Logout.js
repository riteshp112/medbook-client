import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { View } from "react-native";
import React from "react";
const Logout = ({ navigation }) => {
  useEffect(() => {
    (async () => await AsyncStorage.removeItem("locuser"))();
  }, []);
  navigation.navigate("login");
  return <View></View>;
};

export default Logout;
