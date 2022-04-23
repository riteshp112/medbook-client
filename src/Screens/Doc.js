import React, { Component, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Platform } from "react-native";
import WebView from "react-native-webview";

export default class Doctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: "doctor"
    };
  }

  render() {
    return (
      <>
        {Platform.OS==='web'?<View style={{flex:1 ,alignItems:'center',justifyContent:'center'}}><Text>This Feature Will Be Available Soon</Text></View>:
        <View style={{flex:1}}>
        <WebView
          source={{ uri: "https://www.google.com/maps/search/" + this.state.val + " near me" }}
          //style={{ marginTop: 20 }}
        />
        <TextInput
          editable={true}
          style={{
            opacity: 100,
            backgroundColor: "white",
            //borderWidth: 2,
            position: "absolute",
            height: 45,
            top: 40,
            width: "100%",
            fontSize: 24,
            color: "black",
            textAlignVertical: "bottom"
          }}
          placeholder="Search by Doctors name or speciality"
          onChangeText={value => this.setState({ val: value != "" ? value : "doctor" })}
        ></TextInput>
        <Text
          style={{ textAlign: "center", position: "absolute", height: 40,fontSize:20,color:'red', textAlignVertical:'center',backgroundColor: "white", width: "100%" }}
        >
          Click on View list to hide map
        </Text>
        </View>}
      </>
    );
  }
}
