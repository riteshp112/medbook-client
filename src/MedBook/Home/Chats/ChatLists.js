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
  const [loading, setLoading] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { response: threads = {} } =
        (await medFetch({
          type: "select",
          table: "threads",
          condition: {
            $or: [
              { "sender.username": user?.username || "1234" },
              { "receiver.username": user?.username || "1234" },
            ],
          },
          limit: limit,
        })) || {};
      setThreads(threads);
      setLoading(false);
    })();
  }, [limit, isFocused]);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <FlatList
        data={threads}
        renderItem={(props) => <ChatItem {...props} {...info} />}
        onEndReached={() => {
          setLimit((prev) => prev + 5);
        }}
      ></FlatList>
      {loading ? <ActivityIndicator style={{ alignSelf: "center" }} /> : void 0}
      <FloatingActionComponent
        text={"+"}
        onPress={() => {
          props?.navigation?.navigate("add-new-chat");
        }}
      ></FloatingActionComponent>
    </View>
  );
};
export default ChatList;
