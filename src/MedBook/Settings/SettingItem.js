import { Image, Text, View } from "react-native";
import React from "react";
import { send } from "../../Images";
import { TouchableOpacity } from "react-native-gesture-handler";
const SettingItem = ({ item }) => {
  const { icon = send, title, subTitle ,onPress} = item;
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={{ flexDirection: "row", flex: 1, padding: 12 }}>
        <Image source={icon} style={{ width: 30, height: 30, marginTop: 16 }}></Image>
        <View style={{ flexDirection: "column", padding: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: "500", paddingVertical: 4, overflow: 'hidden' }}>
            {title}
          </Text>
          <Text>{subTitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SettingItem;
