import { FlatList, View } from "react-native";
import React from "react";
import SettingItem from "./SettingItem";
import { appVersion, contact, copyright, requestAndReport, share, terms } from "../../Images";
import deviceInfoModule from "react-native-device-info";
const settingData = [
  {
    title: "Request & Report",
    subTitle: "Send Request & Report",
    icon: requestAndReport
  },
  {
    title: "App Version",
    subTitle: deviceInfoModule.getVersion(),
    icon: appVersion
  },
  {
    title: "Contact Email",
    subTitle: "riteshp112@gmail.com",
    icon: contact
  },
  {
    title: "Copyright",
    subTitle: "No Copyright Intended. Open to use, copy, modify, or distribute.",
    icon: copyright
  },
  {
    title: "Share",
    subTitle: "Share This App",
    icon: share
  },
  {
    title: "Terms & Policies",
    subTitle: "See Terms and Policies of this App",
    icon: terms,
  },
];

const Settings = ({ ...restProps }) => {
  return (
    <View style={{ flex: 1, height: '100%', backgroundColor: '#ffffff' }}>
      <FlatList
        data={settingData}
        renderItem={(props) => <SettingItem {...props} {...restProps} />}
        ItemSeparatorComponent={() =>
          <View
            style={{ borderBottomColor: "lightgray", borderBottomWidth: 1 }}
          ></View>
        }
      />
    </View>
  );
};

export default Settings;
