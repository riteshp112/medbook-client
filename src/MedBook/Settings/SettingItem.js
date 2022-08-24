import { Image, Text, View } from "react-native";
import React from "react";
import { send } from "../../Images";
const SettingItem = ({ item }) => {
  const { icon = send, title, subTitle } = item;
  return (
    <View style={{ flexDirection: "row", flex: 1, padding: 16 }}>
      <Image source={icon} style={{ width: 42, height: 42 ,marginVertical: 8}}></Image>
      <View style={{ flexDirection: "column", padding: 8 }}>
        <Text style={{ fontSize: 20, fontWeight: "500", paddingVertical: 4 }}>
          {title}
        </Text>
        <Text>{subTitle}</Text>
      </View>
    </View>
  );
};

export default SettingItem;
