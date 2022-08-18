import { View } from "react-native";
import getUser from "../../Actions/getUserAction";

const Authenticator = ({ navigation }) => {
  if (getUser()) {
    navigation.navigate("home-tabs");
  } else {
    navigation.navigate("login");
  }
  return <View></View>;
};
export default Authenticator;
