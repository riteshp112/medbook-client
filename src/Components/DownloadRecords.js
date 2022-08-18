import { CSVLink } from "react-csv";
import { Button, Platform } from "react-native";
import { downloadRecords } from "../Actions/recordActions";

const DownloadRecords = (props) => {
    const {records} =props;
    if (Platform.OS == "web")
      return (
        <CSVLink style={{ textDecoration: "none" }} data={records}>
          {" "}
          <Button title="Download" />{" "}
        </CSVLink>
      );
    else return <Button title="Download" onPress={downloadRecords}></Button>;
  };
  export default DownloadRecords;