import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddNewPost from "./AddNewPost";
import PostItem from "./PostItem";
import PostList from "./PostLists";

const Stack = createNativeStackNavigator();

const PostScreens = (
  <Stack.Group>
    <Stack.Screen
      name="add-new-post"
      component={AddNewPost}
      options={{
        presentation: "transparentModal",
        title: "Add new post",
        contentStyle: {
          justifyContent: "flex-end",
        },
        headerShown: false,
      }}
    />
    <Stack.Screen name="post-list" component={PostList} />
  </Stack.Group>
);

export default PostScreens;
