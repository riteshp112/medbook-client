// @ts-nocheck
import React, { useCallback, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import medFetch from "../../../Actions/medFetchAction";
import MoreAction from "../../../Components/MoreAction";
import { VideoPlayer } from "../../../Components/VideoPlayer";
import { comment, dislike, like, send } from "../../../Images";
import { downloadUrl } from "../../../config";
import { getUser } from "../../Authentication/Authenticator";
import Hyperlink from "react-native-hyperlink";
import { useTheme } from "@react-navigation/native";

const PostItem = ({ item, navigation, setDataLength: setPostLength }) => {
  const user = getUser();
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(
    item?.likers?.indexOf(user?._id) !== -1
  );
  let commentComponent =
    (item?.comments &&
      item?.comments?.map((item) => (
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "blue" }}>{item.user}</Text>
          <Text style={{ paddingLeft: 15 }}>{item.comment}</Text>
        </View>
      ))) ||
    [];

  const [imgHeight, setImgHeight] = useState({});
  const { colors } = useTheme();

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 15); //to check the text is more than 4 lines or not
    console.log(e);
  }, []);

  return (
    <View
      style={{
        padding: 10,
        flexDirection: "column",
        gap: 4,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
        <MoreAction
          item={item}
          actions={[
            { label: "Edit Post" },
            { label: "Delete Post" },
            { label: "Report Post" },
          ]}
        />
      </View>
      <Hyperlink
        linkStyle={{
          color: "blue",
          textDecorationLine: "none",
        }}
        linkDefault={true}
      >
        <Text
          dataDetectorType="all"
          selectable
          textBreakStrategy="balanced"
          android_hyphenationFrequency="full"
          accessible
          numberOfLines={textShown || !lengthMore ? undefined : 15}
          style={{ fontSize: 15, paddingBottom: 16, color: colors.text }}
          onTextLayout={onTextLayout}
          onLayout={(e) => {
            console.log(e);
            if (Platform.OS == "web") {
              setLengthMore(e.nativeEvent.target.innerText.length >= 600);
            }
          }}
        >
          {item?.post}
        </Text>
      </Hyperlink>

      {lengthMore ? (
        <Text
          onPress={toggleNumberOfLines}
          style={{ lineHeight: 21, marginTop: 10 }}
        >
          {textShown ? "Read less..." : "Read more..."}
        </Text>
      ) : null}
      {item?.image?.type?.split("/")?.[0] == "video" ? (
        <VideoPlayer url={downloadUrl + "/" + item.image?._id} />
      ) : (
        item.image && (
          <Image
            source={{
              uri: downloadUrl + "/" + item.image?._id,
            }}
            resizeMode="contain"
            onLayout={(event) => {
              let { width: totalWidth } = event.nativeEvent.layout;
              Image.getSize(
                downloadUrl + "/" + item?.image?._id,
                (width, height) => {
                  const widthToHeight = width / height;
                  const newHeight = totalWidth / widthToHeight;
                  setImgHeight({ height: newHeight });
                },
                console.log
              );
            }}
            style={{
              ...imgHeight,
              alignSelf: "center",
              width: "100%",
            }}
          />
        )
      )}
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
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
                condition: { _id: item._id },
                changes: { $push: { likers: { _id: user?._id } } },
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
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: 10,
              paddingRight: 10,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 4,
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
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: 10,
              paddingRight: 10,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 4,
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
                condition: { _id: item._id },
                changes: {
                  $push: {
                    dislikers: { _id: user?._id },
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
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: 10,
              paddingRight: 10,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 4,
            }}
          >
            <Image source={dislike} style={{ width: 15, height: 15 }}></Image>
            <Text style={{ marginLeft: 10 }}>{item?.dislikers?.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {showComments && (
        <View style={{ flex: 1, flexDirection: "column", gap: 8 }}>
          <ScrollView
            style={{ flexGrow: 0, maxHeight: 180, paddingLeft: 16 }}
            nestedScrollEnabled={true}
          >
            {commentComponent}
          </ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.background,
              borderColor: colors.border,
              borderWidth: 1,
              paddingRight: 8,
              paddingLeft: 8,
              borderRadius: 16,
              flexDirection: "row",
              alignItems: "center",
              minHeight: 30,
              maxHeight: 60,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            <TextInput
              placeholder="Add a comment"
              multiline={true}
              value={newComment}
              style={{
                flex: 1,
              }}
              onChangeText={(value) => {
                setNewComment(value);
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "lightblue",
                padding: 4,
                borderRadius: 32,
              }}
              disabled={!newComment.trim()}
              onPress={async () => {
                await medFetch({
                  type: "update",
                  table: "post",
                  condition: { _id: item._id },
                  changes: {
                    $push: {
                      comments: {
                        comment: newComment,
                        user: user?.username,
                      },
                    },
                  },
                });
                setNewComment("");
                setPostLength && setPostLength((prev) => prev + 1);
              }}
            >
              <Image
                source={send}
                style={{
                  height: 25,
                  width: 25,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default PostItem;
