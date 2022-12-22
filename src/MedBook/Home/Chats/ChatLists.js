import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import FloatingActionComponent from "../../../Components/FloatingActionComponent";
import medFetch from "../../../Actions/medFetchAction";
import ChatItem from "./ChatItems";
import React from "react";
import { getUser } from "../../Authentication/Authenticator";

const ChatList = (props) => {
  const info = props;
  const user = getUser();
  const [threads, setThreads] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      medFetch({
        type: "select",
        table: "threads",
        condition: {
          $or: [
            { "sender.username": user?.username || "1234" },
            { "receiver.username": user?.username || "1234" },
          ],
        },
        limit: limit,
      }).then((result) => {
        setThreads(result);
        setLoading(false);
      });
    }
  }, [limit, isFocused]);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <FlatList
        data={threads}
        renderItem={(props) => <ChatItem {...props} {...info} />}
        onEndReached={() => {
          setLimit((prev) => prev + 5);
        }}
        keyExtractor={(item) => item?._id}
        showsVerticalScrollIndicator={false}
      ></FlatList>
      {loading ? <ActivityIndicator style={{ alignSelf: "center" }} /> : void 0}
      <FloatingActionComponent
        {...props}
        text={"+"}
        onPress={() => {
          props?.navigation?.navigate("add-new-chat");
        }}
        position="flex-end"
      ></FloatingActionComponent>
    </View>
  );
};
export default ChatList;
