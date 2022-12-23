import { View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import medFetch from "../../Actions/medFetchAction";

let user = void 0;

export const getUser = () => {
  return user;
};

const Authenticator = ({ navigation }) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem("token").then((token) => {
        if (token) {
          medFetch({ type: "authenticateUser", token: token }).then(
            (result) => {
              if (result && result?.length > 0) {
                user = result[0];
                navigation.navigate("SideMenu");
              } else navigation.navigate("login");
            }
          );
        } else {
          navigation.navigate("login");
        }
      });
    }
  }, [isFocused]);
  return <View></View>;
};
export default Authenticator;
