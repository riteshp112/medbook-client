import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { addNewRecordAction } from "../../../Actions/recordActions";
// import {useToast } from "react-native-fast-toast";
import React from "react";
import { signUpStyle } from "../../Authentication/SignUp";

const AddNewRecord = ({ navigation }) => {
  const [item, setItem] = useState({
    type: "",
    val: ""
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(28,53,32,0.09)",
      }}
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 4,
          width: "95%",
          alignSelf: "center",
        }}
      >
        <View
          style={signUpStyle.formPickerStyle}>
          <Picker
            onValueChange={(itemValue) => {
              setItem({ ...item, type: itemValue });
            }}
            selectedValue={item?.type}
            style={{ left: -8, color: item.type == "" ? '#8e8e8e' : void 0, borderWidth: 0, backgroundColor: 'rgba(1,1,1,0)' }}
          >
            <Picker.Item
              label="Choose Record Type"
              value=""
              enabled={false}
            />
            <Picker.Item label="Blood Sugar Level" value="Blood Sugar Level" />
            <Picker.Item label="Blood Pressure" value="Blood Pressure" />
            <Picker.Item label="Temperature" value="Temperature" />
          </Picker>
        </View>
        <TextInput
          style={signUpStyle.formTextInputStyle}
          onChangeText={(value) => setItem({ ...item, val: value })}
          placeholder="Enter Value"
        ></TextInput>
        <View
          style={{
            paddingTop: 8,
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-evenly",
            alignSelf: "center",
          }}
        >
          <Button
            title="Add"
            disabled ={!item.type.length || !item.val.length}
            onPress={() => {
              addNewRecordAction({ ...item, date: new Date() });
              toast.show("Record Added Successfully", {
                type: "success",
                duration: 2000,
              });
              navigation.goBack();
            }}
          ></Button>
          <Button title="Cancel" onPress={() => navigation.goBack()}></Button>
        </View>
      </View>
    </View>
  );
};

export default AddNewRecord;
