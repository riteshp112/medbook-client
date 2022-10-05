import React from "react";
import { Image } from "react-native";
import { logo } from "../Images";

const LogoTitle = (props) => {
  const { icon, iconStyle } = props;
  return (
    <Image
      source={icon || logo}
      style={{ width: '100%', height: 80, resizeMode:'stretch', ...iconStyle }}
    ></Image>
  );
};

export default LogoTitle;
