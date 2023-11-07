import React from "react";
import ChatItem from "./ChatItems";
import List from "../../../Components/MedList";
import { getUser } from "../../Authentication/Authenticator";

const ChatList = (props) => {
  const { navigation } = props;
  const user = getUser();
  const addNewChat = () => {
    navigation?.navigate("add-new-chat");
  };
  const scrollToTop = ({ list }) => {
    list.scrollToIndex({ index: 0, animated: true });
  };

  return (
    <List
      {...props}
      uriParams={{
        type: "select",
        table: "threads",
        condition: {
          $or: [
            { "sender.username": user.username },
            { "receiver.username": user.username },
          ],
        },
      }}
      RenderItem={ChatItem}
      floatingActions={[
        {
          text: "+",
          onPress: addNewChat,
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
export default ChatList;
