import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { addNewRecordAction } from "../../../Actions/recordActions";
// import {useToast } from "react-native-fast-toast";
import React from "react";

const AddNewRecord = ({ navigation }) => {
  const [item, setItem] = useState();
  // const Toast =useToast();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 8,
        backgroundColor: "rgba(28,53,32,0.09)",
      }}
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          borderWidth: 2,
          borderColor: "lightgray",
          padding: 4,
        }}
      >
        <Picker
          selectedValue={item?.type}
          onValueChange={(itemValue) => {
            setItem({ ...item, type: itemValue });
          }}
          style={{ backgroundColor: "", marginTop: 8, width: 230 }}
        >
          <Picker.Item
            label="Choose Record Type"
            value="Choose Record Type"
            enabled={false}
          />
          <Picker.Item label="Blood Sugar Level" value="Blood Sugar Level" />
          <Picker.Item label="Blood Pressure" value="Blood Pressure" />
          <Picker.Item label="Temperature" value="Temperature" />
        </Picker>
        <TextInput
          style={{
            backgroundColor: "#fff2f2f2",
            borderRadius: 4,
            marginTop: 4,
            height: 32,
          }}
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
            onPress={() => {
              addNewRecordAction({ ...item, date: new Date() });
              toast.show("Record Added Successfully",{type:"success",duration:2000})
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
