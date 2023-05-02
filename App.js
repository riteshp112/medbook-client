<<<<<<< HEAD
import Home from './src/Screens/Home'
export default function App() {
  return ( 
        <Home/>
=======
import MainApp from "./src/MedBook";
import React from "react";
import Toast from "react-native-fast-toast";
export default function App() {
  return (
    <React.Fragment>
      <MainApp />
      <Toast ref={(ref) => global['toast'] = ref} />
    </React.Fragment>
>>>>>>> 79ab5e2e297e47baef0ddf2fe0efaaeb2a36dbbd
  );
}
