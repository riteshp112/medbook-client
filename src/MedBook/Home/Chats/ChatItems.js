import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getUser } from "../../Authentication/Authenticator";
import { useTheme } from "@react-navigation/native";

const ChatItem = ({ item, navigation }) => {
  const user = getUser();
  const { colors } = useTheme();
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
        <Text style={{
          color:colors.text 
        }}>
          {item?.sender?._id == user?._id
            ? item?.receiver?.name
            : item?.sender?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default ChatItem;
