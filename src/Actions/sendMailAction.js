// @ts-nocheck
import { mailURL } from "../config";
import NetworkUtils from "../Utils/NetworkUtility";
const sendMailAction = async (body) => {
  try {
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (!isConnected) {
      toast.show("No Internet! Check Your Connection!", {
        type: "warning",
        duration: 1500,
      });
      return {};
    } else {
        let res = await fetch(mailURL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        res = await res?.json();
        return res;
    }
  } catch (err) {
    toast.show(err.message, { type: "danger", duration: 2000 });
    return {};
  }
};
export default sendMailAction;
