import { View, TextInput, Text, Button, Modal } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TouchableOpacity } from "react-native";
import medFetch from "../Actions/fetch";
import Post from "./Post";
const Login = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const loginPressed = () => {
    let result;
    medFetch({type:'select',table:'testcol',condition:{username, password },limit:1}).then(data=>data.json()).then(json=>{result=json.response  
    setModalVisible(false)
    if(result.length==0)
      alert("Invalid Username Or Password")
    else{
      AsyncStorage.setItem("locuser",JSON.stringify(result[0]))
      props?.setUser(result[0])
      props.setContent(<Post></Post>)
    }
  })};
  return (
    <View>
      <TextInput
        onChangeText={value => setUserName(value)}
        placeholder={"Username or Email"}
        style={{ borderWidth: 2 }}
      ></TextInput>
      <TextInput
        onChangeText={value => setPassword(value)}
        placeholder={"Password"}
        secureTextEntry={true}
        style={{ borderWidth: 2, marginTop: 2 }}
      ></TextInput>
      <TouchableOpacity
        onPress={() => {
          alert("Send an e-mail at riteshp112@gmail.com to recover your account.");
        }}
      >
        <Text> Forget Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.signup(true);
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
