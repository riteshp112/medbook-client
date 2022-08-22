import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { createPost } from "../../../Actions/createPostAction";
import getUser from "../../../Actions/getUserAction";
import React from "react";
const AddNewPost = ({navigation}) => {
  const [post, setPost] = useState();
  const user = getUser();
  
  return (
    <View style={{ backgroundColor: "#ffffff",}}>
      <Text style={{ fontWeight: "500", color:'blue',padding: 8, paddingTop:void 0,fontSize: 16 }}>
        {" "}
        {user?.name}
      </Text>
      <Text style={{ paddingLeft: 12,paddingBottom:4,color:'grey', marginTop: -10, fontSize: 10 }}>
        {" "}
        {">"} Everyone
      </Text>
      <View
        style={{
          backgroundColor: "#fff2f2",
          //   padding:16,
          borderWidth: 1,
          borderRadius: 4,
          width: "95%",
          alignSelf: "center",
        }}
      >
        <TextInput
          multiline={true}
          textAlignVertical= {'top'}
          style={{ height: 150 }}
          onChangeText={(value) => {
            setPost(value);
          }}
        ></TextInput>
      </View>
      <View style={{ width: "95%", alignSelf: "center" ,paddingTop:8}}>
        <Button
          title="Post"
          onPress={() => {
            createPost({
              use: user?.username || "1234",
              post: post,
            });
            setPost("")
            navigation.goBack();
          }}
        ></Button>
      </View>
    </View>
  );
};

export default AddNewPost;
