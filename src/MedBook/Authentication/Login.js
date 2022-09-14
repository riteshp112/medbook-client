import { View, TextInput, Text, Button, Modal } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TouchableOpacity } from "react-native";
import medFetch from "../../Actions/medFetchAction";
import React from "react";
// import {useToast } from "react-native-fast-toast";
const Login = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const {navigation} =props;
  // const Toast =useToast()
  const loginPressed = async () => {
    // @ts-ignore
    let {response:result}= await medFetch({type:'select',table:'testcol',condition:{username, password },limit:1});  
    setModalVisible(false)
    if(result.length==0)
      toast.show("Invalid Username Or Password",{type:'danger',duration:2000})
    else{
      AsyncStorage.setItem("locuser",JSON.stringify(result[0]))
      navigation.navigate("SideMenu")
    }
  }
  return (
    <View>
      <TextInput
        onChangeText={value => setUserName(value)}
        placeholder={"Username or Email"}
        style={{ borderWidth: 2 ,marginBottom:4}}
      ></TextInput>
      <TextInput
        onChangeText={value => setPassword(value)}
        placeholder={"Password"}
        secureTextEntry={true}
        style={{ borderWidth: 2, marginBottom:4 }}
      ></TextInput>
      <TouchableOpacity style={{marginBottom:4}}
        onPress={() => {
          toast.show("Send an email at riteshp112@gmail.com to recover your account.",{type:'normal',duration:4000});
        }}
      >
        <Text> Forget Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginBottom:4}}
        onPress={() => {
          navigation.navigate("signup")
        }}
      >
        <Text> Sign Up</Text>
      </TouchableOpacity>
      <Button
        title={"Sign In"}
        onPress={() => {
          setModalVisible(true);
          loginPressed();
        }}
      ></Button>
      <Modal animationType="slide" transparent={true} visible={modalVisible} style={{}}>
        <Text
          style={{
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            top: 200,
            color: "blue",
            textAlign: "center",
            alignItems: "center",
            shadowColor: "#000",
            fontSize: 45,
            shadowOffset: {
              width: 0,
              height: 2
            }
          }}
        >
          {" "}
          Please Wait{" "}
        </Text>
      </Modal>
    </View>
  );
};
export { Login };
