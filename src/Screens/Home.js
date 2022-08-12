import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Post from "./Post";
import Record from "./Record";
import { Login } from "./Login";
import SignUp from "./SignUp";
import Doc from "./Doc";
import Profile from "./Profile";
import getUser from "../Actions/getUser";
import { useEffect } from "react";
import { logo } from "../Icons";

const Home = (props) => {
  const [user, setUser] = useState(false);
  const [content, setContent] = useState();
  const [SignedUp, setSignedup] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(
    () =>
      getUser().then((item) => {
        setUser(JSON.parse(item));
        console.log(JSON.parse(item));
        setContent(<Post user={JSON.parse(item)}></Post>);
        setLoading(false);
      }),
    []
  );

  const home = () => {
    //console.debug("homePress")
    setContent(<Post user={user} />);
  };
  const recordpress = () => {
    //console.debug("recordpress")
    setContent(<Record />);
  };
  const Docpress = () => {
    //console.debug("recordpress")
    setContent(<Doc />);
  };
  const propress = () => {
    //console.debug("propress")
    setContent(<Profile setUser={setUser} user={user} />);
  };
  if (loading) {
    return <View></View>;
  }
  if (user)
    return (
      <SafeAreaView
        style={{
          flexDirection: "column",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: 75,
            backgroundColor: "lightblue",
            alignItems: "center",
            justifyContent: "center",
            borderBottomColor: "skyblue",
            borderBottomWidth: 1,
          }}
        >
          <Image
            source=// {{uri:"https://raw.githubusercontent.com/riteshp112/Responsive-Resume/master/assets/img/logo.png"}}
            {logo}
            style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
          ></Image>
        </View>
        <View style={{ flex: 1 }}>{content}</View>
        <View
          style={{
            height: 50,
            backgroundColor: "lightgreen",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={home}
            style={{ flex: 1, alignItems: "center", fontSize: 15 }}
          >
            <Text style={{ fontSize: 20 }}>&#127968;</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={Docpress}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Text style={{ fontSize: 35 }}> &#9764;</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={recordpress}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Text style={{ fontSize: 20 }}> &#128466;</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={propress}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Text style={{ fontSize: 20 }}> &#129520;</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  else if (SignedUp == false)
    return (
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            height: 75,
            backgroundColor: "lightblue",
            alignItems: "center",
          }}
        >
          <Image
            source=// {{uri:"https://raw.githubusercontent.com/riteshp112/Responsive-Resume/master/assets/img/logo.png"}}
            {logo}
            style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
          ></Image>
        </View>
        <Login setUser={setUser} signup={setSignedup} setContent={setContent} />
      </View>
    );
  else
    return (
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            height: 75,
            backgroundColor: "lightblue",
            alignItems: "center",
          }}
        >
          <Image
            source=// {{uri:"https://raw.githubusercontent.com/riteshp112/Responsive-Resume/master/assets/img/logo.png"}}
            {logo}
            style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
          ></Image>
        </View>
        <SignUp signsuccess={setSignedup} />
      </View>
    );
};
export default Home;
