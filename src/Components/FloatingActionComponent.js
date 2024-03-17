import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const FloatingActionComponent = ({ onPress, text, position, ...rest }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        alignItems: position,
        marginRight: position == "flex-end" ? 10 : void 0,
        marginLeft: position == "flex-start" ? 10 : void 0,
      }}
    >
      <TouchableOpacity
        onPress={() => onPress(rest)}
        style={{
          position: "absolute",
          backgroundColor: colors.background,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 25,
          bottom: 10,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ fontSize: 20, color: colors.text }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingActionComponent;
