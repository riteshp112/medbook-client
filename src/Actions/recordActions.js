// @ts-nocheck
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid } from "react-native";
import { jsonToCSV } from "react-native-csv";

export const addNewRecordAction = async (item) => {
  let records = (await AsyncStorage.getItem("records")) || "[]";
  records = JSON.parse(records);
  records.push(item);
  await AsyncStorage.setItem("records", JSON.stringify(records));
};

export const deleteRecordAction = async (index, func) => {
  let records = (await AsyncStorage.getItem("records")) || "[]";
  records = JSON.parse(records);
  records.splice(index, 1);
  await AsyncStorage.setItem("records", JSON.stringify(records));
  func(records);
};

const requestFilesPermission = async () => {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
  } catch (err) {
    console.warn(err);
  }
};

export const downloadRecords = async () => {
  let records = (await AsyncStorage.getItem("records")) || "[]";
  records = JSON.parse(records);
  records = jsonToCSV(records);
  var RNFS = require("react-native-fs");
  var path = RNFS.ExternalStorageDirectoryPath + "/MedBookHealthRecords.csv";
  RNFS.writeFile(path, records, "utf8")
    .then(() => {
      toast.show("Records saved successfully", {
        type: "success",
        duration: 2000,
      });
    })
    .catch((err) => {
      toast.show(err.message, { type: "danger", duration: 3000 });
      requestFilesPermission();
    });
};
