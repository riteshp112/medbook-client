import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import medFetch from "../../../Actions/medFetchAction";
import React from "react";
import { getUser } from "../../Authentication/Authenticator";
import { signUpStyle } from "../../Authentication/SignUp";

const AddNewChat = (props) => {
  const [query, setQuery] = useState("");
  const [pickerItems, setPickerItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [userIndex, setUserIndex] = useState(-1);
  const sender = getUser();

  useEffect(() => {
    const items = [
      <Picker.Item
        key={0}
        label={"Select User"}
        value={"Select User"}
      ></Picker.Item>,
    ];
    setLoading(true);
    medFetch({
      type: "select",
      table: "testcol",
      condition: { name: { $regex: "^" + query, $options: "i" } },
      limit: 30,
    }).then((result) => {
      setUser(result);
      result?.map((item) => {
        items.push(
          <Picker.Item
            key={item?._id}
            label={item?.name}
            value={item?.name}
          ></Picker.Item>
        );
      });
      setPickerItems(items);
      setLoading(false);
    });
  }, [query]);

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
        <TextInput
          style={StyleSheet.compose(signUpStyle.formTextInputStyle, {
            marginBottom: 2,
          })}
          onChangeText={(itemValue) => {
            setQuery(itemValue);
          }}
          placeholder={"Search Friends"}
        ></TextInput>
        <View style={signUpStyle.formPickerStyle}>
          <Picker
            selectedValue={user?.[userIndex]?.name}
            onValueChange={(item, index) => {
              setUserIndex(index - 1);
            }}
            style={{
              left: -8,
              color: userIndex == -1 ? "#8e8e8e" : void 0,
              borderWidth: 0,
              backgroundColor: "rgba(1,1,1,0)",
            }}
          >
            {pickerItems}
          </Picker>
        </View>
        {loading ? (
          <ActivityIndicator
            style={{ position: "absolute", alignSelf: "center" }}
          ></ActivityIndicator>
        ) : (
          void 0
        )}
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
            disabled={userIndex == -1}
            title="Start Chatting"
            onPress={async () => {
              await medFetch({
                type: "insert",
                table: "threads",
                data: {
                  sender: sender,
                  receiver: user?.[userIndex],
                  chatHistory: [],
                },
              });
              props?.navigation?.goBack();
            }}
          />
          <Button title="Cancel" onPress={() => props?.navigation?.goBack()} />
        </View>
      </View>
    </View>
  );
};

export default AddNewChat;
