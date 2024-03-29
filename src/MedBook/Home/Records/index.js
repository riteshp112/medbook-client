import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddNewRecord from "./RecordForms";
import { RecordItem } from "./RecordItem";
import RecordList from "./RecordLists";
import React from "react";
const Stack = createNativeStackNavigator();

const RecordScreens = (
  <Stack.Group>
    <Stack.Screen name="record-item" component={RecordItem} />
    <Stack.Screen
      name="add-new-record"
      component={AddNewRecord}
      options={{
        presentation: "transparentModal",
        headerShown: false,
        contentStyle: {
          justifyContent: "flex-end",
        },
      }}
    />
    <Stack.Screen name="record-list" component={RecordList} />
  </Stack.Group>
);

export default RecordScreens;
