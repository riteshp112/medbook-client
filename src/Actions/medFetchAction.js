import { fetchURL } from "../config";
import NetworkUtils from "../Utils/NetworkUtility";
const medFetch = async (body) => {
  
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (!isConnected) {
      alert("No Internet! Check Your Connection!");
    } else
    try {let res=await fetch(fetchURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        
      });
      res=await res.json();
      return res;
  } catch (e) {
    console.log(e);
  }
};
export default medFetch;
