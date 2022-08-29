import { Text, TouchableOpacity, View } from "react-native";
import getUser from "../../../Actions/getUserAction";
import React from "react";

const ChatItem = ({ item ,navigation}) => {
  const user = getUser();

  return (
    <TouchableOpacity onPress={()=>{
        navigation.navigate("Chat-Details",{
            item
        })

    }}> 
            <View
        style={{
          height: 80,
          backgroundColor: "#ffffff",
          borderBottomColor: "lightblue",
          borderBottomWidth: 1,
          paddingTop: 16,
          paddingBottom: 16,
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
