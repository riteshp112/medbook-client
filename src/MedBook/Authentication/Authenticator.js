import { View } from "react-native";
import getUser from "../../Actions/getUserAction";

const Authenticator = ({ navigation }) => {
  const user = getUser();
  if (user) {
    navigation.navigate("home-tabs");
  } else {
    navigation.navigate("login");
  }
  return <View></View>;
};
export default Authenticator;
