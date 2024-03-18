import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { createPost } from "../../../Actions/createPostAction";
import { getUser } from "../../Authentication/Authenticator";
import { useTheme } from "@react-navigation/native";
const AddNewPost = ({ navigation }) => {
  const [post, setPost] = useState("");
  const user = getUser();
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(28,53,32,0.09)",
      }}
    >
      <View
        style={{
          backgroundColor:colors.background,
          borderRadius: 4,
          width: "95%",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            color: "blue",
            padding: 8,
            paddingTop: void 0,
            fontSize: 16,
          }}
        >
          {" "}
          {user?.name}
        </Text>
        <Text
          style={{
            paddingLeft: 12,
            paddingBottom: 4,
            color: "grey",
            marginTop: -10,
            fontSize: 10,
          }}
        >
          {" "}
          {">"} Everyone
        </Text>
        <View
          style={{
            backgroundColor: "#fff2f2",
            borderWidth: 1,
            borderRadius: 4,
            width: "95%",
            alignSelf: "center",
          }}
        >
          <TextInput
            multiline={true}
            textAlignVertical={"top"}
            style={{ height: 150 }}
            onChangeText={(value) => {
              setPost(value);
            }}
            maxLength={300}
          ></TextInput>
        </View>
        <View
          style={{
            paddingTop: 8,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            title="Post"
            disabled={!post.length}
            onPress={() => {
              createPost({
                use: user?.username || "1234",
                post: post,
              });
              setPost("");
              toast.show("Post Added Successfully", {
                type: "success",
                duration: 2000,
              });
              navigation.goBack();
            }}
          ></Button>
          <Button title="Cancel" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  );
};

export default AddNewPost;
