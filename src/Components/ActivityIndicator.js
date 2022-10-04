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
      <View style={{ justifyContent: 'center', alignItems: 'center', ...containerStyle }}>
        <Image
          source={loadingIcon}
          style={{ height: 50, width: 50, ...iconStyle }}
        ></Image>
      </View>
    </Modal>
  );
};
export default ActivityIndicator;
