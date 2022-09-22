// @ts-nocheck
import { View, TextInput, Text, Button, Modal } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import medFetch from "../../Actions/medFetchAction";
import React from "react";
import ActivityIndicator from "../../Components/ActivityIndicator";
import { loadingIcon } from "../../Images";
// import {useToast } from "react-native-fast-toast";
const Login = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { navigation } = props;
  // const Toast =useToast()
  const loginPressed = async () => {
    // @ts-ignore
    setModalVisible(true);
    let { response: result } =
      (await medFetch({
        type: "select",
        table: "testcol",
        condition: { username, password },
        limit: 1,
      })) || {};
    setModalVisible(false);
    if (result && result.length > 0) {
      AsyncStorage.setItem("locuser", JSON.stringify(result[0])).then(() =>
        navigation.navigate("authenticator")
      );
    } else if (result) {
      toast.show("Invalid Username Or Password", {
        type: "danger",
        duration: 2000,
      });
    }
  };
  return (
    <View>
      <TextInput
        onChangeText={(value) => setUserName(value)}
        placeholder={"Username or Email"}
        style={{ borderWidth: 2, marginBottom: 4 }}
      ></TextInput>
      <TextInput
        onChangeText={(value) => setPassword(value)}
        placeholder={"Password"}
        secureTextEntry={true}
        style={{ borderWidth: 2, marginBottom: 4 }}
      ></TextInput>
      <TouchableOpacity
        style={{ marginBottom: 4 }}
        onPress={() => {
          navigation.navigate('search-account',{
            email: username,
          })
        }}
      >
        <Text> Forget Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginBottom: 4 }}
        onPress={() => {
          navigation.navigate("signup");
        }}
      >
        <Text> Sign Up</Text>
      </TouchableOpacity>
      <Button
        title={"Sign In"}
        onPress={() => {
          loginPressed();
        }}
      ></Button>
      <ActivityIndicator
        containerStyle={{ height: "100%", backgroundColor: "rgba(1,1,0,0.1)" }}
        modalVisible={modalVisible}
        loadingIcon={loadingIcon}
      />
    </View>
  );
};
export { Login };
