import { FlatList, View } from "react-native";
import React from "react";
import SettingItem from "./SettingItem";
const settingData = [
  {
    title: "Request & Report",
    subTitle: "Send Request & Report",
  },
  {
    title: "App Version",
    subTitle: "1.0.0",
  },
  {
    title: "Contact Email",
    subTitle: "riteshp112@gmail.com",
  },
  {
    title: "Copyright",
    subTitle: "No Copyright Intended , Bindass Copy Karo",
  },
  {
    title: "Share",
    subTitle: "Share This App",
  },
  {
    title: "Terms & Policies",
    subTitle: "See Terms and Policies of this App",
  },
];

const Settings = ({ ...restProps }) => {
  return (
    <View style={{ flex: 1 , height: '100%' ,backgroundColor:'#ffffff'}}>
      <FlatList
        data={settingData}
        renderItem={(props) => <SettingItem {...props} {...restProps} />}
        ItemSeparatorComponent={()=>
          <View
            style={{ borderBottomColor: "lightgray", borderBottomWidth: 1 }}
          ></View>
        }
      />
    </View>
  );
};

export default Settings;
