import { CSVLink } from "react-csv";
import { Button, Platform, PermissionsAndroid } from "react-native";
import { jsonToCSV } from "react-native-csv";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const requestFilesPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
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
  }
};

const downloadRecords = async () => {
  let records = await AsyncStorage.getItem("records");
  records = JSON.parse(records);
  records = jsonToCSV(records);
  var RNFS = require("react-native-fs");
  var path = RNFS.ExternalStorageDirectoryPath + "/records.csv";
  RNFS.writeFile(path, records, "utf8")
    .then((success) => {
      alert("File Downloaded Succesfuly at" + path);
    })
    .catch((err) => {
      requestFilesPermission();
    });
};
const DownloadRecords = (props) => {
  const [recordS, setRecordS] = useState("");
  useEffect(() => {
    if (recordS == "") getRecords();
  }, []);
  const getRecords = async () => {
    let records = await AsyncStorage.getItem("records");
    records = JSON.parse(records);
    records = jsonToCSV(records);
    setRecordS(records);
  };

  if (Platform.OS == "web")
    return (
      <CSVLink style={{ textDecoration: "none" }} data={recordS}>
        {" "}
        <Button title="Download" />{" "}
      </CSVLink>
    );
  else return <Button title="Download" onPress={downloadRecords}></Button>;
};
export default DownloadRecords;