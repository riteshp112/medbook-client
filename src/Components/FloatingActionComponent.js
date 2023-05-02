import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const FloatingActionComponent = ({ onPress, text, position }) => {
  return (
    <View
      style={{
        alignItems: position,
        marginRight: position == "flex-end" ? 10 : void 0,
        marginLeft: position == "flex-start" ? 10 : void 0,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          position: "absolute",
          backgroundColor: "#ffffff",
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 25,
          bottom: 10,
          borderWidth: 1,
          borderColor: "lightgray",
        }}
      >
        <Text style={{ fontSize: 20 }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingActionComponent;
