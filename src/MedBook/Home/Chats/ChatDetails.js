import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChatComponent from "./ChatItem";
import { defaultAvatar, send } from "../../../Images";
import medFetch from "../../../Actions/medFetchAction";
import { getUser } from "../../Authentication/Authenticator";
import { signUpStyle } from "../../Authentication/SignUp";
import { io } from "socket.io-client";
import { socketURL } from "../../../config";

const ChatDetails = ({ route }) => {
  const { item } = route?.params;
  const [chatHistory, setChatHistory] = useState([]);
  const user = getUser();
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const socket = io(socketURL, {
    reconnection: false,
    autoConnect: false,
  });

  socket.on("connect", function () {
    socket.emit("join_thread", { threadId: item._id });
  });

  socket.on("reload_chat", function (data) {
    setRefresh((prev) => !prev);
  });

  useEffect(() => {
    socket.connect();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    medFetch({
      type: "select",
      table: "threads",
      condition: {
        _id: item._id,
      },
      limit: 1,
      skip: 0,
    }).then((thread) => {
      setChatHistory(thread?.[0].chatHistory);
      setIsLoading(false);
    });
  }, [refresh]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <FlatList
        data={chatHistory}
        renderItem={(props) => <ChatComponent {...props} />}
        style={{ flex: 1 }}
      ></FlatList>
      {isLoading ? <ActivityIndicator></ActivityIndicator> : void 0}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 8,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            paddingRight: 8,
          }}
        >
          <Image
            source={defaultAvatar}
            style={{
              resizeMode: "center",
              height: 32,
              width: 32,
            }}
          ></Image>
        </View>
        <TextInput
          multiline={true}
          value={message}
          style={StyleSheet.compose(signUpStyle.formTextInputStyle, {
            flex: 1,
            height: 32,
          })}
          onChangeText={(value) => {
            setMessage(value);
          }}
          placeholder={"Enter Message..."}
        ></TextInput>
        <TouchableOpacity
          disabled={!message.trim().length}
          onPress={async () => {
            setMessage("");
            await medFetch({
              type: "update",
              condition: { _id: item._id },
              table: "threads",
              changes: {
                $push: {
                  chatHistory: {
                    message: message.trim(),
                    sender: { username: user?.username },
                  },
                },
              },
            });
            socket.emit("message_sent", { thread_id: item._id });
          }}
          style={{ justifyContent: "center", paddingLeft: 8 }}
        >
          <Image
            source={send}
            style={{
              resizeMode: "center",
              height: 32,
              width: 32,
            }}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatDetails;
