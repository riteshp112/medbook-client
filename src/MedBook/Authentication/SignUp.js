// @ts-nocheck
import moment from "moment";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ToastAndroid,
} from "react-native";
import medFetch from "../../Actions/medFetchAction";
import { Picker } from "@react-native-picker/picker";
import ActivityIndicator from "../../Components/ActivityIndicator";
import { loadingIcon } from "../../Images";
const SignUp = (props) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setdob] = useState("");
  const saveUser = async () => {
    setLoading(true);
    const { response } = await medFetch({
      type: "select",
      table: "testcol",
      condition: { username },
      limit: 1,
    });
    if (response) {
      if (response?.length != 0)
        toast.show("Username Already Exists", {
          type: "danger",
          duration: 1500,
        });
      else {
        medFetch({
          type: "insert",
          table: "testcol",
          data: { name, username, password, gender, dob },
        });
        toast.show("Sign Up Successful", { type: "success", duration: 1500 });
        props?.navigation.navigate("login");
      }
    }
    setLoading(false);
  };
  return (
    <View>
      <Text>Name:</Text>
      <TextInput
        style={{ borderWidth: 2, marginTop: 2, height: 25 }}
        onChangeText={(value) => setName(value)}
      ></TextInput>
      <Text>Username</Text>
      <TextInput
        style={{ borderWidth: 2, marginTop: 2, height: 25 }}
        onChangeText={(value) => setUserName(value)}
      ></TextInput>
      <Text>Password</Text>
      <TextInput
        style={{ borderWidth: 2, marginTop: 2, height: 25 }}
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
      ></TextInput>
      <Text>Gender</Text>
      <Picker onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
        <Picker.Item value="" label="Select Your Gender"></Picker.Item>
        <Picker.Item value="M" label="M"></Picker.Item>
        <Picker.Item value="F" label="F"></Picker.Item>
      </Picker>
      <Text>Dob</Text>
      <TextInput
        value={dob}
        keyboardType={"numbers-and-punctuation"}
        maxLength={10}
        style={{ borderWidth: 2, marginTop: 2, height: 25 }}
        onChangeText={(value) => {
          if (value.length == 2 || value.length == 5) value = value + "/";
          setdob(value);
        }}
        placeholder={"MM/DD/YYYY"}
      ></TextInput>
      <Button
        title={"Sign UP"}
        onPress={() => {
          if (name.length == 0)
            toast.show("Name can't be empty.", {
              type: "warning",
              duration: 2000,
            });
          else if (username.length < 6)
            toast.show("Username must contain at least 6 characters", {
              type: "warning",
              duration: 2000,
            });
          else if (password.length < 8)
            toast.show("Password length must be greater than 8 characters.", {
              type: "warning",
              duration: 2000,
            });
          else if (gender.length == 0)
            toast.show("Please select gender.", {
              type: "warning",
              duration: 2000,
            });
          else if (moment(dob).isValid() == false)
            toast.show("Invalid date of birth.", {
              type: "warning",
              duration: 2000,
            });
          else saveUser();
        }}
      ></Button>
      <View
        style={{
          flexDirection: "row",
          marginTop: 16,
          justifyContent: "center",
        }}
      >
        <Text style={{ marginTop: 10 }}>Already on MedBook? </Text>
        <Button
          title={"Login"}
          onPress={() => props?.navigation.navigate("login")}
        ></Button>
      </View>
      <ActivityIndicator
        containerStyle={{ height: "100%", backgroundColor: "rgba(1,1,0,0.1)" }}
        modalVisible={loading}
        loadingIcon={loadingIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SignUp;
