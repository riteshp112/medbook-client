import { useEffect, useState } from "react";
import React from "react";
import { FlatList, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FloatingAction from "../../../Components/FloatingActionComponent";
import { useIsFocused } from "@react-navigation/native";
import DownloadRecords from "../../../Components/DownloadRecords";
import { RecordItem } from "./RecordItem";
const RecordList = (props) => {
  const parentProps = props;
  const [records, setRecords] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    AsyncStorage.getItem("records").then((records = "[]") => {
      setRecords(JSON.parse(records));
    });
    setRecords(records);
  }, [isFocused]);

  return (
    <View style={{ flex: 1, justifyContent: "center", overflow: "hidden" }}>
      <FlatList
        data={records}
        renderItem={(props) => (
          <RecordItem {...props} {...parentProps} func={setRecords} />
        )}
        keyExtractor={(item) => item?.date}
        showsVerticalScrollIndicator={false}
      ></FlatList>
      <DownloadRecords records={records} />
      <FloatingAction
        {...props}
        text="+"
        onPress={() => props?.navigation?.navigate("add-new-record")}
        position="flex-end"
      ></FloatingAction>
    </View>
  );
};
export default RecordList;
