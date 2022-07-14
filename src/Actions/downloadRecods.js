import { CSVLink } from 'react-csv';
import { Alert, Button, Platform } from 'react-native';
import { jsonToCSV } from 'react-native-csv';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from 'react';

const downloadRecords = async () => {

    let records = await AsyncStorage.getItem("records");
    records = JSON.parse(records);
    records = jsonToCSV(records);
    console.log(records, typeof (records))

    var RNFS = require('react-native-fs');

    var path = RNFS.ExternalStorageDirectoryPath + '/records.csv';

    // write the file
    RNFS.writeFile(path, records, 'utf8')
        .then((success) => {
            alert("File Downloaded Succesfuly at"+path)
        })
        .catch((err) => {
            Alert.alert("Permissions required", "Please provide file write permissions to save records." + err, [
                {
                    text: 'Ask Me Later',
                },
                {
                    text: "OK",
                    // onPress: requestFilesPermission
                },
                {
                    text: "Cancel"
                }
            ])
        });
}
const DownloadRecords = (props) => {
    const [recordS,setRecordS]=useState("")
    useEffect(() => {
            if(recordS=="")
                getRecords();
      }, [])
    const getRecords = async() =>{
    let records = await AsyncStorage.getItem("records");
    records = JSON.parse(records);
    records = jsonToCSV(records);
    setRecordS(records);
    }
    
    if (Platform.OS == 'web')
        return (
            <CSVLink style={{ textDecoration: 'none' }} data={recordS} > <Button title='Download'/> </CSVLink>
        )
    else
        return (
            <Button title="Download" onPress={downloadRecords}></Button>
        )

}
export default DownloadRecords;