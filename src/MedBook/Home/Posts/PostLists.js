import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import medFetch from "../../../Actions/medFetchAction";
import FloatingActionComponent from "../../../Components/FloatingActionComponent";
import PostItem from "./PostItem";
import React from "react";

const PostList = (props) => {
  const [posts, setPosts] = useState();
  const [postLength, setPostLength] = useState(10);
  const [isLoading, setIsLoading] = useState();
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const json = await medFetch({
        type: "select",
        table: "post",
        condition: {},
        limit: postLength,
      });
      setIsLoading(false);
      setPosts(json?.response);
    })();
  }, [postLength, isFocused]);

  return (
    <View style={{ flex: 1 ,justifyContent: "center"}}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostItem item={item} {...props} setPostLength={setPostLength}/>}
        keyExtractor={(item) => item?._id}
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
