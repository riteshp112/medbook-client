import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import ChatComponent from "./ChatItem";
import { send } from "../../../Images";
import medFetch from "../../../Actions/medFetchAction";
import { getUser } from "../../Authentication/Authenticator";

const ChatDetails = ({ route }) => {
  const { item } = route?.params;
  const [chatHistory, setChatHistory] = useState([]);
  const user = getUser();
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    medFetch({
      type: "select",
      table: "threads",
      condition: {
        "sender.username": item?.sender?.username,
        "receiver.username": item?.receiver?.username,
      },
      limit: 1,
    }).then(({ response: thread }) => {
      setChatHistory(thread?.[0].chatHistory);
      setIsLoading(false);
    });
  }, [refresh]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        flexDirection: "column",
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
          justifyContent: "center",
          height: 40,
          backgroundColor: "lightgray",
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
        }}
      >
        <TextInput
          multiline={true}
          value={message}
          style={{
            flex: 1,
          }}
          onChangeText={(value) => {
            setMessage(value);
          }}
        ></TextInput>
        <TouchableOpacity
          onPress={async () => {
            setMessage("");
            await medFetch({
              type: "update",
              id: item._id,
              table: "threads",
              changes: {
                $push: {
                  chatHistory: {
                    message: message,
                    sender: { username: user?.username },
                  },
                },
              },
            });
            setRefresh((prev) => !prev);
          }}
          style={{ justifyContent: "center" }}
        >
          <Image
            source={send}
            style={{
              resizeMode: "center",
              height: 40,
              width: 40,
              backgroundColor: "lightgray",
              padding: 16,
              borderRadius: 21,
            }}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatDetails;
