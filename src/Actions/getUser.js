import AsyncStorage from "@react-native-async-storage/async-storage"
const getUser= async ()=>await AsyncStorage.getItem("locuser");
export default getUser;