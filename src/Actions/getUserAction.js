import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useEffect } from "react";

const getUser = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    AsyncStorage.getItem("locuser").then((user) => setUser(JSON.parse(user)));
  }, []);
  return user;
};
export default getUser;
