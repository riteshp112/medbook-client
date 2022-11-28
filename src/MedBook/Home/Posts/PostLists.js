// @ts-nocheck
import PostItem from "./PostItem";
import React from "react";
import MedList from "../../../Components/MedList";
import FloatingActionComponent from "../../../Components/FloatingActionComponent";

const PostList = MedList(() => {
  return {
    uri: { type: "select", table: "post", condition: {} },
    renderItem: (props) => <PostItem {...props} />,
    floatingAction: (props) => {
      return (
        <FloatingActionComponent
          {...props}
          text="+"
          onPress={() => props?.navigation?.navigate("add-new-post")}
          position="flex-end"
        ></FloatingActionComponent>
      );
    },
  };
});

export default PostList;
