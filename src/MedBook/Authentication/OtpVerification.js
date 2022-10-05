// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import medFetch from "../../Actions/medFetchAction";
import sendMailAction from "../../Actions/sendMailAction";
import ActivityIndicator from "../../Components/ActivityIndicator";
import { loadingIcon } from "../../Images";
import { signUpStyle } from "./SignUp";

const validateOtp = async ({ inputOtp, navigation, user, setModalVisible }) => {
  setModalVisible(true);
  const { response } = await medFetch({
    type: "select",
    table: "testcol",
    condition: { username: user.username, otp: parseInt(inputOtp) },
    limit: 1,
  });
  setModalVisible(false);
  if (response) {
    if (response.length !== 0) {
      navigation.navigate("new-password-screen", { user: user });
    } else {
      toast.show("Wrong Otp !");
    }
  }
};

const OtpVerification = ({ route, navigation, ...resprops }) => {
  const { user } = route.params;
  const [inputOtp, setInputOtp] = useState("");
  const otp = parseInt(Math.random() * 1000000);
  const name = "User";
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    sendMailAction({
      subject: "Otp For Account Verification",
      sender: { name: "Ritesh Patel", email: "riteshp112@gmail.com" },
      reply_to: { name: "Ritesh Patel", email: "riteshp112@gmail.com" },
      html_content: `<html><body>Dear ${name}, </b> Your Otp to verify your email at MedBook is ${otp} </body></html>`,
      to: [{ name, email: user.email }],
      params: "",
      headers: "",
      cc: "",
      bcc: "",
    });
    medFetch({
      type: "update",
      table: "testcol",
      id: user._id,
      changes: { $set: { otp: otp } },
    });
  }, []);

  return (
    <View style={{ flex: 1, padding: 8, backgroundColor: '#ffffff' }}>
      <TextInput
        value={inputOtp}
        onChangeText={(val) => {
          setInputOtp(val);
        }}
        style={StyleSheet.compose(signUpStyle.formTextInputStyle, { marginBottom: 2 })}
        placeholder={`Enter the otp send to ${user.email}`}
      ></TextInput>
      <Button
        title="Validate"
        onPress={() =>
          validateOtp({ inputOtp, navigation, user, setModalVisible })
        }
      ></Button>
      <ActivityIndicator
        modalVisible={modalVisible}
        loadingIcon={loadingIcon}
        containerStyle={{ backgroundColor: "rgba(1,1,1,0.1)", flex: 1 }}
      />
    </View>
  );
};

export default OtpVerification;
