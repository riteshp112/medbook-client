import { useState } from 'react';
import React from 'react';

import { Alert, Button, Modal, PermissionsAndroid, Pressable, StyleSheet, Text, View } from 'react-native'
import { Picker } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { RecordItem } from '../Components/RecordItem';
import { jsonToCSV } from 'react-native-csv';
import fs from 'react-native-file-manager'
import DownloadRecords from '../Actions/downloadRecods';
const donePressed = async (type, val) => {
  let records = await AsyncStorage.getItem("records")
  if (records == null || records == undefined)
    records = "[]"
  records = JSON.parse(records)
  records.push({ type, val, date: new Date() })
  await AsyncStorage.setItem("records", JSON.stringify(records))
}
const reloadRecords = async (setRecords, deleteRecords) => {
  let locRecords = await AsyncStorage.getItem("records");
  if (locRecords == null || locRecords == undefined)
    locRecords = "[]"
  locRecords = JSON.parse(locRecords);
  let temp1 = [];
  for (let i = 0; i < locRecords.length; i++) {
    let temp = locRecords[i];
    temp1.push([<RecordItem key={i} index={i} setRecords={setRecords} deleteRecords={deleteRecords} type={temp.type} val={temp.val} date={temp.date}></RecordItem>]);
  }
  setRecords(temp1);
}
const requestFilesPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "Medbook Wants To Access Your Files",
        message:
          "Medbook wants to access your files " +
          "so you can save your records.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      alert("You can save your Records");
    } else {
      alert("Files permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};
const downloadRecords=async()=>{
  
  let records=await AsyncStorage.getItem("records");
  records=JSON.parse(records);
  records= jsonToCSV(records);
  console.log(records,typeof(records))

  var RNFS = require('react-native-fs');

var path = RNFS.DownloadDirectoryPath + '/records.csv';

// write the file
RNFS.writeFile(path, records, 'utf8')
  .then((success) => {
    alert("File Downloaded Succesfuly")
  })
  .catch((err) => {
    Alert.alert("Permissions required","Please provide file write permissions to save records."+err,[
      {
        text:'Ask Me Later',
      },
      {
        text:"OK",
        onPress:requestFilesPermission
      },
      {
        text:"Cancel"
      }
    ])
  });
}
const deleteRecords = async (index, setRecords) => {
  let locRecords = await AsyncStorage.getItem("records")
  if (locRecords == null || locRecords == undefined)
    locRecords = "[]"
  locRecords = JSON.parse(locRecords)
  let newRecords = []
  for (let i = 0; i < locRecords.length; i++)
    if (i !== index)
      newRecords.push(locRecords[i])
  await AsyncStorage.setItem("records", JSON.stringify(newRecords))
  reloadRecords(setRecords, deleteRecords)
  // setRecords(newRecords)
}
const Record= () => {
  const [type, setType] = useState("");
  const [val, setVal] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [records, setRecords] = useState([]);

  return (
    <View onLayout={() => reloadRecords(setRecords, deleteRecords)} style={{ flex: 1, flexDirection: 'column' }}>
      <ScrollView style={{ flex: 1 }}>
        {records}
      
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView} >
              <Picker style={{ width: 250 }} onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
                <Picker.Item value="Choose Record Type" label="Choose Record Type" />
                <Picker.Item label="Blood Sugar Level" value="Blood Sugar Level" />
                <Picker.Item label="Blood Pressure" value="Blood Pressure" />
                <Picker.Item label="Temperature" value="Temperature" />
              </Picker>
              <TextInput style={{ borderWidth: 2, width: 200 }} onChangeText={(value) => setVal(value)}>
              </TextInput>
              <View style={{ flexDirection: 'row' }}>
                <Pressable

                  style={[styles.button, styles.buttonClose]}
                  onPress={async () => {
                    await donePressed(type, val)
                    reloadRecords(setRecords, deleteRecords)
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text style={styles.textStyle}>Done</Text>
                </Pressable>
                <Pressable

                  style={[styles.button, styles.buttonClose]}
                  onPress={() => { setModalVisible(!modalVisible) }}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <View style={{ flex: 1, marginRight:10,marginLeft:10}}>
          <Button title={"Add New Record"} onPress={() => setModalVisible(true)}></Button>
        </View>
        <View style={{marginLeft:10,marginRight:10}}>
      <DownloadRecords/>
          
        </View>
      </View>
    </View>
  )

}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 5,
    marginLeft: 15
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
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
export default Record;