// @ts-nocheck
import { fetchURL } from "../config";
import NetworkUtils from "../Utils/NetworkUtility";
// import {useToast } from "react-native-fast-toast";
const medFetch = async (body) => {
  // const Toast=useToast()
  try{const isConnected = await NetworkUtils.isNetworkAvailable();
  if (!isConnected) {
    toast.show("No Internet! Check Your Connection!",{type:'warning',duration:1500});
  } 
  else {
    let res = await fetch(fetchURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    res = await res?.json();
    return res;
  }}
  catch (err) {
    toast.show(err.message,{type:'danger',duration:2000})
    return {response:[]}
  }
};
export default medFetch;
