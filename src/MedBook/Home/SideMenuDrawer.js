import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import React from "react";
import Logout from "../Authentication/Logout";
import Settings from "../Settings/Settings";
import ChatList from "./Chats/ChatLists";
import HomeTabs from "./HomeTabs";
import ProfileDetail from "./MyProfile/ProfileDetails";
import PostList from "./Posts/PostLists";
import RecordList from "./Records/RecordLists";
import { ThemeContext } from "..";
import { Image, Switch, Text, View } from "react-native";
import { sun, moon } from "../../Images";
import Color from "color";
import { useTheme } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const SideBar = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        drawerActiveTintColor: "gray",
        headerShadowVisible: true,
        drawerType: "front",
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <ProfileDetail {...props} />
          <DrawerItemList {...props} />
          <DrawerItem
            label={() => {
              return (
                <View style={{ flexDirection: "row", gap: 8 ,alignItems:'center'}}>
                  <Image style={{ width: 24, height: 24 }} source={moon} />
                  <Switch value={theme} onValueChange={setTheme} />
                  <Image style={{ width: 24, height: 24 }} source={sun} />
                </View>
              );
            }}
            onPress={() => setTheme((prev) => !prev)}
          />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen name={"Home"} component={HomeTabs} />
      <Drawer.Screen name={"Posts"} component={PostList} />
      <Drawer.Screen name={"Chats"} component={ChatList} />
      <Drawer.Screen name={"Records"} component={RecordList} />
      <Drawer.Screen name={"Settings"} component={Settings} />
      <Drawer.Screen name={"Logout"} component={Logout} />
    </Drawer.Navigator>
  );
};
export default SideBar;
