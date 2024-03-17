import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import RNDatePicker from "react-native-date-picker";
import { calendarIcon } from "../Images";

export default function DatePickerNative({
  value,
  onChange,
  style,
  textStyle,
  mode = "date",
  iconStyle,
  icon = calendarIcon,
  placeholder,
}) {
  const [open, setOpen] = useState(false);
  const displayValue = value
    ? (value.getDate() > 9 ? value.getDate() : "0" + value.getDate()) +
      "/" +
      (value.getMonth() + 1 > 9
        ? value.getMonth() + 1
        : "0" + (value.getMonth() + 1)) +
      "/" +
      value.getFullYear()
    : "";
  return (
    <View style={{ ...style, justifyContent: "center" }}>
      <Pressable onPress={() => setOpen(true)}>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <TextInput
            value={displayValue}
            placeholder={placeholder}
            style={{ ...textStyle, textAlignVertical: "center" }}
            editable={false}
          />
          <Image
            source={icon}
            resizeMode="contain"
            style={{ height: 32, width: 32, ...iconStyle }}
          />
        </View>
      </Pressable>
      <RNDatePicker
        open={open}
        modal
        mode={mode}
        date={value || new Date()}
        onConfirm={(props) => {
          onChange && onChange(props);
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}
