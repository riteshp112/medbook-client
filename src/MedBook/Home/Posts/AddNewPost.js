import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { createPost } from "../../../Actions/createPostAction";
import { CustomRenders } from "../../../Components/FormEditors";
import { getUser } from "../../Authentication/Authenticator";
import { useTheme } from "@react-navigation/native";
const ImageInput = CustomRenders.imageInput;
const AddNewPost = ({ navigation }) => {
  const [post, setPost] = useState("");
  const [image, setImage] = useState();
  const user = getUser();
  const { colors } = useTheme();
  // const Toast = useToast()
  return (
    <View
      style={{
        borderTopColor: "lightgray",
        borderTopWidth: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderStyle: "solid",
        backgroundColor: colors.background,
        padding: 8,
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
        {">"} Everyone
      </Text>
      <View
        style={{
          gap: 4,
        }}
      >
        <TextInput
          placeholder="Got something? Just Open Up!...."
          multiline={true}
          textAlignVertical={"top"}
          style={{
            minHeight: 60,
            padding: 4,
            backgroundColor: "lightskyblue",
            borderRadius: 4,
            maxHeight: 400,
          }}
          onChangeText={(value) => {
            setPost(value);
          }}
          maxLength={10000}
        />
        <ImageInput
          placeholder={"Upload Image"}
          formField=""
          handleChange={() => {
            return (imageId) => {
              setImage(imageId);
            };
          }}
        />
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
              post,
              image,
            });
            setPost("");
            toast.show("Post Added Successfully", {
              type: "success",
              duration: 2000,
            });
            navigation.goBack();
          }}
        />
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};
export default AddNewPost;
