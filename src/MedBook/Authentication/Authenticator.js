import { View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

let user = void 0;

export const getUser = () => {
  return user;
};

const Authenticator = ({ navigation }) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    AsyncStorage.getItem("locuser").then((res) => {
      if (res) {
        user = JSON.parse(res);
        navigation.navigate("SideMenu");
      } else {
        navigation.navigate("login");
      }
    });
  }, [isFocused]);
  return <View></View>;
};
export default Authenticator;
