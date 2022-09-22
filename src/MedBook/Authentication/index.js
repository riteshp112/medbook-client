import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogoTitle from "../../Components/LogoTitle";
import Authenticator from "./Authenticator";
import { Login } from "./Login";
import SignUp from "./SignUp";
import React from "react";
import OtpVerification from "./OtpVerification";
import SearchAccount from "./SearchAccount";
import NewPassword from "./NewPassword";

const Stack = createNativeStackNavigator();

const AuthenticationScreens = () => {
  return (
    <Stack.Group screenOptions={{ header: LogoTitle }}>
      <Stack.Screen
        name="authenticator"
        options={{ header: () => null }}
        component={Authenticator}
      />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="otp-screen" component={OtpVerification} />
      <Stack.Screen name="search-account" component={SearchAccount} />
      <Stack.Screen name="new-password-screen" component={NewPassword} />
    </Stack.Group>
  );
};

export default AuthenticationScreens;
