import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import medFetch from "../../../Actions/medFetchAction";
import FloatingActionComponent from "../../../Components/FloatingActionComponent";
import PostItem from "./PostItem";

const PostList = (props) => {
  const [posts, setPosts] = useState();
  const [postLength, setPostLength] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused= useIsFocused();
  useEffect(async () => {
    setIsLoading(true);
    const json = await medFetch({
      type: "select",
      table: "post",
      condition: {},
      limit: postLength,
    });
    setPosts(json?.response);
    setIsLoading(false);
  }, [postLength,isFocused]);

  return (
    <View
      style={{
        flexGrow: 1,
        flexDirection: "column",
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        overflow: "hidden",
        justifyContent: "center",
      }}
    >
      <FlatList
        data={posts}
        renderItem={(props)=><PostItem {...props}/>}
        keyExtractor={(item) => item?._id}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          setPostLength((prev) => prev + 5);
        }}
        showsVerticalScrollIndicator={false}
      ></FlatList>
      {isLoading && (
        <ActivityIndicator style={{ alignSelf: "center" }}></ActivityIndicator>
      )}
      <FloatingActionComponent
        onPress={() => {
          props?.navigation.navigate("add-new-post");
        }}
        text="+"
        {...props}
      />
    </View>
  );
};
export default PostList;
