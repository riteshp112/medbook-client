import MainApp from "./src/MedBook";
import React from "react";
import Toast from "react-native-fast-toast";
export default function App() {
  return (
    <>
      <MainApp />
      <Toast ref={(ref) => global['toast'] = ref} />
    </>
  );
}
