import { ResizeMode, Video } from "expo-av";
import React, { useState } from "react";
import { Dimensions, Platform } from "react-native";

export const VideoPlayer = ({ url }) => {
  const video = React.useRef(null);
  const [dimentions, setDimentions] = useState({
    height: "100%",
    width: "100%",
  });
  return (
    <Video
      ref={video}
      style={{ ...dimentions, alignSelf: "center" }}
      source={{
        uri: url,
      }}
      useNativeControls
      resizeMode={ResizeMode.CONTAIN}
      isLooping
      onReadyForDisplay={(props) => {
        const windowWidth = Dimensions.get("window").width - 20;
        const { naturalSize, srcElement } = props;
        if (srcElement) {
          const widthToHeight =
            srcElement.clientWidth / srcElement.clientHeight;
          const newHeight = windowWidth / widthToHeight;
          setDimentions({
            height: newHeight,
            width: windowWidth,
          });
          srcElement.style.position = "initial"
        } else {
          const widthToHeight = naturalSize.width / naturalSize.height;
          const newHeight = windowWidth / widthToHeight;
          setDimentions({
            height: newHeight,
            width: windowWidth,
          });
        }
      }}
    />
  );
};
