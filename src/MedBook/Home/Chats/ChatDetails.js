import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import ChatComponent from "./ChatItem";
import { send } from "../../../Images";

const ChatDetails = ({ route }) => {
  const { item } = route?.params;
  const { chatHistory } = item;
  return (
    <View style={{flex:1,backgroundColor:'#ffffff',flexDirection:'column'}}>
      <FlatList
        data={[
          { message: "Hi", sender: { username: "riteshp112" } },
          { message: "Hello", sender: { username: "4bhis1" } },
        ]}
        renderItem={(props) => <ChatComponent {...props} />}
        style={{flex:1}}
      ></FlatList>
      <View style={{ flexDirection: "row",justifyContent: "center"}}>
        <TextInput
          multiline={true}
          style={{
            flex: 1,
            height: 40,
            backgroundColor:'lightgray',
            borderRadius:24
          }}
          onChangeText={(value) => {}}
        ></TextInput>
        <TouchableOpacity
          onPress={()=>{}}
          style={{justifyContent: 'center'}}
        >
            <Image source={send} style={{resizeMode:'center', height: 40, width: 40,backgroundColor:'lightgray',padding:16,borderRadius:21 }}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatDetails;
