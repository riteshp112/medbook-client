import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddNewRecord from "./RecordForms";
import { RecordItem } from "./RecordItem";
import RecordList from "./RecordLists";

const Stack = createNativeStackNavigator();

const RecordScreens = () => {

  return (
    <Stack.Group>
      <Stack.Screen name="record-item" component={RecordItem} />
      <Stack.Screen
        name="add-new-record"
        component={AddNewRecord}
        options={{ presentation: "transparentModal" }}
      />
      <Stack.Screen name="record-list" component={RecordList} />
    </Stack.Group>
  );
  
};

export default RecordScreens;