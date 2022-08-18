import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useIsFocused } from "@react-navigation/native"
import FloatingActionComponent from "../../../Components/FloatingActionComponent";
import medFetch from "../../../Actions/medFetchAction";
import getUser from "../../../Actions/getUserAction";
import ChatItem from "./ChatItems";
const ChatList = (props) => {
  const info = props;
  const [threads, setThreads] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState();
  const isFocused =useIsFocused();
  const user= getUser();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const {response:threads} = await medFetch({
        type: "select",
        table: "threads",
        condition:  {$or:[{"sender.username":user?.username},{"receiver.username":user?.username}]},
        limit: limit,
      });
      setThreads(threads);
      setLoading(false);
    })();
  }, [limit,isFocused]);
  
  return (
    <View style={{ flex: 1 ,justifyContent: "center"}}>
      <FlatList
        data={threads}
        renderItem={(props) => <ChatItem {...props} {...info} />}
        onEndReached={() => {
          setLimit((prev) => prev + 5);
        }}
      ></FlatList>
      {loading ? <ActivityIndicator style={{alignSelf: "center"}}/> : void 0}
      <FloatingActionComponent text={"+"} onPress={()=>{props?.navigation?.navigate("add-new-chat")}}></FloatingActionComponent>
    </View>
  );
};
export default ChatList;