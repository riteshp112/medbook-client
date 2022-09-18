import React from "react";
import { Image, Modal, View } from "react-native";

const ActivityIndicator = (props) => {
  const {
    animationType,
    transparent = true,
    modalVisible,
    loadingIcon,
    iconStyle,
    containerStyle,
  } = props;
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={modalVisible}
    >
      <View style={{ ...containerStyle }}>
        <Image
          source={loadingIcon}
          style={{ top: 250, height: 50, width: 50, left: 150, ...iconStyle }}
        ></Image>
      </View>
    </Modal>
  );
};
export default ActivityIndicator;
