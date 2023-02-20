import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { threeDots } from "../Images";

const MoreAction = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const actionRef = useRef(null);
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
          setIsModalVisible((prev) => !prev);
        }}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 8,
          // backgroundColor: "red",
          width: 150,
          ...containerStyle,
        }}
        key={index}
      >
        <Text style={{ ...textStyle }}>{label}</Text>
      </TouchableOpacity>
    );
  });
  return void 0;
  return (
    <View style={{ ...iconContainerStyle }}>
      <Modal
        visible={isModalVisible}
        transparent={true}
        style={{
          borderRadius: 20,
          padding: 35,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          borderWidth: 1,
          borderColor: "#ddd",
          ...style,
          // margin: 0,
          // flexDirection: "column",
          // position: "absolute",
          // borderRadius: 8,
          // top: 20,
          // left: -140,
          backgroundColor: "white",
          margin: 0, // This is the important style you need to set
          alignItems: undefined,
          justifyContent: undefined,
        }}
      >
        {componentsToRender}
      </Modal>
      <TouchableOpacity
        ref={actionRef}
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
