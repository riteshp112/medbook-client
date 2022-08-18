import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogoTitle from "../../Components/LogoTitle";
import Authenticator from "./Authenticator";
import { Login } from "./Login";
import SignUp from "./SignUp";

const Stack = createNativeStackNavigator();

const AuthenticationScreens = () => {
  return (
    <Stack.Group screenOptions={{header:LogoTitle}}>
      <Stack.Screen name="authenticator" component={Authenticator} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
    </Stack.Group>
  );
};

export default AuthenticationScreens;
