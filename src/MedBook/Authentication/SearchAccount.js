// @ts-nocheck
import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import medFetch from "../../Actions/medFetchAction";
import ActivityIndicator from "../../Components/ActivityIndicator";
import { loadingIcon } from "../../Images";
import { validateEmail } from "../../Utils/appUtility";
import { signUpStyle } from "./SignUp";

const verifyAndSendOtp = async ({ email, navigation, setModalVisible }) => {
  let condition;
  if (validateEmail(email)) {
    condition = {
      email,
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
  if (response) {
    if (response.length) {
      if (response[0].email) {
        toast.show("Sending OTP !", { type: "normal", duration: 4000 });
        navigation.navigate("otp-screen", { user: response[0] });
      } else {
        toast.show("There is no email associated with your account.", {
          type: "danger",
          duration: 5000,
        });
      }
    } else {
      toast.show("No such user Found.", { type: "danger", duration: 3000 });
    }
  }
};
const SearchAccount = (props) => {
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1, padding: 8, backgroundColor: '#ffffff' }}>
      <TextInput
        value={email}
        onChangeText={(value) => setEmail(value)}
        style={StyleSheet.compose(signUpStyle.formTextInputStyle, { marginBottom: 2 })}
        placeholder={"Enter Your Email Or Username To Find Your Account"}
      ></TextInput>
      <Button
        title={"Send Otp"}
        onPress={() => verifyAndSendOtp({ email, setModalVisible, ...props })}
      />
      <ActivityIndicator
        modalVisible={modalVisible}
        loadingIcon={loadingIcon}
        containerStyle={{ backgroundColor: 'rgba(1,1,1,0.1)', flex: 1 }}
      />
    </View>
  );
};

export default SearchAccount;
