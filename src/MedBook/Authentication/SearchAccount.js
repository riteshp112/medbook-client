// @ts-nocheck
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import medFetch from "../../Actions/medFetchAction";
import ActivityIndicator from "../../Components/ActivityIndicator";
import { loadingIcon } from "../../Images";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const verifyAndSendOtp = async ({ email, navigation, setModalVisible }) => {
  let condition;
  if (validateEmail(email)) {
    condition = {
      email: "email",
    };
  } else {
    condition = {
      username: email,
    };
  }
  setModalVisible(true);
  const { response } = await medFetch({
    type: "select",
    table: "testcol",
    condition,
    limit: 1,
  });
  setModalVisible(false);
  if (response.length) {
    if (response[0].email) {
      toast.show("Sending OTP !", { type: "normal", duration: 4000 });
      navigation.navigate("otp-screen", { user: response[0]});
    } else {
      toast.show("There is no email associated with your account.", {
        type: "danger",
        duration: 5000,
      });
    }
  } else {
    toast.show("No such user Found.", { type: "danger", duration: 3000 });
  }
};
const SearchAccount = (props) => {
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Text>Enter Your Email Or Username To Find Your Account</Text>
      <TextInput
        value={email}
        onChangeText={(value) => setEmail(value)}
        style={{ height: 30, backgroundColor: "lightgray", borderWidth: 1 }}
      ></TextInput>
      <Button
        title={"Send Otp"}
        onPress={() => verifyAndSendOtp({ email, setModalVisible, ...props })}
      />
      <ActivityIndicator
        modalVisible={modalVisible}
        loadingIcon={loadingIcon}
        containerStyle={{backgroundColor:'rgba(1,1,1,0.1)',flex:1}}
      />
    </View>
  );
};

export default SearchAccount;
