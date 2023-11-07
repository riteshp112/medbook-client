// @ts-nocheck
import PostItem from "./PostItem";
import React from "react";
import List from "../../../Components/MedList";

const PostList = (props) => {
  const { navigation } = props;
  const addPost = () => {
    navigation?.navigate("add-new-post");
  };
  const scrollToTop = ({ list }) => {
    list.scrollToIndex({ index: 0, animated: true });
  };

  return (
    <List
      {...props}
      uriParams={{ type: "select", table: "post", condition: {} }}
      RenderItem={PostItem}
      floatingActions={[
        {
          text: "+",
          onPress: addPost,
          position: "flex-start",
        },
        {
          text: "^",
          onPress: scrollToTop,
          position: "flex-end",
        },
      ]}
    />
  );
};
export default PostList;
