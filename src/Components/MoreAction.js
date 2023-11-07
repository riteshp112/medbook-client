import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Popover } from "react-native-popper";
import { threeDots } from "../Images";

const MoreAction = (props) => {
  const { actions = [] } = props;
  const componentsToRender = [];
  actions.map((action, index) => {
    const { label = "No Label", onPress = () => {} } = action;
    componentsToRender.push(
      <TouchableOpacity
        onPress={(e) => {
          onPress(props);
          e.stopPropagation();
        }}
        key={index}
        style={{
          padding:10,
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
        }}
      >
        <Text>{label}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <Popover
      on="press"
      placement="bottom right"
      shouldCloseOnOutsideClick={true}
      shouldFlip
      trigger={
        <TouchableOpacity>
          <Image
            source={threeDots}
            style={{
              resizeMode: "center",
              height: 20,
              width: 20,
            }}
          />
        </TouchableOpacity>
      }
    >
            <Popover.Backdrop />

      <Popover.Content>
        <View style={{
          backgroundColor:'white',
          borderRadius:10,
          borderColor:'lightgrey',
          borderWidth:1,
          shadowColor: "#000",
          overflow:'hidden'
        }}>{componentsToRender}</View>
        
        </Popover.Content>
    </Popover>
  );
};

export default MoreAction;
