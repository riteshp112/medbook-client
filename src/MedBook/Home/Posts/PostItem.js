import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import medFetch from "../../../Actions/medFetchAction";
import { comment, dislike, like, send } from "../../../Images";
import React from "react";
import { getUser } from "../../Authentication/Authenticator";

const PostItem = ({ item, navigation, setPostLength }) => {
  const user = getUser();
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(item?.likers?.indexOf(user?._id) !== -1);
  let commentComponent =
    (item?.comments &&
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
        padding: 10,
        borderBottomWidth: 1,
        backgroundColor: "#ffffff",
        borderBottomColor: "skyblue",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("my-profile", {
            fromPost: true,
            username: item?.use,
          });
        }}
      >
        <Text style={{ fontSize: 20, color: "blue", paddingBottom: 16 }}>
          {item?.use}
        </Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 15, paddingBottom: 16 }}>{item?.post}</Text>
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
          disabled={isLiked}
          onPress={async () => {
            if (!item?.likers.find((item) => item === user?._id)) {
              await medFetch({
                type: "update",
                table: "post",
                id: item?._id,
                changes: { $push: { likers: user?._id } },
              });
              setPostLength && setPostLength((prev) => prev + 1);
              setIsLiked(true);
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
            <Text style={{ marginLeft: 10 }}>{item?.likers?.length}</Text>
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
            <Image source={comment} style={{ height: 20, width: 20 }}></Image>
            <Text style={{ marginLeft: 10 }}>{item?.comments?.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            if (!item?.dislikers.find((item) => item == user?._id)) {
              await medFetch({
                type: "update",
                table: "post",
                id: item?._id,
                changes: {
                  $push: {
                    dislikers: user?._id,
                  },
                },
              });
              setPostLength && setPostLength((prev) => prev + 1);
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
            <Text style={{ marginLeft: 10 }}>{item?.dislikers?.length}</Text>
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
              onPress={async () => {
                newComment &&
                  (await medFetch({
                    type: "update",
                    table: "post",
                    id: item?._id,
                    changes: {
                      $push: {
                        comments: {
                          comment: newComment,
                          user: user?.username,
                        },
                      },
                    },
                  }));
                setNewComment("");
                setPostLength && setPostLength((prev) => prev + 1);
              }}
              style={{ alignSelf: "center" }}
            >
              <View style={{ paddingLeft: 10 }}>
                <Image source={send} style={{ height: 25, width: 25 }}></Image>
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
