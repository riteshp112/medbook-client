import React, { useState } from "react";
import { Image, Platform, Pressable, Text, View } from "react-native";
import RNDatePicker from "react-native-date-picker";
import { calendarIcon } from "../Images";

function DatePickerWeb({
  value,
  onChange,
  style,
  textStyle,
  mode = "date",
  placeholder = "Select Date",
  ...restProps
}) {
  const modes = { date: "date", time: "time", datetime: "datetime-local" };
  return (
    <div style={{ ...style, ...textStyle, display: "flex" }}>
      <input
        value={value}
        type={modes[mode]}
        onFocus={() => (this.type = "date")}
        placeholder={placeholder}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        style={{
          outline: "none",
          border: "none",
          backgroundColor: "transparent",
          width: "100%",
          alignSelf: "center",
        }}
        {...restProps}
      />
    </div>
  );
}

function DatePickerNative({
  value,
  onChange,
  style,
  textStyle,
  mode = "date",
  iconStyle,
  icon = calendarIcon,
}) {
  const [open, setOpen] = useState(false);
  const displayValue =
    (value?.getDate() > 9 ? value?.getDate() : "0" + value?.getDate()) +
    "/" +
    (value?.getMonth() > 9 ? value?.getMonth() : "0" + value?.getMonth()) +
    "/" +
    value?.getFullYear();
  return (
    <View style={{ ...style, justifyContent: "center" }}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={{ ...textStyle, textAlignVertical: "center" }}>
          {displayValue}
        </Text>
        <Pressable onPress={() => setOpen(true)}>
          <Image
            source={icon}
            resizeMode="contain"
            style={{ height: 32, width: 32, ...iconStyle }}
          />
        </Pressable>
      </View>
      <RNDatePicker
        open={open}
        modal
        mode={mode}
        date={value}
        onConfirm={(props) => {
          setOpen(false);
          onChange && onChange(props);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}

export default function DatePicker(props) {
  return Platform.OS === "web" ? DatePickerWeb(props) : DatePickerNative(props);
}
