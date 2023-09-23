import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import QueryString from "qs";
import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native";
import DatePicker from "./DatePicker";

const DateInput = (props) => {
  const { handleChange, field: formField, values, style } = props;
  return (
    <DatePicker
      style={style}
      onChange={handleChange(formField)}
      value={values[formField]}
    />
  );
};

const FormTextInput = (props) => {
  const {
    handleChange,
    field: formField,
    values,
    allowOnly,
    placeholder,
    handleBlur,
    style,
  } = props;
  return (
    <TextInput
      style={style}
      onChangeText={handleChange(formField)}
      onBlur={handleBlur(formField)}
      value={values[formField]}
      type={allowOnly || ""}
      placeholder={placeholder}
    />
  );
};

const OptionInput = (props) => {
  const getOptionsFromResponseDefault = (res) => {
    return res?.data || [];
  };
  let {
    options = [],
    placeholder,
    handleChange,
    field: formField,
    values,
    suggestionField,
    valueField,
    getOptionsFromResponse = getOptionsFromResponseDefault,
    style,
  } = props;
  const { uri, queryParams } = props;
  const { containerStyle, pickerStyle } = style;
  if (uri) {
    axios
      .get(uri, {
        params: queryParams,
        paramsSerializer: QueryString.stringify,
      })
      .then((res) => {
        options = getOptionsFromResponse(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const resolveOptions = (option, suggestionField, valueField) => {
    if (typeof option == "string") return { value: option, label: option };
    return { label: option[suggestionField], value: option[valueField] };
  };
  return (
    <View style={containerStyle}>
      <Picker
        onValueChange={handleChange(formField)}
        selectedValue={values[formField]}
        style={pickerStyle}
      >
        <Picker.Item value={null} label={placeholder} enabled={false} />
        {options.map((option) => (
          <Picker.Item
            {...resolveOptions(option, suggestionField, valueField)}
          />
        ))}
      </Picker>
    </View>
  );
};

export const CustomRenders = {
  dateInput: DateInput,
  textInput: FormTextInput,
  optionInput: OptionInput,
};
