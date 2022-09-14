import { Platform } from "react-native";
// import SimpleToast from "react-native-simple-toast";
const Toast = {
  show: (message, duration) => {
    if (true || Platform.OS === "web") {
      alert(message);
    } else {
    //   Simpletoast.show(message, duration);
    }
  },
};

export default Toast;
