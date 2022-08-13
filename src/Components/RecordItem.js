import { View, Text, Image } from "react-native";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { deleteIcon } from "../Icons";
export const RecordItem = (props) => {
  const d = new Date(props.date);
  const { deleteRecords, index, setRecords } = props;
  return (
    <View
      style={{
        backgroundColor: "yellow",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "skyblue",
      }}
    >
      <View style={{ position: "absolute", right: 0, height: 34, width: 34 }}>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => {
            deleteRecords(index, setRecords);
          }}
        >
          <Image source={deleteIcon} style={{ height: 24, width: 24 }}></Image>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 25 }}>{props.type}</Text>
      <Text style={{ fontSize: 25 }}>{props.val}</Text>
      <Text style={{ fontSize: 15 }}>
        {moment(d).format("DD-MMM-YYYY hh:mm:ss A")}
      </Text>
    </View>
  );
};
