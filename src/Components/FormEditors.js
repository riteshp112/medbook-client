import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import QueryString from "qs";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { docPicker } from "../Actions/upload";
import { addIcon } from "../Images";
import { downloadUrl } from "../config";
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
    afterFetch = getOptionsFromResponseDefault,
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
        options = afterFetch(res);
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

const ImageInput = ({ handleChange, formField, placeholder }) => {
  const [file, setFile] = useState();

  const onUploadPressed = async () => {
    const file = await docPicker();
    const {_id,assets: assets} = file;

    console.log(_id,assets);
    setFile({_id,type:assets?.[0]?.mimeType});
    handleChange(formField)({_id,type:assets?.[0]?.mimeType});
  };
  return (
    <View style={{ width: "95%", alignSelf: "center" }}>
      <TouchableOpacity onPress={onUploadPressed}>
        <Image
          source={file ? { uri: downloadUrl + "/" + file?._id } : addIcon}
          resizeMode="contain"
          style={{
            width: "100%",
            alignSelf: "center",
            height: 150,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "lightskyblue",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export const CustomRenders = {
  dateInput: DateInput,
  textInput: FormTextInput,
  optionInput: OptionInput,
  imageInput: ImageInput,
};
