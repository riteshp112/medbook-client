import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { threeDots } from "../Images";

const MoreAction = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    actions = [],
    style = {},
    iconStyle = {},
    iconContainerStyle = {},
  } = props;
  const componentsToRender = [];
  actions.map((action, index) => {
    const {
      label = "No Label",
      onPress = () => {},
      containerStyle = {},
      textStyle = {},
    } = action;
    componentsToRender.push(
      <TouchableOpacity
        onPress={(e) => {
          onPress(e);
        }}
        onLongPress={() => {
          alert("Long Pressed");
        }}
        style={{ ...containerStyle }}
        key={index}
      >
        <Text style={{ ...textStyle }}>{label}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <View style={{ ...iconContainerStyle }}>
      <Modal
        visible={isModalVisible}
        transparent={true}
        presentationStyle="pageSheet"
      >
        <View
          style={{ height: "100%" }}
          onTouchEnd={(e) => {
            setIsModalVisible((prev) => !prev);
            e.stopPropagation();
          }}
        >
          <View
            style={{
              backgroundColor: "#ffffff",
              borderWidth: 1,
              borderColor: "#ddd",
              flexDirection: "column",
              ...style,
            }}
          >
            {componentsToRender}
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible((prev) => !prev);
        }}
      >
        <Image
          source={threeDots}
          style={{ resizeMode: "center", height: 20, width: 20, ...iconStyle }}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default MoreAction;
