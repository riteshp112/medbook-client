import React from "react";
import { RecordItem } from "./RecordItem";
import { getUser } from "../../Authentication/Authenticator";
import List from "../../../Components/MedList";
const RecordList = (props) => {
  const user = getUser();
  const { navigation } = props;
  const addRecord = () => {
    navigation?.navigate("add-new-record");
  };
  const scrollToTop = ({ list }) => {
    list.scrollToIndex({ index: 0, animated: true });
  };

  return (
    <List
      {...props}
      uriParams={{
        type: "select",
        table: "records",
        condition: {
          user: user?._id,
        },
      }}
      RenderItem={RecordItem}
      floatingActions={[
        {
          text: "+",
          onPress: addRecord,
          position: "flex-start",
        },
        {
          text: "^",
          onPress: scrollToTop,
          position: "flex-end",
        },
      ]}
    />
  );
};
export default RecordList;
