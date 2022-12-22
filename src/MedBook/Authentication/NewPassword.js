// @ts-nocheck
import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import medFetch from "../../Actions/medFetchAction";
import { signUpStyle } from "./SignUp";

const NewPassword = ({ route, navigation }) => {
  const [password1, setpassword1] = useState("");
  const [password2, setpassword2] = useState("");
  const { user } = route.params;
  return (
    <View style={{ flex: 1, padding: 8, backgroundColor: "#ffffff" }}>
      <TextInput
        placeholder={"Enter New Password"}
        value={password1}
        onChangeText={(val) => setpassword1(val)}
        autoFocus={true}
        secureTextEntry={true}
        onBlur={() => {
          if (password1.length < 8) {
            toast.show("Password must be greater than 8 characters", {
              type: "warning",
              duration: 4000,
            });
          }
        }}
        style={signUpStyle.formTextInputStyle}
      ></TextInput>
      <TextInput
        placeholder={"Confirm New Password"}
        value={password2}
        secureTextEntry={true}
        onChangeText={(val) => setpassword2(val)}
        onBlur={() => {
          if (password1 !== password2) {
            toast.show("Passwords do not match", {
              type: "warning",
              duration: 4000,
            });
          }
        }}
        style={StyleSheet.compose(signUpStyle.formTextInputStyle, {
          marginBottom: 2,
        })}
      ></TextInput>
      <Button
        title={" Update Password"}
        onPress={async () => {
          if (password1.length >= 8 && password1 == password2) {
            const result = await medFetch({
              type: "update",
              table: "testcol",
              condition: { _id: user._id },
              changes: { $set: { password: password1 } },
            });
            if (result?.matched_count) {
              if (result?.modified_count) {
                toast.show("Password Updated Successfully", {
                  type: "success",
                  duration: 2000,
                });
                navigation.navigate("authenticator");
              } else {
                toast.show("New password can't be same as old password.", {
                  type: "danger",
                  duration: 2000,
                });
              }
            }
          }
        }}
      />
    </View>
  );
};

export default NewPassword;
