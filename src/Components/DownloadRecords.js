import React from "react";
import { CSVLink } from "react-csv";
import { Platform } from "react-native";
import { downloadRecords } from "../Actions/recordActions";
import FloatingActionComponent from "./FloatingActionComponent";

const DownloadRecords = (props) => {
  const { records } = props;
  if (Platform.OS == "web")
    return (
      <CSVLink style={{ textDecoration: "none" }} data={records} filename={"MedBookHealthRecords.csv"}>
        <FloatingActionComponent
          {...props}
          text="&#11015;"
          position="flex-start"
        ></FloatingActionComponent>
      </CSVLink>
    );
  else
    return (
      <FloatingActionComponent
        {...props}
        text="&#11015;"
        onPress={downloadRecords}
        position="flex-start"
      ></FloatingActionComponent>
    );
};
export default DownloadRecords;
