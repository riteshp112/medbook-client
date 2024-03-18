import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import medFetch from "../../../Actions/medFetchAction";
import { getUser } from "../../Authentication/Authenticator";
import { signUpStyle } from "../../Authentication/SignUp";
import { useTheme } from "@react-navigation/native";

const AddNewRecord = ({ navigation }) => {
  const [item, setItem] = useState({
    type: "",
    val: "",
  });
  const user = getUser();
  const { colors } = useTheme();
  return (
    <View
      style={{
        borderTopColor: "lightgray",
        borderTopWidth: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderStyle: "solid",
        backgroundColor:colors.background,
        padding:8
      }}
    >
      <View style={signUpStyle.formPickerStyle}>
        <Picker
          onValueChange={(itemValue) => {
            setItem({ ...item, type: itemValue });
          }}
          selectedValue={item?.type}
          style={{
            left: -8,
            color: item.type == "" ? "#8e8e8e" : void 0,
            borderWidth: 0,
            backgroundColor: "rgba(1,1,1,0)",
            outline:'none'
          }}
        >
          <Picker.Item label="Choose Record Type" value="" enabled={false} />
          <Picker.Item label="Blood Sugar Level" value="Blood Sugar Level" />
          <Picker.Item label="Blood Pressure" value="Blood Pressure" />
          <Picker.Item label="Temperature" value="Temperature" />
        </Picker>
      </View>
      <TextInput
        style={signUpStyle.formTextInputStyle}
        onChangeText={(value) => setItem({ ...item, val: value })}
        placeholder="Enter Value"
      />
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
          disabled={!item.type.length || !item.val.length}
          onPress={async () => {
            await medFetch({
              type: "insert",
              table: "records",
              data: {
                ...item,
                date: new Date(),
                user: user._id,
              },
            });
            toast.show("Record Added Successfully", {
              type: "success",
              duration: 2000,
            });
            navigation.goBack();
          }}
        />
        <Button title="Cancel" onPress={navigation.goBack} />
      </View>
    </View>
  );
};

export default AddNewRecord;
