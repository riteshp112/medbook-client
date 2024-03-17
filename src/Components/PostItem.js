import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { ScrollView } from "react-native";
import { useState } from "react";
import medFetch from "../Actions/fetch";
// import CrossPlatformIcon from 'react-native-cross-platform-icons';
import { loadPost } from "../Screens/Post";
import { comment, dislike, like, send } from "../Icons";
import React from "react";
const PostItem = (props) => {
  const { item, PostItems, setPostItems, setModalVisible } = props;
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  let commentComponent =
    (item.comments &&
      item?.comments?.map((item) => (
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "blue" }}>{item.user}</Text>
          <Text style={{ paddingLeft: 15 }}>{item.comment}</Text>
        </View>
      ))) ||
    [];
  return (
    <View
      style={{
        backgroundColor: "lightgrey",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "skyblue",
      }}
    >
      <Text style={{ fontSize: 20, color: "blue", paddingBottom: 16 }}>
        {item?.use}
      </Text>
      <Text
        style={{ fontSize: 15, paddingBottom: 16, fontFamily: "AvenirNext" }}
      >
        {item?.post}
      </Text>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (!item?.likers.find((item) => item === props.currentUser?._id)) {
              medFetch({
                type: "update",
                table: "post",
                id: item?._id,
                changes: { likers: [...item?.likers, props?.currentUser?._id] },
              });
              setTimeout(() => {
                loadPost(
                  setPostItems,
                  setModalVisible,
                  PostItems,
                  props?.currentUser
                );
              }, 500);
            }
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={like} style={{ height: 15, width: 15 }}></Image>
            {/* <CrossPlatformIcon name='thumbs-up'size={15}></CrossPlatformIcon> */}
            <Text style={{ marginLeft: 10 }}>{item?.likers.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowComments(!showComments);
          }}
        >
          <View
            style={{
              paddingLeft: 20,
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            {/* <CrossPlatformIcon name='chatbubbles'size={15}></CrossPlatformIcon> */}
            <Image source={comment} style={{ height: 20, width: 20 }}></Image>
            <Text style={{ marginLeft: 10 }}>{item?.comments?.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (
              !item?.dislikers.find((item) => item == props?.currentUser?._id)
            ) {
              medFetch({
                type: "update",
                table: "post",
                id: item?._id,
                changes: {
                  dislikers: [...item?.dislikers, props?.currentUser?._id],
                },
              });
              setTimeout(() => {
                loadPost(
                  setPostItems,
                  setModalVisible,
                  PostItems,
                  props?.currentUser
                );
              }, 500);
            }
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginLeft: 20,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={dislike} style={{ width: 15, height: 15 }}></Image>
            {/* <CrossPlatformIcon name='thumbs-down' size={15}></CrossPlatformIcon> */}
            <Text style={{ marginLeft: 10 }}>{item?.dislikers.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {showComments ? (
        <View>
          <View style={{ maxHeight: 80 }}>
            <ScrollView style={{ flexGrow: 0 }} nestedScrollEnabled={true}>
              {commentComponent}
            </ScrollView>
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <TextInput
              multiline={true}
              value={newComment}
              style={{
                borderWidth: 2,
                flex: 1,
                minHeight: 30,
                borderColor: "#3867d6",
              }}
              onChangeText={(value) => {
                setNewComment(value);
              }}
            ></TextInput>
            <TouchableOpacity
              onPress={() => {
                newComment &&
                  medFetch({
                    type: "update",
                    table: "post",
                    id: item?._id,
                    changes: {
                      comments: [
                        ...item?.comments,
                        {
                          comment: newComment,
                          user: props?.currentUser?.username,
                        },
                      ],
                    },
                  });
                setNewComment("");
                setTimeout(() => {
                  loadPost(
                    setPostItems,
                    setModalVisible,
                    PostItems,
                    props?.currentUser
                  );
                }, 500);
              }}
              style={{ alignSelf: "center" }}
            >
              <View style={{ paddingLeft: 10 }}>
                <Image source={send} style={{ height: 25, width: 25 }}></Image>
                {/* <CrossPlatformIcon name='send' size={30} outline></CrossPlatformIcon> */}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        void 0
      )}
    </View>
  );
};
export default PostItem;
