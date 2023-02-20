//@ts-noCheck
import { fetchURL } from "../config";
import NetworkUtils from "../Utils/NetworkUtility";
import { useState, useEffect } from "react";

const medFetch = async (body) => {
  try {
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (!isConnected) {
      toast.show("No Internet! Check Your Connection!", {
        type: "warning",
        duration: 1500,
      });
      return [];
    } else {
      let res = await fetch(fetchURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: decodeURI(JSON.stringify(body)),
      });
      res = await res?.json();
      const { response } = res;
      if (response.error) {
        toast.show(response.error, { type: "danger", duration: 2000 });
        return [];
      } else {
        return response.result || [];
      }
    }
  } catch (err) {
    toast.show(err.message, { type: "danger", duration: 2000 });
    return [];
  }
};
export default medFetch;

export const useFetch = (url) => {
  let isConnected = true;
  NetworkUtils.isNetworkAvailable().then((res) => {
    isConnected = res;
  });
  if (!isConnected) {
    toast.show("No Internet! Check Your Connection!", {
      type: "warning",
      duration: 1500,
    });
    return [];
  }
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);
  return [data];
};
