import { useState } from 'react';
import {  Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { Picker } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { RecordItem } from '../Components/RecordItem';
const donePressed = async (type, val) => {
  let records = await AsyncStorage.getItem("records") 
  if (records == null || records == undefined)
    records = "[]"
  records = JSON.parse(records)
  records.push({type,val,date: new Date()})
  await AsyncStorage.setItem("records",JSON.stringify(records))
}
const reloadRecords = async (setRecords,deleteRecords) => {
  let locRecords = await AsyncStorage.getItem("records")
  if (locRecords == null || locRecords == undefined)
    locRecords = "[]"
  locRecords = JSON.parse(locRecords)
  let temp1 = []
  for (let i = 0; i < locRecords.length; i++) {
    let temp = locRecords[i]
    temp1.push([<RecordItem key={i} index={i} setRecords={setRecords} deleteRecords={deleteRecords} type={temp.type} val={temp.val} date={temp.date}></RecordItem>])
  }
  setRecords(temp1)
}
const deleteRecords= async (index,setRecords)=>{
  let locRecords = await AsyncStorage.getItem("records")
  if (locRecords == null || locRecords == undefined)
    locRecords = "[]"
  locRecords = JSON.parse(locRecords)
  let newRecords=[]
  for(let i=0;i<locRecords.length;i++)
    if(i!==index)
      newRecords.push(locRecords[i])
  await AsyncStorage.setItem("records",JSON.stringify(newRecords))
  reloadRecords(setRecords,deleteRecords)
  // setRecords(newRecords)
}
export default () => {
  const [type, setType] = useState("");
  const [val, setVal] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [records, setRecords] = useState([]);
  return (
    <View onLayout={() => reloadRecords(setRecords,deleteRecords )} style={{ flex:1,flexDirection: 'column' }}>
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
                    reloadRecords(setRecords,deleteRecords)
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
      <Button title={"Add New Record"} onPress={() => setModalVisible(true)}>
      </Button>
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