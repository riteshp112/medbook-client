import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid, ToastAndroid } from "react-native";
import { jsonToCSV } from "react-native-csv";
import Toast from 'react-native-simple-toast';

export const addNewRecordAction=async (item)=>{
    let records= await AsyncStorage.getItem("records") || "[]";
    records=JSON.parse(records);
    records.push(item);
    await AsyncStorage.setItem("records", JSON.stringify(records));
}

export const deleteRecordAction = async (index,func)=>{
    let records= await AsyncStorage.getItem("records");
    records=JSON.parse(records);
    records.splice(index, 1);
    await AsyncStorage.setItem("records", JSON.stringify(records));
    func(records)
}


const requestFilesPermission = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Medbook Wants To Access Your Files",
          message:
            "Medbook wants to access your files " +
            "so you can save your records.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
    } catch (err) {
      console.warn(err);
    } finally {
    //   downloadRecords();
    }
  };
  
  export const downloadRecords = async () => {
    let records = await AsyncStorage.getItem("records");
    records = JSON.parse(records);
    records = jsonToCSV(records);
    var RNFS = require("react-native-fs");
    var path = RNFS.ExternalStorageDirectoryPath + "/records.csv";
    RNFS.writeFile(path, records, "utf8")
      .then(() => {
        Toast.show("Records saved successfully",2000);
    })
      .catch((err) => {
        Toast.show (err.message,2);
        requestFilesPermission();
      });
  };
  