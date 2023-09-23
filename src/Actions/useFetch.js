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
const internetCheck = (props = {}) => {
  const { noInternetMessage = "No Internet! Check Your Connection!" } = props;
  NetworkUtils.isNetworkAvailable().then((res) => {
    if (!res) {
      toast.show(noInternetMessage, {
        type: "warning",
        duration: 1500,
      });
    }
  });
};
export const useFetch = ({ uri, params }) => {
  internetCheck();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(fetchURL + uri + "?" + new URLSearchParams(params), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.show(err.message, { type: "danger", duration: 2000 });
        setLoading(false);
      });
  }, [uri, fetchURL, params]);
  return { data, loading };
};

export const usePost = ({ uri, body, reloadParams = [] }) => {
  internetCheck();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(fetchURL + uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: decodeURI(JSON.stringify(body)),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data?.response?.result);
        setLoading(false);
      })
      .catch((err) => {
        toast.show(err.message, { type: "danger", duration: 2000 });
        setLoading(false);
      });
  }, [uri, fetchURL, ...reloadParams]);
  return { data, loading };
};
