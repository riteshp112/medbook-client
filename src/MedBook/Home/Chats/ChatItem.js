import { ActivityIndicator, Text, View } from "react-native";
import React from "react";
import { getUser } from "../../Authentication/Authenticator";
import { useTheme } from "@react-navigation/native";

const ChatComponent = ({ item }) => {
  const user = getUser();
  const { colors } = useTheme();
  return (
    <View style={[{ padding: 4 }]}>
      <Text
        style={[
          item?.sender?.username == user?.username
            ? { alignSelf: "flex-end", backgroundColor: "lightgreen" }
            : { alignItems: "flex-start", backgroundColor: "lightblue" },
          { width: 200, padding: 8, borderRadius: 8, color: colors.text },
        ]}
      >
        {item?.message}
      </Text>
    </View>
  );
};

export default ChatComponent;
