import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";
import { Dimensions } from "react-native";
import { Pressable } from "react-native";
import Post from "./Post";
import AsyncStorage from "@react-native-async-storage/async-storage";
const logout = (setUser) => {
  AsyncStorage.setItem("locuser", "false");
  setUser(false);
};
const Profile = (props) => {
  const { setUser, user } = props;
  const [profileVisible, setProfileVisible] = useState(false);
  return (
    <View>
      <View>
        <View style={{ marginTop: 5 }}></View>
        <View style={{ marginBottom: 5 }}>
          <Button
            title="My Profile"
            onPress={() => setProfileVisible(!profileVisible)}
          ></Button>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={profileVisible}>
        <View style={{ ...styles.centeredView }}>
          <View //style={{borderWidth:1,width:'80%'}}
          >
            <Text style={{ color: "brown", fontSize: 16, alignSelf: "center" }}>
              My Profile
            </Text>
            <View style={(styles.modalView, { alignItems: "flex-start" })}>
              <Text style={{ fontSize: 20, color: "brown" }}>
                Name: {user.name}
              </Text>
              <Text style={{ fontSize: 20, color: "brown" }}>
                Username: {user.username}
              </Text>
              <Text style={{ fontSize: 20, color: "brown" }}>
                Gender: {user.gender}
              </Text>
              <Text style={{ fontSize: 20, color: "brown" }}>
                DOB: {user.dob}
              </Text>
              <View style={{ alignSelf: "center" }}>
                <Pressable
                  style={[styles.button, styles.buttonClose, { marginLeft: 0 }]}
                  onPress={() => {
                    setProfileVisible(false);
                  }}
                >
                  <Text style={styles.textStyle}> OK </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Button
        title="Logout"
        onPress={() => {
          logout(setUser);
        }}
      ></Button>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    /*color: "#ffffffff",*/
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 5,
    marginLeft: 15,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    /*color: "#ffffffff",*/
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default Profile;
