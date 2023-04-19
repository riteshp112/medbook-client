import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const logout = (setUser) => {
  AsyncStorage.setItem("locuser", "false");
  setUser(false);
};
const Profile = (props) => {
  const { setUser, user } = props;
  const [profileVisible, setProfileVisible] = useState(false);
  return (
    <View style={{ gap: 8, flex: 1, flexDirection: "column" }}>
      <Button
        title="My Profile"
        onPress={() => setProfileVisible(!profileVisible)}
      />
      <Modal animationType="slide" transparent={true} visible={profileVisible}>
        <View style={{ ...styles.centeredView }}>
          <View style={styles.modalView}>
           <Text style={{color:'brown',fontSize:16,alignSelf:'center'}}>My Profile</Text>
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
      </Modal>
      <Button
        title="Logout"
        onPress={() => {
          logout(setUser);
        }}
      />
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
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default Profile;
