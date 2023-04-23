import React, { createElement } from "react";
import { Platform } from "react-native";
import RNDatePicker from "react-native-date-picker";

function DatePickerWeb({ onChange, ...restProps }) {
  return createElement("input", {
    type: "date",
    onChange: (event) => onChange(event.target.value),
    ...restProps,
  });
}

function DatePickerNative({ value, onChange, ...restProps }) {
  return <RNDatePicker date={value} onDateChange={onChange} {...restProps} />;
}

export default function DatePicker(props) {
  return Platform.OS === "web" ? DatePickerWeb(props) : DatePickerNative(props);
}
