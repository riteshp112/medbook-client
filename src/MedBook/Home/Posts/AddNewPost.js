import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { createPost } from "../../../Actions/createPostAction";
import { getUser } from "../../Authentication/Authenticator";
import { CustomRenders } from "../../../Components/FormEditors";
const ImageInput = CustomRenders.imageInput;
const AddNewPost = ({ navigation }) => {
  const [post, setPost] = useState("");
  const [image, setImage] = useState();
  const user = getUser();
  // const Toast = useToast()
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
          backgroundColor: "#ffffff",
          borderRadius: 4,
          width: "95%",
          alignSelf: "center",
          gap: 4,
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
            backgroundColor: "lightskyblue",
            borderRadius: 4,
            width: "95%",
            alignSelf: "center",
          }}
        >
          <TextInput
            placeholder="Got something? Just Open Up!...."
            multiline={true}
            textAlignVertical={"top"}
            style={{ height: 60, padding: 4 }}
            onChangeText={(value) => {
              setPost(value);
            }}
            maxLength={300}
          />
        </View>
        <ImageInput
          placeholder={"Upload Image"}
          formField=""
          handleChange={() => {
            return (imageId) => {
              setImage(imageId);
            };
          }}
        />
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
    </View>
  );
};
export default AddNewPost;
