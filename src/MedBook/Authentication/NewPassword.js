// @ts-nocheck
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import medFetch from "../../Actions/medFetchAction";

const NewPassword = ({ route, navigation }) => {
  const [password1, setpassword1] = useState("");
  const [password2, setpassword2] = useState("");
  const { user } = route.params;
  return (
    <View>
      <TextInput
        placeholder={"Enter New OTP"}
        value={password1}
        onChangeText={(val) => setpassword1(val)}
        autoFocus={true}
        onBlur={() => {
          if (password1.length < 8) {
            toast.show("Password must be greater than 8 characters", {
              type: "warning",
              duration: 4000,
            });
          }
        }}
        style={{
          height: 30,
          borderWidth: 1,
          backgroundColor: "lightgray",
        }}
      ></TextInput>
      <TextInput
        placeholder={"Confirm New OTP"}
        value={password2}
        onChangeText={(val) => setpassword2(val)}
        onBlur={() => {
          if (password1 !== password2) {
            toast.show("Passwords do not match", {
              type: "warning",
              duration: 4000,
            });
          }
        }}
        style={{
          height: 30,
          paddingTop: 8,
          borderWidth: 1,
          backgroundColor: "lightgray",
        }}
      ></TextInput>
      <Button
        title={" Update Password"}
        onPress={async () => {
          if (password1.length >= 8 && password1 == password2) {
            await medFetch({
              type: "update",
              table: "testcol",
              id: user._id,
              changes: { password: password1 },
            });
            toast.show("Password Updated Successfully", {
              type: "success",
              duration: 2000,
            });
            navigation.navigate("authenticator");
          }
        }}
      />
    </View>
  );
};

export default NewPassword;
