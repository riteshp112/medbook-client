import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, ToastAndroid } from "react-native";
import medFetch from "../../Actions/medFetchAction";
import { Picker } from "@react-native-picker/picker";
import SimpleToast from "react-native-simple-toast";
const SignUp = (props) => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setdob] = useState("");
  const saveUser = async () => {
    const json = await medFetch({
      type: "select",
      table: "testcol",
      condition: { username },
      limit: 1,
    });
    console.log(json);
    if (json?.response.length != 0) 
        SimpleToast.show("Username Already Exists")
    else {
      medFetch({
        type: "insert",
        table: "testcol",
        data: { name, username, password, gender, dob },
      });
      SimpleToast.show("Sign Up Success")
      props?.navigation.navigate("login")
    }
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
          if (name.length == 0) alert("Name can't be empty.");
          else if (username.length < 6)
            alert("Username must contain at least 6 characters");
          else if (password.length < 8)
            alert("Password length must be greater than 8 characters.");
          else if (gender.length == 0) alert("Please select gender.");
          else if (moment(dob).isValid() == false)
            alert("Invalid date of birth.");
          else saveUser({ signsuccess: props.signsuccess });
        }}
      ></Button>
      <View
        style={{
          flexDirection: "row",
          marginTop: 16,
          justifyContent: "center",
        }}
      >
        <Text style={{ marginTop: 10 }}>Already have a Account? </Text>
        <Button
          title={"Login"}
          onPress={() => props?.navigation.navigate("login")}
        ></Button>
      </View>
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
