import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChatComponent from "./ChatItem";
import { defaultAvatar, send } from "../../../Images";
import { getUser } from "../../Authentication/Authenticator";
import { signUpStyle } from "../../Authentication/SignUp";
import { socketURL } from "../../../config";
import { usePost } from "../../../Actions/useFetch";
import List from "../../../Components/MedList";

const renderFooter = ({ route }) => {
  const { item } = route?.params || {};
  const user = getUser();
  const [message, setMessage] = useState("");
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 8,
        gap: 8,
      }}
    >
      <Image
        source={defaultAvatar}
        style={{
          resizeMode: "center",
          height: 32,
          width: 32,
        }}
      />
      <TextInput
        textAlignVertical="bottom"
        multiline={true}
        value={message}
        style={StyleSheet.compose(signUpStyle.formTextInputStyle, {
          flex: 1,
          height: 32,
          textAlignVertical: "bottom",
          verticalAlign: "bottom",
        })}
        onChangeText={(value) => {
          setMessage(value);
        }}
        placeholder={"Enter Message..."}
      />
      <TouchableOpacity
        disabled={!message.trim().length}
        onPress={() => {
          setMessage("");
          usePost({
            uri: "",
            body: {
              type: "insert",
              table: "messages",
              data: {
                thread: item?._id,
                message: message.trim(),
                sender: { username: user?.username },
              },
            },
          });
        }}
      >
        <Image
          source={send}
          style={{
            resizeMode: "center",
            height: 32,
            width: 32,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const ChatDetails = (props) => {
  const {
    route: { params },
  } = props;
  const { item } = params;

  return (
    <List
      hideRowSeparator
      uri=""
      uriParams={{
        type: "select",
        table: "messages",
        condition: {
          thread: item._id,
        },
        limit: 1,
        skip: 0,
      }}
      renderItem={ChatComponent}
      renderFooter={renderFooter}
      initialNumToRender={10}
      {...props}
    />
  );
};

export default ChatDetails;
