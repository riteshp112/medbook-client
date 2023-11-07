import { ActivityIndicator, Text, View } from "react-native";
import React from "react";
import { getUser } from "../../Authentication/Authenticator";

const ChatComponent = ({ item }) => {
  const user = getUser();
  return (
    <View
      style={[
       {padding:4,}
      ]}
    >
      <Text
        style={[
          item?.sender?.username == user?.username
            ? { alignSelf: "flex-end", backgroundColor: "lightgreen" }
            : { alignItems: "flex-start", backgroundColor: "lightblue" },
          {width:200,padding:8,borderRadius:8},
        ]}
      >
        {item?.message}
      </Text>
      
    </View>
  );
};

export default ChatComponent;
