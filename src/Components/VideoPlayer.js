import { ResizeMode, Video } from 'expo-av';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';

export const VideoPlayer=({url})=> {
  const video = React.useRef(null);
  console.log(video)
  const [dimentions,setDimentions] = useState({
    height:0,
    width:0
  })
  return (
      <Video
        ref={video}
        style={{...dimentions,         
          alignSelf: "center", 
    }}
        source={{
          uri:url,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onReadyForDisplay={(props)=>{
        const windowWidth = Dimensions.get('window').width-20;
        const {srcElement} = props;
        console.log(srcElement.clientHeight)
        console.log(srcElement.clientWidth)
        const widthToHeight = srcElement.clientWidth / srcElement.clientHeight;
        const newHeight = windowWidth / widthToHeight;
        console.log(newHeight)
        console.log(windowWidth)
        setDimentions({
          height:newHeight,
          width:windowWidth
        })
        srcElement.style.position = "initial"

        }}
        // onReadyForDisplay={videoData => {
        //     videoData.srcElement.style.position = "initial"
        //   }}
      />
  );
}

