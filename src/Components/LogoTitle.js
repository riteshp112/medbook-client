import React from "react";
import { Image } from "react-native";
import { logo } from "../Images";


const LogoTitle = ({options}) => {
  return (
    <Image
      source={logo}
      style={{ width:'100%', height:80,resizeMode: "stretch" }}
    ></Image>
  );
};

export default LogoTitle;
