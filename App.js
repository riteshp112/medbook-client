import { SafeAreaView, StatusBar } from "react-native";
import Home from "./src/Screens/Home";
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar animated={true} backgroundColor="lightblue" />
      <Home></Home>
    </SafeAreaView>
  );
}
