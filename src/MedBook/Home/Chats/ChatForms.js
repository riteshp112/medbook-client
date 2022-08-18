import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, TextInput, View } from "react-native";
import getUser from "../../../Actions/getUserAction";
import medFetch from "../../../Actions/medFetchAction";


const AddNewChat = (props) => {
  const [query, setQuery] = useState("");
  const [pickerItems, setPickerItems] = useState([]);
  const [loading, setLoading] = useState();
  const [user, setUser] = useState();
  const [userIndex, setUserIndex] = useState();
  const sender = getUser();

  useEffect(() => {
    const items = [];
    (async () => {
      setLoading(true);
      let { response } = await medFetch({
        type: "select",
        table: "testcol",
        condition: { name: { $regex: "^" + query, $options: "i" } },
        limit: 30,
      });
      setUser(response);
      console.log(user);
      response.map((item) => {
        items.push(
          <Picker.Item
            key={item?._id}
            label={item?.name}
            value={item?.name}
          ></Picker.Item>
        );
      });
      setPickerItems(items);
      setLoading(false);
    })();
  }, [query]);
  
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 8 }}>
      <View
        style={{
          backgroundColor: "#ffffff",
          borderWidth: 2,
          borderColor: "lightgray",
          padding: 4,
          justifyContent: "center",
        }}
      >
        <TextInput
          style={{
            backgroundColor: "#fff2f2f2",
            borderRadius: 4,
            marginTop: 4,
            height: 32,
          }}
          onChangeText={(itemValue) => {
            setQuery(itemValue);
          }}
          placeholder={"Search Friends"}
        ></TextInput>
        <Picker
          selectedValue={user?.[userIndex]?.name}
          onValueChange={(item, index) => {
            setUserIndex(index);
          }}
          style={{ backgroundColor: "", marginTop: 8, width: 230 }}
        >
          {pickerItems}
        </Picker>
        {loading ? <ActivityIndicator style={{position: "absolute",alignSelf: "center"}}></ActivityIndicator> : void 0}
        <View
          style={{
            paddingTop: 8,
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-evenly",
            alignSelf: "center",
          }}
        >
          <Button
            title="Start Chatting"
            onPress={() => {
              medFetch({
                type: "insert",
                table: "threads",
                data: {
                  sender: sender,
                  receiver: user[userIndex],
                  chatHistory: [],
                },
              });
              props?.navigation?.goBack();
            }}
          />
          <Button
            title="Cancel"
            onPress={()=>props?.navigation?.goBack()}/>
        </View>
      </View>
    </View>
  );
};

export default AddNewChat;
