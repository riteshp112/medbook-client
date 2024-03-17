// @ts-nocheck
import { Picker } from "@react-native-picker/picker";
import moment from "moment";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import medFetch from "../../Actions/medFetchAction";
import ActivityIndicator from "../../Components/ActivityIndicator";
import DatePicker from "../../Components/DatePicker";
import { loadingIcon } from "../../Images";
import { validateEmail } from "../../Utils/appUtility";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setdob] = useState();
  const [email, setEmail] = useState("");
  const [canResendOtpIn, setCanResendOtpIn] = useState(0);

  const countDownHandler = () => {
    setCanResendOtpIn((prev) => {
      if (prev > 0) {
        setTimeout(() => countDownHandler(), 1000);
        return prev - 1;
      }
      return prev;
    });
  };

  const saveUser = async () => {
    setLoading(true);
    const result = await medFetch({
      type: "select",
      table: "testcol",
      condition: { username },
      limit: 1,
      skip: 0,
    });
    if (result) {
      if (result?.length != 0)
        toast.show("Username Already Exists", {
          type: "danger",
          duration: 1500,
        });
      else {
        await medFetch({
          type: "insert",
          table: "testcol",
          data: { name, username, password, gender, dob, email },
        });
        toast.show("Sign Up Successful", { type: "success", duration: 1500 });
        props?.navigation.navigate("login");
      }
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 8, backgroundColor:colors.background, gap: 4 }}>
      <TextInput
        style={signUpStyle.formTextInputStyle}
        placeholder={"Name"}
        value={name}
        onChangeText={(value) => setName(value)}
      />

      <TextInput
        style={{ ...signUpStyle.formTextInputStyle }}
        placeholder={"Email"}
        value={email}
        keyboardType={"email-address"}
        type="email"
        onChangeText={(value) => {
          setEmail(value);
          setUserName(value.split("@")[0]);
        }}
      />

      <TextInput
        style={signUpStyle.formTextInputStyle}
        onChangeText={(value) => setUserName(value)}
        placeholder={"Username"}
        value={username}
      />
      <TextInput
        style={signUpStyle.formTextInputStyle}
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
        placeholder={"Password"}
      />
      <View style={signUpStyle.formPickerStyle}>
        <Picker
          onValueChange={(itemValue) => {
            setGender(itemValue);
          }}
          selectedValue={gender}
          style={{
            left: -8,
            color: gender == "" ? "#8e8e8e" : void 0,
            borderWidth: 0,
            outline: "none",
            backgroundColor: "rgba(1,1,1,0)",
          }}
        >
          <Picker.Item value="" label="Select Your Gender" enabled={false} />
          <Picker.Item value="M" label="Male" />
          <Picker.Item value="F" label="Female" />
          <Picker.Item value="L" label="Lesbian" />
          <Picker.Item value="G" label="Gay" />
          <Picker.Item value="B" label="Bisexual" />
          <Picker.Item value="T" label="Transgender" />
          <Picker.Item value="Q" label="Queer" />
          <Picker.Item value="Other" label="Other" />
        </Picker>
      </View>
      <DatePicker
        onChange={(value) => {
          setdob(value);
        }}
        value={dob}
        style={{ ...signUpStyle.formTextInputStyle }}
        placeholder={"DOB"}
      />
      <Button
        title={"Sign UP"}
        onPress={() => {
          if (name.length == 0)
            toast.show("Name can't be empty.", {
              type: "warning",
              duration: 2000,
            });
          else if (!validateEmail(email)) {
            toast.show("Email not valid !", {
              type: "warning",
              duration: 2000,
            });
          } else if (username.length < 6)
            toast.show("Username must contain at least 6 characters", {
              type: "warning",
              duration: 2000,
            });
          else if (password.length < 8)
            toast.show("Password length must be greater than 8 characters.", {
              type: "warning",
              duration: 2000,
            });
          else if (!gender || gender.length == 0)
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
      />
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
        />
      </View>
      <ActivityIndicator
        containerStyle={{ height: "100%", backgroundColor: "rgba(1,1,0,0.1)" }}
        modalVisible={loading}
        loadingIcon={loadingIcon}
      />
    </View>
  );
};

export const signUpStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInputStyle: {
    borderWidth: 1,
    marginTop: 2,
    height: 45,
    borderRadius: 4,
    borderColor: "lightgray",
    backgroundColor: "#ebedf0",
    paddingLeft: 8,
    paddingRight: 8,
    border: "1px solid lightgray",
  },
  formPickerStyle: {
    borderWidth: 1,
    marginTop: 2,
    height: 45,
    borderRadius: 4,
    borderColor: "lightgray",
    backgroundColor: "#ebedf0",
    justifyContent: "center",
  },
});
export default SignUp;
