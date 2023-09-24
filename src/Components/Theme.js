import { StyleSheet } from "react-native";

export const defaultFormTheme = StyleSheet.create({
  containerStyle: {
    gap: 4,
  },
  dateInput: {
    borderWidth: 1,
    marginTop: 2,
    height: 45,
    borderRadius: 4,
    borderColor: "lightgray",
    backgroundColor: "#ebedf0",
    paddingLeft: 8,
  },
  textInput: {
    borderWidth: 1,
    marginTop: 2,
    height: 45,
    borderRadius: 4,
    borderColor: "lightgray",
    backgroundColor: "#ebedf0",
    paddingLeft: 8,
  },
  optionInput: {
    containerStyle: {
      borderWidth: 1,
      marginTop: 2,
      height: 45,
      borderRadius: 4,
      borderColor: "lightgray",
      backgroundColor: "#ebedf0",
      justifyContent: "center",
    },
    pickerStyle: {
      left: -8,
      borderWidth: 0,
      outline: "none",
      backgroundColor: "rgba(1,1,1,0)",
    },
  },
});
