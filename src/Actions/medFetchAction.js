// @ts-nocheck
import { fetchURL } from "../config";
import NetworkUtils from "../Utils/NetworkUtility";
const medFetch = async (uri, body) => {
  try {
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (!isConnected) {
      toast.show("No Internet! Check Your Connection!", {
        type: "warning",
        duration: 1500,
      });
      return [];
    } else {
      let res = await fetch(fetchURL + uri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: decodeURI(JSON.stringify(body)),
      });
      const response = await res?.json();
      console.log(res);
      if (response.error) {
        toast.show(response.error, { type: "danger", duration: 2000 });
        return [];
      } else {
        return [response.result] || [];
      }
    }
  } catch (err) {
    toast.show(err.message, { type: "danger", duration: 2000 });
    return [];
  }
};
export default medFetch;
