// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import medFetch from "../../Actions/medFetchAction";
import sendMailAction from "../../Actions/sendMailAction";
import LogoTitle from "../../Components/LogoTitle";
import { getUser } from "./Authenticator";
const user = getUser();

const validateOtp = async (inputOtp, navigation) => {
  const user = getUser();
  const { response } = await medFetch({
    type: "select",
    table: "testcol",
    condition: { username: user.username, otp: inputOtp },
    limit: 1,
  });
  if (response) {
    if (response.length !== 0) {
      navigation.navigate("new-otp-screen");
    } else {
      toast.show("Wrong Otp !");
    }
  }
};

const OtpVerification = ({ route, navigation, ...resprops }) => {
  const { email } = route.params;
  const [inputOtp, setInputOtp] = useState("");
  const otp = parseInt(Math.random() * 1000000);
  const name="User"
  useEffect(() => {
    sendMailAction({
      subject: "Otp For Account Verification",
      sender: {"name":"Ritesh Patel","email":"riteshp112@gmail.com"},
      reply_to: {"name":"Ritesh Patel","email":"riteshp112@gmail.com"},
      html_content: `<html><body>Dear ${name}, </b> Your Otp to verify your email at MedBook is ${otp} </body></html>`,
      to: [{name,email}],
      params: "",
      headers: "",
      cc: "",
      bcc: "",
    });
  }, []);
  return (
    <View>
      <Text> Enter the otp send to {email}</Text>
      <TextInput
        onChangeText={(val) => {
          setInputOtp(val);
        }}
        style={{
          height: 30,
          width: "100%",
          borderWidth: 1,
          backgroundColor: "lightgray",
        }}
      ></TextInput>
      <Button title="Validate" onClick={() => validateOtp(inputOtp)}></Button>
    </View>
  );
};

export default OtpVerification;
