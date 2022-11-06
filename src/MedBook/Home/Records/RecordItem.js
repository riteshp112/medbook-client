import { View, Text, Image } from "react-native";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { deleteIcon } from "../../../Images";
import { deleteRecordAction } from "../../../Actions/recordActions";
export const RecordItem = ({ item, index, func }) => {
  
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        padding: 10,
        height: 110,
        borderBottomWidth: 1,
        borderBottomColor: "skyblue",
        flexDirection: "row",
      }}
    >
      <View style={{ alignSelf: "flex-start", flex: 1 }}>
        <Text style={{ fontSize: 25 }}>{item.type}</Text>
        <Text style={{ fontSize: 25 }}>{item.val}</Text>
        <Text style={{ fontSize: 15 }}>
          {moment(item?.date).format("DD-MMM-YYYY hh:mm:ss A")}
        </Text>
      </View>
      <View
        style={{
          alignSelf: "flex-end",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{ padding: 10, margin: -10 }}
          onPress={() => {
            deleteRecordAction(index, func);
          }}
        >
          <Image source={deleteIcon} style={{ height: 24, width: 24 }}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};
