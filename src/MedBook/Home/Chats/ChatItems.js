import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getUser } from "../../Authentication/Authenticator";

const ChatItem = ({ item, navigation }) => {
  const user = getUser();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("chat-details", {
          item: item,
        });
      }}
    >
      <View
        style={{
          height: 80,
          paddingVertical: 16,
          justifyContent: "center",
        }}
      >
        <Text>
          {item?.sender?._id == user?._id
            ? item?.receiver?.name
            : item?.sender?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default ChatItem;
